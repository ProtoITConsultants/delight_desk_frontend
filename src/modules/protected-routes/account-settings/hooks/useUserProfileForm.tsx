import { useQuery } from "@tanstack/react-query";
import accountrSettingsAPIs from "../api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UPDATE_USER_PROFILE_SCHEMA } from "../schema";
import { GetUserProfileResponse, UpdateUserProfileType } from "../types";
import { useEffect, useRef } from "react";

const useUserProfileForm = () => {
  // User Profile Form
  const userProfileForm = useForm<UpdateUserProfileType>({
    resolver: zodResolver(UPDATE_USER_PROFILE_SCHEMA),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
    },
  });

  // Fetch Profile Query
  const { data, isError, error, isPending } = useQuery<GetUserProfileResponse>({
    queryKey: ["profile"],
    queryFn: () => accountrSettingsAPIs.getUserProfile(),
  });

  if (isError) {
    toast.error("Failed to fetch profile!", {
      description: error.message || "Something went wrong",
    });
    console.error("Error fetching profile", error);
  }

  const formRef = useRef(userProfileForm);
  useEffect(() => {
    if (data) {
      formRef.current.setValue("firstName", data.user?.firstName || "");
      formRef.current.setValue("lastName", data.user?.lastName || "");
      formRef.current.setValue("company", data.user?.company || "");
      formRef.current.setValue("phone", data.user?.phone || "");
    }
  }, [data]);

  const value = {
    userProfileData: data,
    isFetchingUserProfie: isPending,
    userProfileForm,
  };

  return value;
};

export default useUserProfileForm;
