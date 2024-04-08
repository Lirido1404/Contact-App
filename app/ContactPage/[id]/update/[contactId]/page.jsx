import ContactForm from "@/app/(components)/ContactForm";
import React from "react";
import { fetchOneContact } from "@/app/api/Contacts/[id]/route";

async function page({ params }) {
  

  const contactData = await fetchOneContact(params.id);
  

  return (
    <div>
      <ContactForm contactData={contactData} />
    </div>
  );
}

export default page;
