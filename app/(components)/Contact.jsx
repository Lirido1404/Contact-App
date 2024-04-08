"use client";
import star_uncompleted from "/public/star_uncompleted.svg";
import star_completed from "/public/star_completed.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Contact({ contact }) {
  return (
    <Link href={`/ContactPage/${contact._id}`} draggable="false">
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -20, top: 0, bottom: 0, right: -20 }}
          className={`flex items-center ${
            contact.sameAsPrevious
              ? "-mt-[1.15px] rounded-t-none before:content-[''] before:absolute before:h-[1px] before:w-[95%] before:bg-white before:bg-opacity-55 before:top-0 before:right-0"
              : "mt-4 rounded-md"
          } shadow-sm w-[95%] xl:w-full bg-[#303034] rounded-md p-3 relative z-10`}>
          <div className="h-10 w-10 flex-shrink-0 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center mr-4 border-[1px] border-white">
            {contact.image ? (
              <Image
                src={contact.image}
                width={60}
                height={60}
                alt={contact.prenom}
                loading="lazy"
                className="rounded-full object-cover max-w-full "
              />
            ) : (
              <div className="bg-[#1C1C1E] rounded-full border border-ring h-[40px] w-[40px] flex justify-center items-center">
                <p className="font-Jost font-bold text-[16px]">
                  {contact.prenom ? contact.prenom[0].toUpperCase() : "?"}
                </p>
              </div>
            )}
          </div>
          <div className="truncate flex-grow">
            <p className="text-white font-bold truncate">
              {contact.prenom} {contact.nom}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <label
              htmlFor="favorite"
              className="cursor-pointer hidden xl:block">
              <input
                id="favorite"
                type="checkbox"
                className="sr-only z-10"
                name="favorite"
                // onChange={handleChange}
                // checked={formData.favorite}
              />
              {contact.favorite ? (
                <Image
                  src={star_completed}
                  width={35}
                  height={35}
                  loading="lazy"
                  alt="Add to favorite"
                />
              ) : (
                <Image
                  src={star_uncompleted}
                  width={35}
                  height={35}
                  alt="Add to favorite"
                />
              )}
            </label>

            <Image
              src={"mail.svg"}
              alt="mail"
              width={35}
              height={35}
              className="flex-shrink-0"
            />
            <Image
              src={"tel.svg"}
              alt="tel"
              width={35}
              height={35}
              className="flex-shrink-0"
            />
          </div>
        </motion.div>
        <div className="absolute top-[1px] left-0 flex justify-between h-[97%] z-0 w-[95%]">
          <div className="flex items-center bg-red-600 gap-3 font-semibold rounded-xl w-1/2">
            <img
              src="delete.svg"
              height={30}
              width={30}
              className="ml-4"
              alt=""
              loading="lazy"
            />
          </div>

          <div className="flex items-center text-white gap-3 font-semibold w-1/2 bg-white h-full rounded-xl justify-end">
            <img
              src="star_uncompleted.svg"
              alt=""
              width={30}
              height={30}
              className="mr-4"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Contact;
