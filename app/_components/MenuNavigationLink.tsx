"use client";

import { classNames } from "@/lib/class-name-generator";
import { createClient } from "@/lib/supabase/client";
import { Menu } from "@base-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const supabase = createClient();

export default function MenuNavigationLink({
  name,
  href,
  index,
  numberOfNavigationLinks,
}: {
  name: string;
  href: string | undefined;
  index: number;
  numberOfNavigationLinks: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItem = (
    <Menu.Item
      className={classNames(
        "w-48 border-x border-gray-700 px-4 py-2 text-start",
        href === pathname
          ? "cursor-default bg-gray-800 text-white"
          : "cursor-pointer bg-gray-900 text-gray-400 transition-all ease-in-out hover:bg-gray-800 hover:text-white",
        index <= 0 ? "rounded-t-md border-t" : "",
        index >= numberOfNavigationLinks - 1 ? "rounded-b-md border-b" : "",
      )}
      disabled={href === pathname}
    >
      {name}
    </Menu.Item>
  );

  async function handleSignOutButtonClick() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  return (
    <>
      {href ? (
        <Link
          key={name}
          href={href || ""}
          aria-current={href === pathname ? "page" : undefined}
        >
          {menuItem}
        </Link>
      ) : (
        <button onClick={handleSignOutButtonClick}>{menuItem}</button>
      )}
    </>
  );
}
