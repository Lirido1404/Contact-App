"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import retour from "/public/retour.svg";
import addcontact from "../Images/addcontact.svg";
import unknown_pic from "/public/unknown_pic.svg";
import star_uncompleted from "/public/star_uncompleted.svg";
import star_completed from "/public/star_completed.svg";
import edit from "/public/edit.svg";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function ContactForm({ contactData }) {
  const { toast } = useToast();
  const router = useRouter();

  const { data: session } = useSession();
  const [readerResult, setReaderResult] = useState(null);

  const [formData, setFormData] = useState({
    favorite: contactData ? contactData.favorite : false,
    prenom: contactData ? contactData.prenom : "",
    nom: contactData ? contactData.nom : "",
    tel: contactData ? contactData.tel : "",
    email: contactData ? contactData.email : "",
    image: contactData ? contactData.image : null,
    createurID: session?.user?.id || "",
    adresse: contactData ? contactData.adresse : "",
  });

  const handleChange = (e) => {
    // Créer une référence pour votre image

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    if (name === "image") {
      const file = e.target.files[0];
      // Vérifie s'il y a un fichier sélectionné
      if (file) {
        // Vérifie si le fichier sélectionné est une image
        if (file.type && file.type.startsWith("image")) {
          // Convertit l'image en base64
          convertToBase64(file);
        } else {
          console.log("Le fichier sélectionné n'est pas une image.");
        }
      }
    } else {
      // Sinon, c'est un champ de texte normal
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log("formData before fetch:", formData); // Ajouter ce console.log
  };

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
      setReaderResult(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
    toast({
      variant: "primary",
      title: (
        <span className="flex gap-4 items-center">
          <Image src={"/success.svg"} width={20} height={20} alt="success" />
          <h3 className="text-white font-bold">
            La photo a bien été importée.
          </h3>
        </span>
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = contactData
      ? `/api/Contacts/${contactData._id}`
      : "/api/Contacts";

    const res = await fetch(url, {
      method: contactData ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(
        contactData ? "Failed to update Contact" : "Failed to create Contact"
      );
    }

    router.push("/");
    router.refresh();
  };

  const [star, setStar] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col gap-3 sm:mt-8 xl:mt-6 w-full"
        onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <Link href={"../"}>
            <Image src={retour} alt="retour" height={38} width={38} />
          </Link>
          {contactData ? (
            <label htmlFor="done" className="cursor-pointer">
              <Image src={edit} height={42} width={42} alt="add contact" />
            </label>
          ) : (
            <label htmlFor="done">
              <Image
                src={addcontact}
                height={42}
                width={42}
                alt="add contact"
                className="cursor-pointer"
              />
            </label>
          )}
          <input type="submit" id="done" className="sr-only" value={"Done"} />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <label htmlFor="file" className="relative cursor-pointer">
                {contactData && contactData.image ? (
                  <Image
                    src={readerResult ? readerResult : contactData.image}
                    height="142"
                    width="142"
                    alt="Profile picture"
                    className="rounded-full border-gray border-[2.5px] h-32 w-32 object-cover"
                  />
                ) : contactData && contactData.prenom ? (
                  <div className="bg-[#1C1C1E] rounded-full mt-3 border border-ring h-[142px] w-[142px] flex justify-center items-center">
                    <p className="font-Jost font-bold text-[52px]">
                      {contactData.prenom[0].toUpperCase()}
                    </p>
                  </div>
                ) : formData.image ? (
                  <>
                    <div className="flex flex-col items-center justify-center preview">
                      <Image
                        src={formData.image}
                        width="142"
                        height="142"
                        alt="Preview"
                        className="rounded-full object-cover border-gray border-[2.5px] w-32 h-32"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={unknown_pic}
                      width="142"
                      height="142"
                      alt="Preview"
                      className="rounded-full object-cover border-gray border-[2.5px] w-32 h-32"
                    />
                  </>
                )}
                <input
                  type="file"
                  id="file"
                  onChange={handleChange}
                  name="image"
                  className="sr-only"
                />
              </label>
              {readerResult ? (
                <p className="text-center preview2">Preview</p>
              ) : (
                ""
              )}

              <label
                htmlFor="favorite"
                className="absolute -top-[0%] right-0 cursor-pointer">
                {star ? (
                  <Image
                    src={star_completed}
                    height="42"
                    width="42"
                    alt="Add to favorite"
                    onClick={() => setStar(!star)}
                  />
                ) : (
                  <Image
                    src={star_uncompleted}
                    height="42"
                    width="42"
                    alt="Add to favorite"
                    onClick={() => setStar(!star)}
                  />
                )}
                <input
                  id="favorite"
                  type="checkbox"
                  className="sr-only z-10"
                  name="favorite"
                  onChange={handleChange}
                  checked={formData.favorite}
                />
              </label>
            </div>
          </div>

          {!contactData && (
            <label
              htmlFor="file"
              className="cursor-pointer mt-4 rounded-[16px] border-ring border-[1.5px] py-1 px-4">
              <input
                type="file"
                id="file"
                onChange={handleChange}
                name="image"
                className="sr-only"
              />
              Ajouter une photo
            </label>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-9">
          {!contactData ? (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  id="nom"
                  name="nom"
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-2 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Nom de famille"
                />
                <label
                  htmlFor="nom"
                  className="absolute cursor-text left-2 -top-3 text-base bg-[#212224] mx-1 px-1 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-3 peer-focus:-top-3  peer-focus:text-sm transition-all">
                  Nom de famille
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-3 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Nom de famille"
                />
                <label
                  htmlFor="nom"
                  className="absolute cursor-text left-2 bg-[#212224] mx-1 px-1 -top-3  text-sm">
                  Nom de famille
                </label>
              </div>
            </div>
          )}

          {!contactData ? (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  id="prenom"
                  name="prenom"
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-2 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Prénom"
                />
                <label
                  htmlFor="prenom"
                  className="absolute cursor-text left-2 -top-3 text-base bg-[#212224] text-mx-1 px-1 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-3 peer-focus:-top-3  peer-focus:text-sm transition-all">
                  Prénom
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  required
                  type="text"
                  onChange={handleChange}
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-3 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Prénom"
                />
                <label
                  htmlFor="prenom"
                  className="absolute cursor-text left-2 bg-[#212224] mx-1 px-1 -top-3  text-sm">
                  Prénom
                </label>
              </div>
            </div>
          )}

          {!contactData ? (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="tel"
                  onChange={handleChange}
                  id="tel"
                  name="tel"
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-2 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Numéro de téléphone"
                />
                <label
                  htmlFor="tel"
                  className="absolute cursor-text left-2 -top-3 text-base bg-[#212224] mx-1 px-1 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm transition-all">
                  Numéro de téléphone
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="tel"
                  onChange={handleChange}
                  id="tel"
                  name="tel"
                  value={formData.tel}
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-3 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Numéro de téléphone"
                />
                <label
                  htmlFor="tel"
                  className="absolute cursor-text left-2 bg-[#212224] mx-1 px-1 -top-3  text-sm">
                  Numéro de téléphone
                </label>
              </div>
            </div>
          )}

          {!contactData ? (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  name="email"
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-2 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="E-mail"
                />
                <label
                  htmlFor="email"
                  className="absolute cursor-text left-2 -top-3 text-base bg-[#212224] mx-1 px-1 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm transition-all">
                  E-mail
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  name="email"
                  value={formData.email}
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-3 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="E-mail"
                />
                <label
                  htmlFor="email"
                  className="absolute cursor-text left-2 bg-[#212224] mx-1 px-1 -top-3  text-sm">
                  E-mail
                </label>
              </div>
            </div>
          )}

          {!contactData ? (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="text"
                  onChange={handleChange}
                  id="adresse"
                  name="adresse"
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-2 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="Adresse"
                />
                <label
                  htmlFor="adresse"
                  className="absolute cursor-text left-2 -top-3 text-base bg-[#212224] text-mx-1 px-1 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-3 peer-focus:-top-3  peer-focus:text-sm transition-all">
                  Adresse
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="text"
                  onChange={handleChange}
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  className="peer bg-transparent h-14 rounded-lg placeholder-transparent ring-2 px-3 ring-white focus:ring-[#EBE7EB] focus:outline-none w-64"
                  placeholder="adresse"
                />
                <label
                  htmlFor="adresse"
                  className="absolute cursor-text left-2 bg-[#212224] mx-1 px-1 -top-3  text-sm">
                  Adresse
                </label>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
