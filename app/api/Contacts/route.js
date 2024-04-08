import Contact from "@/app/(models)/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contactData = await req.json(); // Récupérer directement les données du corps de la requête

    await Contact.create(contactData);
    console.log(contactData);
    return NextResponse.json({ message: "Contact Created"}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function fetchContacts() {
  try {
    
    return await Contact.find();
  } catch (err) {
    return NextResponse(
      { message: "Failed to get infos", err },
      { status: 500 }
    );
  }
}
