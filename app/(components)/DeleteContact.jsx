"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function DeleteContact({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/Contacts/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div
      className="mb-6 flex justify-center items-center flex-col gap-3"
      onClick={handleDelete}>
      <Image src="/delete.svg" alt="delete" width={23.33} height={30} />
      <p className="text-[#FF3B30] font-medium cursor-pointer">Supprimer</p>
    </div>
  );
}

export default DeleteContact;
