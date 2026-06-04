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
import z from "zod";
import { CHANGE_EMAIL_SCHEMA } from "../schema";

type ChangeEmail = z.infer<typeof CHANGE_EMAIL_SCHEMA>;

const ChangeEmailCard = () => {
  const form = useForm<ChangeEmail & { userId: string }>({
    resolver: zodResolver(
      z.object({
        userId: z.string(),
        newEmail: z.string().email("Please enter a valid email address"),
        password: z.string().min(1, "Password is required"),
      })
    ),
    defaultValues: {
      userId: "",
      newEmail: "",
      password: "",
    },
  });

  // TODO: Implement change email mutation
  const onsubmit = () => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Change Email Address</CardTitle>
        <CardDescription>
          Update the email address associated with your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {/* {changeEmailMutation.isPending ? "Changing..." : "Change Email"} */}
              Change Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangeEmailCard;
