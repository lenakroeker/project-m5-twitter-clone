import React, { useEffect, useState } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  console.log(currentUser);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((res) => setCurrentUser(res.data));
  }, []);

  console.log(currentUser);
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
