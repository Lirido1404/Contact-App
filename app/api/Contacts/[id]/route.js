import { NextResponse } from "next/server";
import Contact from "@/app/(models)/Contact";


export async function fetchOneContact(params) {
  try {
    const id  = params;
    return await Contact.findOne({ _id: id });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
    try {
      const { id } = params;
      await Contact.findByIdAndDelete(id);
      return NextResponse.json({ message: "Contact Deleted" }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }



  export async function PUT(req, { params }) {
    try {
      const id = params.id;
      const body = await req.json();
      const updateContactData = await Contact.findByIdAndUpdate(id,{
          ...body
      });
      return NextResponse.json({ message: "Contact updated" }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }