import { FlashcardsIcon } from "@/app/_components/FlashcardsIcon";
import MenuNavigationLink from "@/app/_components/MenuNavigationLink";
import NavbarNavigationLink from "@/app/_components/NavbarNavigationLink";
import "@/app/globals.css";
import { createClient } from "@/lib/supabase/server";
import { Menu } from "@base-ui/react/menu";
import "material-symbols";
import "material-symbols/outlined.css";

const supabase = createClient();

interface NavigationLink {
  name: string;
  href: string;
  requiresSignIn?: boolean;
}

const navbarNavigationLinks: NavigationLink[] = [
  { name: "Flashcards", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

const menuNavigationLinks: NavigationLink[] = [
  { name: "Sign in", href: "/sign-in", requiresSignIn: false },
  { name: "Profile", href: "/profile", requiresSignIn: true },
  { name: "Sign out", href: "/sign-out", requiresSignIn: true },
];

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <>
      <header className="flex h-16 justify-between border-b border-gray-700 bg-gray-900 px-8">
        <div className="flex items-center">
          <FlashcardsIcon className="w-8 text-indigo-500" />

          <div className="ms-2 flex flex-col text-xs font-bold text-indigo-500 select-none">
            <span>Learn</span>
            <span>Burmese</span>
          </div>

          <nav className="ms-12 flex h-full space-x-6">
            {navbarNavigationLinks.map((link) => (
              <NavbarNavigationLink
                key={link.name}
                name={link.name}
                href={link.href}
              />
            ))}
          </nav>
        </div>

        <Menu.Root>
          <Menu.Trigger
            className="material-symbols-outlined cursor-pointer self-center text-gray-400 transition-all ease-in-out select-none hover:text-white"
            style={{ fontSize: "32px" }}
          >
            account_circle
          </Menu.Trigger>

          <Menu.Portal>
            <Menu.Positioner sideOffset={8}>
              <Menu.Popup className="origin-(--transform-origin) transition-all ease-in-out data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
                {menuNavigationLinks.map((link, index) => {
                  const numberOfNavigationLinks = menuNavigationLinks.filter(
                    (link) => link.requiresSignIn === !!user,
                  ).length;

                  return (
                    link.requiresSignIn === !!user && (
                      <MenuNavigationLink
                        key={link.name}
                        name={link.name}
                        href={link.href}
                        index={index}
                        numberOfNavigationLinks={numberOfNavigationLinks}
                      />
                    )
                  );
                })}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </header>

      <div className="flex flex-1">{children}</div>
    </>
  );
}
