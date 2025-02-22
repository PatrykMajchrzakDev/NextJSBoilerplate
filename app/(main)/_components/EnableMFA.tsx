"use client";
import React, { useCallback, useState } from "react";
import { z } from "zod";
import { Check, Copy, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useAuthContext } from "@/context/auth-provider";
import { useUserSetupMFA } from "@/lib/API/user";
import { mfaType, verifyMFAMutationFn } from "@/lib/API/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import RevokeMFA from "./RevokeMFA";

const EnableMfa = () => {
  // State for dialog window
  const [isOpen, setIsOpen] = useState(false);

  // State for
  const [showKey, setShowKey] = useState(false);
  // State for clipboard copy value
  const [copied, setCopied] = useState(false);

  // user query
  const { user, refetch } = useAuthContext();

  // Mutation fn to check provided MFA code by user
  const { mutate, isPending } = useMutation({
    mutationFn: verifyMFAMutationFn,
  });

  // user mfa setup query
  const { data, isLoading } = useUserSetupMFA(isOpen);

  // save data to variable when is available
  const mfaData = data ?? ({} as mfaType);

  // Form schema for the authorization code
  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  // Form default and validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Submit fn
  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Save form data to variable
    const data = {
      code: values.pin,
      secretKey: mfaData.secret,
    };

    // Pass data to post fn
    mutate(data, {
      onSuccess: (response: any) => {
        // Invalidate user object
        refetch();
        setIsOpen(false);

        // Success msg if everything went fine
        toast({
          title: "Success",
          description: response.data.message || "Added MFA successfully",
        });
      },
      // Error msg
      onError: (error) => {
        toast({
          title: "Success",
          description: error.message,
        });
      },
    });
  }

  // Function to save copied code to state
  const onCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, []);

  return (
    <div className="via-root to-root rounded-xl bg-gradient-to-r p-0.5">
      <div className="rounded-[10px] p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1">
            Multi-Factor Authentication (MFA)
          </h3>

          {/* Show info to user that they already enabled MFA  */}
          {user?.userPreferences.enable2FA && (
            <span
              className="select-none whitespace-nowrap font-medium bg-green-100 text-green-500
          text-xs h-6 px-2 rounded flex flex-row items-center justify-center gap-1"
            >
              Enabled
            </span>
          )}
        </div>

        <p className="mb-6 text-sm text-[#0007149f] dark:text-gray-100 font-normal">
          Protect your account by adding an extra layer of security.
        </p>

        {/* If user has enabled MFA then show button to revoke MFA */}
        {user?.userPreferences.enable2FA ? (
          <RevokeMFA />
        ) : (
          // If user has not MFA enabled then show dialog to enable MFA
          <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-[35px] text-white" disabled={isLoading}>
                Enable MFA
              </Button>
            </DialogTrigger>
            <DialogContent className="!gap-0">
              <DialogHeader>
                <DialogTitle className="text-[17px] text-slate-12 font-semibold">
                  Setup Multi-Factor Authentication
                </DialogTitle>
              </DialogHeader>

              {/* QR code info container */}
              <div>
                <p className="mt-6 text-sm text-[#0007149f] dark:text-inherit font-bold">
                  Scan the QR code
                </p>
                <span className="text-sm text-[#0007149f] dark:text-inherit font-normal">
                  Use an app like{" "}
                  <a
                    className="!text-primary underline decoration-primary decoration-1 underline-offset-2 transition duration-200 ease-in-out hover:decoration-blue-11 dark:text-current dark:decoration-slate-9 dark:hover:decoration-current "
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://support.1password.com/one-time-passwords/"
                  >
                    1Password
                  </a>{" "}
                  or{" "}
                  <a
                    className="!text-primary underline decoration-primary decoration-1 underline-offset-2 transition duration-200 ease-in-out hover:decoration-blue-11 dark:text-current dark:decoration-slate-9 dark:hover:decoration-current "
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://safety.google/authentication/"
                  >
                    Google Authenticator
                  </a>{" "}
                  to scan the QR code below.
                </span>
              </div>

              {/* The QR code img */}
              <div className="mt-4 flex flex-row items-center gap-4">
                <div className="shrink-0 rounded-md border p-2  border-[#0009321f] dark:border-gray-600 bg-white">
                  {isLoading || !mfaData?.qrImageUrl ? (
                    <Skeleton className="w-[160px] h-[160px]" />
                  ) : (
                    <img
                      alt="QR code"
                      src={mfaData.qrImageUrl}
                      decoding="async"
                      width="160"
                      height="160"
                      className="rounded-md"
                    />
                  )}
                </div>

                {/* Show QR code key */}
                {showKey ? (
                  <div className="w-full">
                    <div
                      className="flex items-center gap-1
                              text-sm text-[#0007149f] dark:text-muted-foreground font-normal"
                    >
                      <span className="text-white">Copy setup key</span>

                      {/* Copy button */}
                      <button
                        disabled={copied}
                        onClick={() => onCopy(mfaData.qrImageUrl)}
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy color="white" className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm block truncate w-[200px] text-black dark:text-muted-foreground">
                      {/* MFA SECRET */}
                      {mfaData.secret}
                    </p>
                  </div>
                ) : (
                  // Container with key to copy if user can't scan code
                  <span className="text-sm text-[#0007149f] dark:text-muted-foreground font-normal">
                    Can't scan the code?
                    <button
                      className="block text-primary transition duration-200 ease-in-out hover:underline
                   dark:text-white"
                      type="button"
                      onClick={() => setShowKey(true)}
                    >
                      View the Setup Key
                    </button>
                  </span>
                )}
              </div>

              {/* Input for secret code */}
              <div className="mt-8 border-t">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full mt-6 flex flex-col gap-4 "
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm mb-1 text-slate-11 font-bold">
                            Then enter the code
                          </FormLabel>
                          <FormControl>
                            <InputOTP
                              className="!text-lg flex items-center"
                              maxLength={6}
                              pattern={REGEXP_ONLY_DIGITS}
                              {...field}
                              style={{ justifyContent: "center" }}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot
                                  index={0}
                                  className="!w-14 !h-12 !text-lg"
                                />
                                <InputOTPSlot
                                  index={1}
                                  className="!w-14 !h-12 !text-lg"
                                />
                              </InputOTPGroup>
                              <InputOTPGroup>
                                <InputOTPSlot
                                  index={2}
                                  className="!w-14 !h-12 !text-lg"
                                />
                                <InputOTPSlot
                                  index={3}
                                  className="!w-14 !h-12 !text-lg"
                                />
                              </InputOTPGroup>
                              <InputOTPGroup>
                                <InputOTPSlot
                                  index={4}
                                  className="!w-14 !h-12 !text-lg"
                                />
                                <InputOTPSlot
                                  index={5}
                                  className="!w-14 !h-12 !text-lg"
                                />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full h-[40px]" disabled={isPending}>
                      {isPending && <Loader className="animate-spin" />}
                      Verify
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EnableMfa;
