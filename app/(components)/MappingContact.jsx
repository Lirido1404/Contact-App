"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importez motion et AnimatePresence
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function MappingContact({ contactsToShow, favoriteContacts2 }) {
  const { data: session } = useSession();

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="relative">
      {contactsToShow.length > 0 && session && (
        <>
          <div className="absolute top-[50px] transform left-[99%] xl:left-[-2%] text-[14px] font-bold flex items-center flex-col">
            {alphabet.map((letter) => (
              <a href={`#${letter}`} key={letter} style={{ display: "block" }}>
                {letter}
              </a>
            ))}
          </div>
        </>
      )}

      {contactsToShow.length > 0 && session && (
        <>
          <Button
            onClick={handleToggle}
            variant="secondary"
            className="flex gap-2 mt-3 xl:mt-2"
          >
            {toggle ? "Tous les contacts" : "Filtrer par favoris"}
            {toggle ? (
              <Image src={"avatar2.svg"} width={20} height={20} alt="star" />
            ) : (
              <Image src={"starnorm.svg"} width={20} height={20} alt="star" />
            )}
          </Button>
        </>
      )}

      <AnimatePresence>
        {toggle ? (
          <>
            {favoriteContacts2.length > 0 && session && (
              <>
                {favoriteContacts2.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0 }} // Animation de départ pour l'entrée
                    animate={{ opacity: 1 }} // Animation d'arrivée
                    exit={{ opacity: 0 }} // Animation de sortie
                    transition={{ duration: 0.3 }} // Durée de l'animation
                  >
                    {!contact.sameAsPrevious && (
                      <>
                        {index > 0 && <div className="mt-6"></div>}
                        <div
                          className="bg-[#1C1C1E] rounded-full mt-8 border border-ring h-9 w-9 flex justify-center items-center"
                          id={`${contact.prenom[0].toUpperCase()}`}
                        >
                          <p className="font-Jost font-bold text-[16px]">
                            {contact.prenom
                              ? contact.prenom[0].toUpperCase()
                              : "?"}
                          </p>
                        </div>
                      </>
                    )}
                    <Contact contact={contact} />
                  </motion.div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {contactsToShow.length > 0 && session && (
              <>
                {contactsToShow.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0 }} // Animation de départ pour l'entrée
                    animate={{ opacity: 1 }} // Animation d'arrivée
                    exit={{ opacity: 0 }} // Animation de sortie
                    transition={{ duration: 0.3 }} // Durée de l'animation
                  >
                    {!contact.sameAsPrevious && (
                      <>
                        {index > 0 && <div className="mt-6"></div>}

                        <div
                          className="bg-[#1C1C1E] rounded-full mt-8 border border-ring h-9 w-9 flex justify-center items-center xl:mt-6"
                          id={`${contact.prenom[0].toUpperCase()}`}
                        >
                          <p className="font-Jost font-bold text-[16px]">
                            {contact.prenom
                              ? contact.prenom[0].toUpperCase()
                              : "?"}
                          </p>
                        </div>
                      </>
                    )}
                    <Contact contact={contact} />
                  </motion.div>
                ))}
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MappingContact;
