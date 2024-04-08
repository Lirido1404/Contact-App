"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Exit from "./Exit";
import Link from "next/link";
import CredentialForm from "./CredentialForm";
function SignInPage({ session }) {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => {
    setSignUp(!signUp);
  };
  return (
    <div>
      <div className="flex flex-col gap-4 ">
        {session ? (
          <>
            <Exit />
          </>
        ) : (
          <>
            <button
              aria-label="se connecter avec Github"
              onClick={() => signIn("github")}
              className="border-2 border-white rounded-lg p-4 duration-300 ease-in-out hover:bg-gray-800">
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Github</p>
                <span>
                  <Image
                    src={"/github23.png"}
                    width={30}
                    height={30}
                    alt="Google Image"
                  />
                </span>
              </div>
            </button>

            <button
              aria-label="se connecter avec Google"
              onClick={() => signIn("google")}
              className="border-2 border-white rounded-lg p-4 duration-300 ease-in-out hover:bg-gray-800">
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Google</p>
                <span>
                  <Image
                    src={"/Google.png"}
                    width={30}
                    height={30}
                    alt="Google Image"
                  />
                </span>
              </div>
            </button>
            <div className="w-[80%] mx-auto h-[2px] bg-white rounded-full "></div>

            <button
              aria-label="se connecter avec Nous"
              onClick={handleSignUp}
              className={`border-2 border-[#25723B] rounded-lg p-4 ${
                signUp ? "bg-[#25723B] text-white" : ""
              } duration-300 ease-in-out hover:bg-green-800`}>
              <div className="flex items-center justify-center gap-4">
                <p className="text-xl text-white">Nous</p>
                <span>
                  <Image
                    src={"/logoapp.png"}
                    width={30}
                    height={30}
                    alt="Home Image"
                  />
                </span>
              </div>
            </button>
            <Link
              href={"/Account"}
              className="text-right text-white font-bold underline flex ml-auto gap-2 ">
              <p>M&apos;inscrire</p>
              <Image src={"/logoapp.png"} width={20} height={20} alt="logo" />
            </Link>

            <div className={` w-full  mt-4`}>
              <CredentialForm signUp={signUp} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
