import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CHANGE_PASSWORD_SCHEMA } from "../schema";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordType } from "../types";
import accountrSettingsAPIs from "../api";
import { toast } from "sonner";

const ChangePasswordCard = () => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const updateUserPassword = useMutation({
    mutationFn: (data: ChangePasswordType) =>
      accountrSettingsAPIs.changePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to change password!", {
        description: error.message || "Something went wrong",
      });
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password for security
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              updateUserPassword.mutate(data)
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={updateUserPassword.isPending}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={updateUserPassword.isPending}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={updateUserPassword.isPending}
            />

            <Button type="submit" disabled={updateUserPassword.isPending}>
              {updateUserPassword.isPending ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
