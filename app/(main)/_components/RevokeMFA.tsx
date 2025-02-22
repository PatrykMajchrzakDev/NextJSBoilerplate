"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "@/hooks/use-toast";
import { revokeMFAMutationFn } from "@/lib/API/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useCallback } from "react";

const RevokeMFA = () => {
  // user query
  const { user, refetch } = useAuthContext();
  // Mutation fn to revoke MFA
  const { mutate, isPending } = useMutation({
    mutationFn: revokeMFAMutationFn,
    onSuccess: (response: any) => {
      // Invalidate user object
      refetch();
      // Success msg if everything went fine
      toast({
        title: "Success",
        description: response.data.message || "Removed MFA successfully",
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

  const handleClick = useCallback(() => {
    mutate();
  }, []);

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="h-[35px] text-[#c40006d3] bg-red-100 shadow-none mr-1"
    >
      {isPending && <Loader className="animate-spin" />}
      Revoke Access
    </Button>
  );
};

export default RevokeMFA;
