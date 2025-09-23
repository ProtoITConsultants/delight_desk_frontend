"use client";
import z from "zod";
import { UPDATE_USER_PROFILE_SCHEMA } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

// Types
type UpdateUserProfile = z.infer<typeof UPDATE_USER_PROFILE_SCHEMA>;

const ProfileSection = () => {
  // Form
  const form = useForm<UpdateUserProfile>({
    resolver: zodResolver(UPDATE_USER_PROFILE_SCHEMA),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
    },
  });

  // TODO: Implement Update Profile Mutation
  const onSubmit = () => {
    // Log Form Data
    console.log(form.getValues());
  };

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" disabled={false} className="h-10">
                {/* {updateProfileMutation.isPending ? "Saving..." : "Save Changes"} */}
                Save Changes
              </Button>
            </div>
          </form>
          <div className="mt-6 pt-6 border-t">
            <div className="space-y-2">
              <h3 className="font-medium">Account Email</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  m.babar@protogroup.co
                </span>
                <Button variant="outline" size="sm">
                  Change Email
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
