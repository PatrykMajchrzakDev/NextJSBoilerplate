"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { ArrowLeft, Frown, Loader } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/common/schemas/authFormSchemas";
import { resetPasswordMutationFn } from "@/lib/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export default function ResetPassword() {
  //Router for redirect
  const router = useRouter();

  //Params to get URL params
  const params = useSearchParams();
  // Get code param from url
  const code = params.get("code");

  //   Variables to check if code is expired
  const exp = Number(params.get("exp"));
  const now = Date.now();

  //   Checks if code did not expire
  const isValid = code && exp && exp > now;

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Mutation API function
  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  // Submit function
  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    // Redirect if no code provided
    if (!code) {
      router.replace("/forgot-password?email=");
      return;
    }
    // Data send to API
    const data = {
      password: values.password,
      verificationCode: code,
    };

    // Mutation
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        // Redirect to login page
        router.replace("/signin");
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
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-background p-6 md:p-10 w-full">
      {/* IF PROVIDED CODE IN URL IS VALID */}
      {isValid ? (
        <section className="w-full max-w-sm md:max-w-xl rounded-md">
          <Card className="p-6 md:p-10 bg-card">
            <Logo isHidden="" />

            <h1
              className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left"
            >
              Set up a new password
            </h1>
            <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
              Your password must be different from your previous one.
            </p>

            {/* FORM */}
            <Form {...form}>
              <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="mb-0">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          New password
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-0">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          Confirm new password
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="w-full text-[15px] h-[40px] text-white font-semibold"
                  disabled={isPending}
                >
                  {/* ADD SPINNER WHEN BUTTON API CALL */}
                  {isPending && <Loader className="animate-spin" />}
                  Update password
                </Button>
              </form>
            </Form>
          </Card>
        </section>
      ) : (
        // RETURN INVALID MESSAGE IF CODE IS EXPIRED
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
          <div className="size-[48px]">
            <Frown size="48px" className="animate-bounce text-red-500" />
          </div>
          <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
            Invalid or expired reset link
          </h2>
          <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
            You can request a new password reset link
          </p>
          <Link href="/forgot-password?email=">
            <Button className="h-[40px]">
              <ArrowLeft />
              Go to forgot password
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
