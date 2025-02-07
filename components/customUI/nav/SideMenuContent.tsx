import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";
import { navComponents } from "./nav-components";
import { defaultName } from "@/config/default-name";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SideMenu = (userId:any) => {
  return (
    <SheetContent side="left" className="w-[300px]">
      <SheetHeader className="pb-6 border-b">
        <SheetTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span>{defaultName.appName}</span>
        </SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-1 mt-6">
        <div className="px-2 pb-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Navigation
          </h2>
          {navComponents.map((item) => (
            <Link key={item.href} href={item.href} prefetch={true}>
              <Button
                variant="ghost"
                className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="px-2 py-4 border-t">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Links
          </h2>
          <Link
            href="https://github.com/michaelshimeles/nextjs14-starter-template"
            target="_blank"
            prefetch={true}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </Button>
          </Link>
          <Link
            href="https://twitter.com/rasmickyy"
            target="_blank"
            prefetch={true}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
            ></Button>
          </Link>
          <Link
            href="https://youtube.com/@rasmickyy"
            target="_blank"
            prefetch={true}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-normal h-11 border border-muted/40 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
            >
              YouTube
            </Button>
          </Link>
        </div>

        {!userId && (
          <div className="px-2 py-4 border-t mt-auto">
            <Link href="/sign-in" prefetch={true}>
              <Button className="w-full bg-blue-600 hover:bg-blue-500">
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </SheetContent>
  );
};

export default SideMenu;
