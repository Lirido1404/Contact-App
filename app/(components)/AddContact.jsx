"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react"; // Importez useEffect
import add from "../Images/add.svg";
import { useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function AddContact() {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (session) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [session]);

  const { toast } = useToast();

  return (
    <div>
      {disabled ? (
        <button
          aria-label="Se connecter"
          className=""
          onClick={() => {
            toast({
              variant: "destructive",
              title: (
                <h3 className="text-white font-bold">
                  Connectez-vous pour accéder à ce service.
                </h3>
              ),
              action: (
                <ToastAction altText="Goto schedule to undo">
                  <Link href={"/api/auth/signin"}>
                    <p className="text-white">Me connecter</p>
                  </Link>
                </ToastAction>
              ),
            });
          }}>
          <div className="rounded-full flex items-center justify-center p-1 bg-[#123A1B]">
            <Image src={add} alt="add" width={32} height={32} />
          </div>
        </button>
      ) : (
        <Link href={"/ContactPage/new"}>
          <div className="rounded-full flex items-center justify-center p-1 bg-[#2BA84D] bg-opacity-20">
            <Image src={add} alt="add" width={32} height={32} />
          </div>
        </Link>
      )}
    </div>
  );
}

export default AddContact;
