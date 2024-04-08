import React from "react";
import SearchBar from "./SearchBar";
import AddContact from "./AddContact";
import Parameters from "./Parameters";

function NavBar() {
  return (
    <div className="flex gap-2 justify-center mt-7 navbar">
      <div>
        <SearchBar />
      </div>
      <div className="flex gap-3 items-center">
        <AddContact />
        <Parameters />
      </div>
    </div>
  );
}

export default NavBar;
