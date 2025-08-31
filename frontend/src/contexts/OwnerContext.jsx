import React, { createContext, useState } from "react";

export const OwnerDataContext = createContext();

const OwnerContext = ({ children }) => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <OwnerDataContext.Provider value={{ owner, setOwner }}>
      {children}
    </OwnerDataContext.Provider>
  );
};

export default OwnerContext;
