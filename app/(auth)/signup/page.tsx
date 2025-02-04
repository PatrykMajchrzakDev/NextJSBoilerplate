"use client";

// =================================================
// ================= REGISTER PAGE =================
// =================================================
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
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
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import Logo from "@/components/customUI/logo/logo";
import { defaultName } from "@/config/default-name";
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/API/auth";
import { toast } from "@/hooks/use-toast";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mutation API function
  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  // Zod form validation schema
  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: "Name is required",
      }),
      email: z.string().trim().email().min(1, {
        message: "Email is required",
      }),
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Confirm password is required",
      }),
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  // Form default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Fn invocation on form submit
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      {!isSubmitted ? (
        //FORM IF NOT SUBMITTED
        <div className="w-full p-5 rounded-md">
          {/* FORM HEADER */}
          <Logo />
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
            Create a {defaultName.appName} account
          </h1>
          <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
            Already have an account?{" "}
            <Link className="text-primary" href="/">
              Sign in
            </Link>
            .
          </p>
          {/* FORM BODY */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full text-[15px] h-[40px] !bg-primary text-white font-semibold"
                type="submit"
                disabled={isPending}
              >
                {isPending && <Loader className="animate-spin" />}
                Create account
                <ArrowRight />
              </Button>

              <div className="mb-4 mt-4 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
                <span className="mx-4 text-xs dark:text-[#f1f7feb5] font-normal">
                  OR
                </span>
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
              </div>
            </form>
          </Form>

          {/* FORM FOOTER */}
          <Button variant="outline" className="w-full h-[40px]">
            Email magic link
          </Button>
          <p className="text-xs font-normal mt-4">
            By signing up, you agree to our{" "}
            <a className="text-primary hover:underline" href="#TBD">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-primary hover:underline" href="#TBD">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ) : (
        // FORM IF SUBMITTED
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We have just sent a verification link to {form.getValues().email}.
          </p>
          <Link href="/">
            <Button className="h-[40px]">
              Go to login
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
