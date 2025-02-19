"use client";

import { Logo } from "@/components/customUI/logo/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultName } from "@/config/default-name";
import { toast } from "@/hooks/use-toast";
import { verifyEmailMutationFn } from "@/lib/API/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  //Router for redirect
  const router = useRouter();

  //Params to get URL params
  const params = useSearchParams();
  // Get code param from url
  const code = params.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  // Invoke on form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if code param is present
    if (!code) {
      toast({
        title: "Error",
        description: "Confirmation code not found",
        variant: "destructive",
      });
      router.replace("/resend-email");
      return;
    }
    // If code is present then call API
    mutate(
      {
        code,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account verified successfully",
            variant: "default",
          });
          router.replace("/");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
      <div className="w-full max-w-sm md:max-w-xl rounded-md">
        <Card className="p-6 md:p-10">
          <Logo isHidden="" />

          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-4 mt-8
    text-center sm:text-left"
          >
            Account confirmation
          </h1>
          <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
            To confirm your account, please follow the button below.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Button
              className="w-full h-[40px] text-white font-semibold"
              disabled={isPending}
              type="submit"
            >
              {/* ADD SPINNER WHEN BUTTON API CALL */}
              {isPending && <Loader className="animate-spin" />}
              Confirm account
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            If you have any issue confirming your account please, contact{" "}
            <span
              className="outline-none transition duration-150 ease-in-out 
        focus-visible:ring-2 text-primary focus-visible:ring-primary"
            >
              {defaultName.supportEmail}
            </span>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default VerifyEmail;
