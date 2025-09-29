"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountrSettingsAPIs from "../api";
import { UpdateUserProfileType } from "../types";
import { toast } from "sonner";
import useUserProfileForm from "../hooks/useUserProfileForm";
import { useState } from "react";
import { Edit } from "lucide-react";
import UserProfileSkeleton from "../components/user-profile/user-profile-skeleton";

const ProfileSection = () => {
  const queryClient = useQueryClient();
  const { userProfileForm, userProfileData, isFetchingUserProfie } =
    useUserProfileForm();
  const [isEditable, setIsEditable] = useState(false);

  const updateUserProfile = useMutation({
    mutationFn: (data: UpdateUserProfileType) => {
      const API_DATA = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(data).filter(([_, value]) => value !== "")
      ) as Partial<UpdateUserProfileType>;

      return accountrSettingsAPIs.updateUserProfile(API_DATA);
    },
    onSuccess: () => {
      setIsEditable(false);
      toast.success("Profile Updated!", {
        description: "Your profile has been updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (error) => {
      toast.error("Failed to update profile!", {
        description: error.message || "Something went wrong",
      });
    },
  });

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 justify-between">
          Profile Information{" "}
          {!isEditable && !isFetchingUserProfie && (
            <Button
              variant="ghost"
              type="button"
              className="w-fit"
              onClick={() => setIsEditable(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isFetchingUserProfie ? (
          <UserProfileSkeleton />
        ) : (
          <Form {...userProfileForm}>
            <form
              onSubmit={userProfileForm.handleSubmit((data) =>
                updateUserProfile.mutate(data)
              )}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={userProfileForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-10"
                          placeholder="Enter Your First Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  disabled={updateUserProfile.isPending || !isEditable}
                />
                <FormField
                  control={userProfileForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-10"
                          placeholder="Enter Your Last Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  disabled={updateUserProfile.isPending || !isEditable}
                />
              </div>

              <FormField
                control={userProfileForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10"
                        placeholder="Enter Company Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled={updateUserProfile.isPending || !isEditable}
              />

              <FormField
                control={userProfileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="h-10"
                        placeholder="Enter Your Phone Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                disabled={updateUserProfile.isPending || !isEditable}
              />

              {isEditable && (
                <div className="pt-4 flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={updateUserProfile.isPending}
                    className="h-10"
                  >
                    {updateUserProfile.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="h-10"
                    disabled={updateUserProfile.isPending}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
            <div className="mt-6 pt-6 border-t">
              <div className="space-y-2">
                <h3 className="font-medium">Account Email</h3>
                <span className="text-sm text-gray-600">
                  {userProfileData?.user?.email}
                </span>
              </div>
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
