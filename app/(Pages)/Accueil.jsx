import Image from "next/image";
import chevron from "../Images/chevron.svg";
import box from "../Images/nocontacts.svg";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import React from "react";
import NavBar from "../(components)/NavBar";
import SignInPage from "../(components)/SignInPage";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Exit from "../(components)/Exit";
import Contact from "../(components)/Contact";
import MappingContact from "../(components)/MappingContact";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getContacts = async () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/Contacts`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("Error fetching:", err.message);
    // Log l'erreur complète si tu as accès à une telle console
    console.error(err);
    throw new Error("Error fetching data.");
  }
};

export default async function Accueil({ searchParams }) {
  const session = await getServerSession(options);
  const query = searchParams?.contact || "";
  const { contacts } = await getContacts(query);

  const favoriteContacts = contacts.filter((contact) => contact.favorite);
  const filtredContacts = contacts.filter((contact) => {
    return contact.nom.toLowerCase().includes(query.toLowerCase());
  });

  const sortedContacts = filtredContacts.sort((a, b) =>
    a.prenom.localeCompare(b.prenom, "fr", { sensitivity: "base" })
  );
  const filterToOneContact = sortedContacts.filter((contact) => {
    if (session) {
      return contact.createurID == session?.user?.id;
    } else {
      return null;
    }
  });
  const sortedAndFilteredContacts = filterToOneContact
    .filter((contact) => {
      return contact.nom.toLowerCase().includes(query.toLowerCase());
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

  const sortedContacts2 = contacts.sort((a, b) =>
    a.prenom.localeCompare(b.prenom, "fr", { sensitivity: "base" })
  );
  const filterToOneContact2 = sortedContacts2.filter((contact) => {
    return contact.createurID == session?.user?.id;
  });
  const sortedAndFilteredContacts2 = filterToOneContact2
    .filter((contact) => {
      return contact.nom.toLowerCase();
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

  const contactsToShow = filterToOneContact.map((contact, index, array) => {
    const currentInitial = contact.prenom[0].toUpperCase();
    const showInitial =
      index === 0 ||
      currentInitial !== array[index - 1].prenom[0].toUpperCase(); // vrai si c'est le premier contact ou si l'initiale change
    const sameAsPrevious =
      index > 0 && currentInitial === array[index - 1].prenom[0].toUpperCase(); // vrai si l'initiale est la même que celle du contact précédent
    return { ...contact, showInitial, sameAsPrevious }; // Retourner le contact avec les nouvelles propriétés
  });

  const favoriteContacts2 = contactsToShow.filter(
    (contact) => contact.favorite
  );

  return (
    <main className="flex flex-col h-full">
      <Sheet>
        <NavBar />
        <div className="flex mt-8 gap-2 sm:gap-6 mb-4 items-center">
          <div
            className={`w-[50px] h-[50px] rounded-full ${
              session?.user?.image ? "" : "bg-white"
            } outlineperso2 flex items-center justify-center`}>
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User Profile"
                height={50}
                width={50}
                loading="lazy"
                className="rounded-full border-[1px] border-white"
              />
            ) : (
              <>
                <img
                  src={"/avatar2.svg"}
                  alt=""
                  loading="lazy"
                  className="rounded-full w-full h-full p-2 border-[1px] border-white"
                />
              </>
            )}
          </div>
          <div className="my-auto ml-2 flex flex-col gap-1">
            <h1 className="font-Jost font-bold text-base w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {session?.user?.name}
            </h1>
            <p className="text-[15px] text-gray font-Jost font-semibold">
              {session ? (
                <>{session.user.email}</>
              ) : (
                <>Vous nêtes pas connecté</>
              )}
            </p>
            <div className="flex gap-2 text-xs">
              <p className="">
                {contactsToShow.length > 1
                  ? `${contactsToShow.length} Contacts`
                  : `${contactsToShow.length} Contact`}
              </p>
              <span className="mt-0.5">°</span>
              <p className=" text-green-600 font-medium ">
                {favoriteContacts2.length > 1
                  ? `${favoriteContacts2.length} Favoris`
                  : `${favoriteContacts2.length} Favori`}
              </p>
            </div>
          </div>
          <Link
            href={
              session?.user?.role == "Prov"
                ? `/Account/Prov/${session?.user?.id}`
                : session?.user?.role == "Cred"
                ? `/Account/Cred/${session?.user?.id}`
                : "/api/auth/signin"
            }
            className="ml-auto flex items-center">
            <Image src={chevron} width={30} color="#8D8C8F" alt="chevron" />
          </Link>
        </div>

        {!query && (
          <>
            {sortedAndFilteredContacts2.length > 0 && session && (
              <>
                <h2 className="text-4xl text-white font-bold mt-6">
                  Récents{" "}
                  {!query ? (
                    <>
                      <p>query vide</p>
                    </>
                  ) : (
                    <>
                      <p>query full</p>
                    </>
                  )}
                </h2>

                <ScrollArea className="whitespace-nowrap rounded-md mt-4">
                  <div className="flex w-max space-x-4">
                    {sortedAndFilteredContacts2.map((contact, index) => (
                      <div key={contact._id} className="">
                        {!contact.sameAsPrevious && (
                          <>
                            <Link
                              href={`/ContactPage/${contact._id}`}
                              className="hover:shadow">
                              <div className="bg-[#303034] rounded-[14px] p-5 pt-4 pb-0 min-w-[130px] max-w-[155px] xl:max-w-[240px] xl:min-w-[180px]">
                                <div className="flex justify-between  items-center rounded-lg gap-4">
                                  {contact.image ? (
                                    <>
                                      <img
                                        src={contact.image}
                                        alt="Profile picture"
                                        loading="lazy"
                                        className="rounded-full h-[38px] w-[38px] xl:h-[50px] xl:w-[50px] border-[1px] border-white object-cover"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div className="bg-[#1C1C1E] rounded-full border-[1px] border-white h-[38px] w-[38px] xl:h-[50px] xl:w-[50px] flex justify-center items-center">
                                        <p className="font-Jost font-bold text-white text-[16px]">
                                          {contact.prenom
                                            ? contact.prenom[0].toUpperCase()
                                            : "?"}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className="text-white text-[15px] font-Jost font-semibold mt-3 flex items-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                  <p className="mr-2">
                                    {contact.prenom.charAt(0).toUpperCase() +
                                      contact.prenom.slice(1).toLowerCase()}
                                  </p>
                                  <p>
                                    {contact.nom.charAt(0).toUpperCase() +
                                      contact.nom.slice(1).toLowerCase()}
                                  </p>
                                </div>

                                <div className="mt-0.5">
                                  <p className="text-[12px] text-[#EBEBF5] text-opacity-50">
                                    {contact.tel &&
                                      contact.tel
                                        .split("")
                                        .map((char, index) => {
                                          return index % 2 === 0 &&
                                            index !== 0 &&
                                            index !== contact.tel.length - 1
                                            ? ` ${char}`
                                            : char;
                                        })
                                        .join("")}
                                  </p>
                                </div>
                                <div className="flex gap-3 pb-4 mt-2">
                                  <Image
                                    src={"tel.svg"}
                                    alt="tel"
                                    width={35}
                                    height={35}
                                    className="flex-shrink-0"
                                  />
                                  <Image
                                    src={"message.svg"}
                                    alt="mail"
                                    width={35}
                                    height={35}
                                    className="flex-shrink-0"
                                  />
                                </div>
                                <p className="text-xs hidden">
                                  {new Date(
                                    contact.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </>
            )}
          </>
        )}

        {sortedAndFilteredContacts2.length > 0 && session && (
          <>
            <h2 className="text-4xl text-white font-bold mt-10">Contacts</h2>
          </>
        )}

        <div className="mt-2">
          <MappingContact
            contactsToShow={contactsToShow}
            favoriteContacts2={favoriteContacts2}
            query={query}
          />
        </div>

        <div className="ml-auto mr-auto mt-32">
          <SheetTrigger>
            {!session && (
              <>
                <div className="">
                  <Image
                    src={box}
                    loading="lazy"
                    alt="box"
                    width={170}
                    height={170}
                  />
                </div>
              </>
            )}
            {!contactsToShow.length > 0 && session && (
              <>
                <Link className="" href={"/ContactPage/new"}>
                  <Image
                    src={box}
                    loading="lazy"
                    alt="box"
                    width={170}
                    height={170}
                  />
                </Link>
              </>
            )}
          </SheetTrigger>
        </div>

        <SheetContent className="bg-primary">
          <SheetHeader>
            <SheetTitle>
              {session ? (
                <>
                  <p className="text-white font-bold">Déconnectez-vous</p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold">Connectez-vous avec :</p>
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              <div className="mt-4">
                {session ? (
                  <>
                    <Exit />
                  </>
                ) : (
                  <>
                    <SignInPage session={session} />
                  </>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
}
