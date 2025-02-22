"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { Logo } from "@/components/customUI/logo/logo";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyMFALoginMutationFn } from "@/lib/API/auth";
import { toast } from "@/hooks/use-toast";

const VerifyMFA = () => {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFALoginMutationFn,
  });

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!email) {
      router.replace("/signup");
      return;
    }

    const data = {
      code: values.pin,
      email: email,
    };
    mutate(data, {
      onSuccess: async (response) => {
        router.replace("/dashboard");
        toast({
          title: "Verified successfully",
          description: response.data.message || "Verify and login successful",
        });
      },
      onError: (error) => {
        toast({
          title: "Error occurred",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-background p-6 md:p-10 w-full">
      <section className="w-full max-w-sm md:max-w-xl rounded-md">
        <Card className="p-6 md:p-10 bg-card">
          <div className="w-full flex justify-center">
            <Logo isHidden="" />
          </div>

          <h1
            className="tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mt-8
        text-center "
          >
            Multi-Factor Authentication
          </h1>
          <p className="mb-6 text-center dark:text-[#f1f7feb5] font-normal">
            Enter the code from your authenticator app.
          </p>

          <div className="mt-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mt-6 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className=" mb-1 font-normal text-center ">
                        One-time code
                      </FormLabel>
                      <FormControl className="flex flex-wrap">
                        <div className="flex flex-wrap justify-center gap-2 max-w-full">
                          <InputOTP
                            className="!text-lg flex items-center flex-wrap justify-center"
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            {...field}
                          >
                            {/* Group slots in a wrap container */}
                            <div className="flex flex-wrap justify-center gap-2">
                              <InputOTPGroup className="flex gap-2">
                                <InputOTPSlot
                                  index={0}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0"
                                />
                                <InputOTPSlot
                                  index={1}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0 border border-border"
                                />
                              </InputOTPGroup>
                              <InputOTPGroup className="flex gap-2">
                                <InputOTPSlot
                                  index={2}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0"
                                />
                                <InputOTPSlot
                                  index={3}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0 border-border border"
                                />
                              </InputOTPGroup>
                              <InputOTPGroup className="flex gap-2">
                                <InputOTPSlot
                                  index={4}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0"
                                />
                                <InputOTPSlot
                                  index={5}
                                  className="!w-14 !h-12 !text-lg flex-shrink-0 border border-border"
                                />
                              </InputOTPGroup>
                            </div>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} className="w-full h-[40px] mt-2">
                  {isPending && <Loader className="animate-spin" />}
                  Continue
                  <ArrowRight />
                </Button>
              </form>
            </Form>
          </div>

          <Button variant="ghost" className="w-full text-[15px] mt-2 h-[40px]">
            Return to sign in
          </Button>
        </Card>
      </section>
    </main>
  );
};

export default VerifyMFA;
