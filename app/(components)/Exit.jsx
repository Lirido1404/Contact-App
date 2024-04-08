"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import exit from "../Images/exit-svgrepo-com.svg";
import { signOut } from "next-auth/react";

function Exit() {
  const handleSignOut = async () => {
    // Appel de la fonction signOut pour déconnecter l'utilisateur
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    if (!data.error) {
      // La déconnexion a réussi
      console.log("Déconnecté avec succès");
    } else {
      // La déconnexion a échoué
      console.error("Erreur lors de la déconnexion", data.error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <button
        aria-label="se deconnecter"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="border-2 border-destructive rounded-lg p-4  ">
        <div className="flex justify-center items-center gap-4">
          <p className="text-xl text-destructive font-bold">Deconnexion</p>
          <Image src={exit} width={30} height={30} alt="exit" />
        </div>
      </button>
    </div>
  );
}

export default Exit;
