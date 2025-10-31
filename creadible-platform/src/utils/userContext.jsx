import { createContext, useState } from "react";

export const UserContext = createContext({
  user: { type: "user-type", address: "some-address" },
  updateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    type: "user-type",
    address: "some-address",
  });

  const updateUser = (user) => {
    setUser({ type: user.type, address: user.address });
  };

  const contextValue = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
