"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
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
import { Logo } from "@/components/customUI/logo/logo";
import { Card, CardContent } from "@/components/ui/card";
import { resendEmailVerificationMutationFn } from "@/lib/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { resendVerificationEmailSChema } from "@/common/schemas/authFormSchemas";

export default function ResendEmail() {
  // State for
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: resendEmailVerificationMutationFn,
  });

  const form = useForm<z.infer<typeof resendVerificationEmailSChema>>({
    resolver: zodResolver(resendVerificationEmailSChema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resendVerificationEmailSChema>) => {
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
      {/* Initial content */}
      {!isSubmitted ? (
        <section className="w-full max-w-sm md:max-w-xl rounded-md">
          <Card className="p-6 md:p-10">
            <CardContent>
              <div className="flex justify-center sm:justify-start w-full">
                <Logo isHidden="" />
              </div>

              <h1
                className="tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left"
              >
                Resend account verification email
              </h1>
              <p className="mb-6 text-center sm:text-left  dark:text-[#f1f7feb5] font-normal">
                Include the email address associated with your account and we’ll
                resend you an email with instructions to activate your account.
              </p>

              {/* FORM CONTENT */}
              <Form {...form}>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="mb-0">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-[#f1f7feb5]">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="w-full md:w-1/2 h-[40px] text-white font-semibold"
                    disabled={isPending}
                  >
                    {/* ADD SPINNER WHEN BUTTON API CALL */}
                    {isPending && <Loader className="animate-spin" />}
                    Send reset instructions
                    <ArrowRight />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      ) : (
        // IF SUCCESS
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Check your email
          </h2>
          <p className="mb-2 text-center text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            We have just sent you a link to {form.getValues().email}.
          </p>
          <Link href="/signin">
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
