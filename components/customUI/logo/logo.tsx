// =================================================
// ==================== APP LOGO ===================
// =================================================

import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { defaultName } from "@/config/default-name";
import { Dialog } from "@radix-ui/react-dialog";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import SideMenuContent from "../nav/SideMenuContent";

export const Logo = () => {
  // Arguments provided
  return (
    <div className="hidden lg:flex items-center gap-2">
      <Link href="/" prefetch={true} className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="font-semibold">{defaultName.appName}</span>
      </Link>
    </div>
  );
};

export const MobileLogoAndHamburger = ({
  user,
}: {
  user: {
    userId: string;
  };
}) => (
  <div className="flex lg:hidden items-center gap-2">
    <Dialog>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SideMenuContent userId={user.userId} />
    </Dialog>
    <Link href="/" prefetch={true} className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-primary" />
      <span className="font-semibold">{defaultName.appName}</span>
    </Link>
  </div>
);
