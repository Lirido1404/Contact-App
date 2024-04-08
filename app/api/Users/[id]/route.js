import { NextResponse } from "next/server";
import User from "@/app/(models)/User";

export async function GET(req, { params }) {
    try {
      const { id } = params;
  
      const foundUser = await User.findOne({ _id: id });
      return NextResponse.json({ foundUser }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }