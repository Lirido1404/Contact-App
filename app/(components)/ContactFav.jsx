"use client";

import Image from "next/image";
import React from "react";
import starnoplain from "../Images/star-svgrepo-com.svg";
import starplain from "../Images/starplain-svgrepo-com.svg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./ContactFav.css";
function ContactFav({ id, contactfav }) {
  const router = useRouter();

  const handleFavorite = async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du clic sur le lien
    const fav = !contactfav;
    const res = await fetch(`/api/Contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: fav }),
    });

    if (!res.ok) {
      throw new Error("Failed to update Contact");
    }

    router.refresh();
  };

  return (
    <motion.div
      onClick={handleFavorite}
      whileHover={{ scale: 1.1 }} // Ajout d'un effet d'échelle au survol
      whileTap={{ scale: 0.9 }} // Ajout d'un effet d'échelle au clic
      animate={{ rotate: contactfav ? 360 : 0 }} // Rotation en fonction de l'état de contactfav
      transition={{ duration: 0.4 }} // Durée de l'animation
    >
      {contactfav ? (
        <Image
          src={starplain}
          width={25}
          height={25}
          alt="star"
          className="stars"
        />
      ) : (
        <Image
          src={starnoplain}
          width={25}
          height={25}
          alt="star"
          className="stars"
        />
      )}
    </motion.div>
  );
}

export default ContactFav;
