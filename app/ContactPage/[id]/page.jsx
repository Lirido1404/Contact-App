import ContactForm from "@/app/(components)/ContactForm";
import DeleteContact from "@/app/(components)/DeleteContact";
import email from "/public/mail.svg";
import tel from "/public/tel.svg";
import retour from "/public/retour.svg";
import message from "/public/message.svg";
import edit from "/public/edit.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import unknown_pic from "/public/unknown_pic.svg";
import star_uncompleted from "/public/star_uncompleted.svg";
import star_completed from "/public/star_completed.svg";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import { fetchOneContact } from "@/app/api/Contacts/[id]/route";

async function page({ params }) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  const addContact = params.id === "new";
  const editMode = params.id === "update";

  let contactData = {};
  let premierelettreprenom = "";
  let premierelettreprenom2 = "";

  if (!addContact) {
    contactData = await fetchOneContact(params.id);
    if (contactData.prenom) {
      premierelettreprenom = contactData.prenom[0];
      premierelettreprenom2 = premierelettreprenom.toUpperCase();
    }
  }

  const formDataToSend = { ...contactData };

  const affForm = async () => {
    if (addContact) {
      return (
        <>
          <ContactForm />
        </>
      );
    } else if (editMode) {
      return (
        <>
          <ContactForm contactData={formDataToSend} />
        </>
      );
    } else {
      return (
        <div className="flex flex-col min-h-screen w-full">
          <div className="flex-grow">
            <div className="flex justify-between items-center mt-4">
              <Link href={"../"}>
                <Image src={retour} alt="retour" height={38} width={38} />
              </Link>

              <Link
                href={`/ContactPage/${contactData._id}/update/${contactData._id}`}>
                <Image src={edit} height={42} width={42} alt="edit" />
              </Link>
            </div>

            <div className="relative w-fit ml-auto mr-auto mt-12">
              {contactData.image ? (
                <>
                  <Image
                    src={contactData.image || unknown_pic}
                    height={140}
                    width={140}
                    alt="Profile picture"
                    className="rounded-full w-32 h-32 object-cover border-gray border-[2.5px]"
                  />
                </>
              ) : (
                <>
                  <div className="bg-[#1C1C1E] rounded-full mt-3 border border-ring h-[142px] w-[142px] flex justify-center items-center">
                    <p className="font-Jost font-bold text-[52px]">
                      {premierelettreprenom2}
                    </p>
                  </div>
                </>
              )}

              <label
                htmlFor="favorite"
                className="absolute -top-[6%] right-0 cursor-pointer">
                {contactData.favorite ? (
                  <Image
                    src={star_completed}
                    height="42"
                    width="42"
                    alt="Add to favorite"
                  />
                ) : (
                  <Image
                    src={star_uncompleted}
                    height="42"
                    width="42"
                    alt="Add to favorite"
                  />
                )}
              </label>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-bold mt-4 text-center text-xl">
                {contactData.prenom} {contactData.nom}
              </p>

              <p className="font-regular">{contactData.tel}</p>

              <p className="font-semibold text-gray text-base">
                {contactData.email}
              </p>
            </div>

            <div className="flex gap-6 ml-auto mr-auto mt-6 w-fit">
              <Image src={tel} alt="tel" width={50} height={50} />
              <Image src={message} alt="message" width={50} height={50} />
              <Image src={email} alt="mail" width={50} height={50} />
            </div>

            {contactData.adresse && (
              <div class="bg-background rounded-lg flex justify-start lg:justify-center mt-2 xl:mt-4">
                <div class="peer bg-transparent pb-3 rounded-lg ring-ring w-64">
                  <div className="ml-1">
                    <h5 className="font-bold pt-2">Adresse</h5>
                    <p className="pt-2"> {contactData.adresse}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DeleteContact id={contactData._id} />
        </div>
      );
    }
  };

  return <div>{affForm()}</div>;
}

export default page;
