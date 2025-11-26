"use client";
import { createContext, useContext, useState } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  GET_ALL_USERS_DTO_RESPONSE,
  GET_ALL_USERS_PARAMS,
} from "@/services/admin/utils/get-all-users";
import { api } from "@/lib/api";
import { USER_DATA_TYPE_FOR_ADMIN_DTO } from "@/services/admin/utils/common/types/user-data";
import { toast } from "sonner";

const PAGE_LIMIT = 10;

type UsersListContextType = {
  usersList: USER_DATA_TYPE_FOR_ADMIN_DTO[];
  isFetchingUsers: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: string | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<string | null>>;
};

// Create context with default value
const UsersListContext = createContext<UsersListContextType>({
  usersList: [],
  isFetchingUsers: false,
  hasNextPage: false,
  fetchNextPage: () => {},
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, fetchNextPage, hasNextPage, isPending, isError, error } =
    useInfiniteQuery<
      GET_ALL_USERS_DTO_RESPONSE, // type of each page
      Error,
      InfiniteData<GET_ALL_USERS_DTO_RESPONSE>, // can omit, let TS infer
      readonly unknown[], // type of queryKey
      GET_ALL_USERS_PARAMS // type of pageParam
    >({
      queryKey: ["users-data", searchQuery],
      queryFn: async ({ pageParam }) => {
        const params: GET_ALL_USERS_PARAMS = pageParam || {
          page: 1,
          limit: PAGE_LIMIT,
          searchQuery,
        };
        const response = await api.admin_service.getAllUsers(params);
        return response;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return {
            page: allPages.length + 1,
            limit: PAGE_LIMIT,
            searchQuery,
          };
        }
        return undefined;
      },
      initialPageParam: {
        page: 1,
        limit: PAGE_LIMIT,
        searchQuery,
      },
    });

  if (isError) {
    console.log("Error fetching data", isError);
    toast.error("Failed to fetch users!", {
      description: error?.message || "Something went wrong",
    });
  }

  return (
    <UsersListContext.Provider
      value={{
        usersList:
          (data && data?.pages.flatMap((page) => page.users_data)) || [],
        isFetchingUsers: isPending,
        hasNextPage,
        fetchNextPage,
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
