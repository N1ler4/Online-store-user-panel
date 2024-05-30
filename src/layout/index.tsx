import React, { useState } from "react";
import { Header, Main } from "@components";

export default function MainLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    console.log("Search Term:", newSearchTerm);
  };

  return (
    <>
      <Header onChange={handleSearchChange} />
      <Main searchTerm={searchTerm} />
    </>
  );
}
