"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { NavUser } from "./NavUser";
import { navComponents } from "./nav-components";
import { Logo, MobileLogoAndHamburger } from "../logo/logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export default function NavBar() {
  let user = {
    userId: "1",
  };

  let userId = "1";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/80 dark:bg-black/80"
    >
      <div className="flex items-center justify-between p-4 lg:px-4 lg:py-1 max-w-7xl mx-auto">
        {/* This is mobile menu - Mobile */}
        <MobileLogoAndHamburger user={user} />

        {/* Logo - Desktop */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/dashboard" prefetch={true}>
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/playground" prefetch={true}>
            <Button variant="ghost">AI Playground</Button>
          </Link>
          <Link
            href="https://github.com/michaelshimeles/nextjs14-starter-template"
            prefetch={true}
          >
            <Button variant="ghost" size="icon">
              GITHUB
            </Button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!userId && (
            <Link href="/sign-in" prefetch={true}>
              <Button
                variant="default"
                className="bg-primary hover:bg-primary text-white"
              >
                Sign in
              </Button>
            </Link>
          )}
          {/* {userId && <UserProfile />} */}
          {userId && <NavUser user={data.user} />}
        </div>
      </div>
    </motion.nav>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="fluid-text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 fluid-text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
