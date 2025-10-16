"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

const WAREHOUSE_EMAIL_CONFIG_SCHEMA = z.object({
  warehouseEmail: z.email("Invalid email address"),
});

const WarehouseEmailConfiguration = () => {
  const form = useForm({
    resolver: zodResolver(WAREHOUSE_EMAIL_CONFIG_SCHEMA),
    defaultValues: {
      warehouseEmail: "mk2pC@example.com",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        Warehouse Email Configuration
      </h3>

      {/* Configuration Details */}

      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(() => {})}
        >
          <FormField
            control={form.control}
            name="warehouseEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn("text-sm font-medium text-gray-700")}>
                  Warehouse Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="warehouse@yourcompany.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] -mt-1" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {/* {updateWarehouseEmailMutation.isPending
          ? "Saving..."
          : "Save Configuration"} */}
            Save Configuration
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WarehouseEmailConfiguration;
