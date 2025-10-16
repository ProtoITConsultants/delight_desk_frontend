"use client";
import { createContext, useContext, useState } from "react";
import { USER_TYPE } from "../types";

type UsersListContextType = {
  usersList: USER_TYPE[];
  filteredUsers: USER_TYPE[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: string | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<string | null>>;
};

// Dummy Data
const UsersData: USER_TYPE[] = [
  {
    id: "1",
    userName: "John Doe",
    email: "jhon.doe@protogroup.co",
    subscriptionPlan: "Basic",
    isActive: false,
    connectedEmailProvider: "gmail",
    connectedStore: "woocommerce",
    lastLogin: "2023-01-01T12:00:00.000Z",
  },
  {
    id: "2",
    userName: "Muhammad Babar",
    email: "m.babar@protogroup.co",
    subscriptionPlan: "Premium",
    isActive: true,
    connectedEmailProvider: "outlook",
    connectedStore: null,
    lastLogin: null,
  },
  {
    id: "3",
    userName: "Nabeel Khan",
    email: "nabeel@protogroup.co",
    subscriptionPlan: "Basic",
    isActive: true,
    connectedEmailProvider: null,
    connectedStore: null,
    lastLogin: null,
  },
];

// Create context with default value
const UsersListContext = createContext<UsersListContextType>({
  usersList: [],
  filteredUsers: [],
  searchQuery: "",
  setSearchQuery: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
});

// Hook for consuming the context
export const useUsersList = () => {
  const context = useContext(UsersListContext);
  if (!context) {
    throw new Error("useUsersList must be used within a UsersListProvider.");
  }
  return context;
};

// Provider component
export const UsersListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = UsersData.filter((user) => {
    return (
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <UsersListContext.Provider
      value={{
        usersList: UsersData,
        filteredUsers,
        searchQuery,
        setSearchQuery,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UsersListContext.Provider>
  );
};
