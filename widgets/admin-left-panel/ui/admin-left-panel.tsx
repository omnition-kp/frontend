"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AdminProfile } from "./admin-profile";
import { useAdminData } from "../api";
import { LogOutIcon, Users } from "lucide-react";
import { AdminNavLink } from "./admin-nav-link";
import { ADMIN_LINK_ITEMS } from "../config/admin-link-items";
import { v4 as uuidv4 } from "uuid";
import { gtWalsheim } from "@/shared/config";
import { cn } from "@/shared/utils";
import { logout } from "@/features/admin-auth/actions/auth.actions";

export const AdminLeftPanel = () => {
    const pathname = usePathname();
    const { data: adminData, isLoading: loadingAdminData } = useAdminData();

    return (
        <aside className="min-w-[290px] bg-[#F9F9F9] rounded-[4px] p-5 min-h-[700px] fixed flex flex-col">
            <Image
                src="/admin-images/logo.svg"
                alt="logo"
                width={150}
                height={20}
                className="mb-15"
            />

            <AdminProfile
                name={adminData?.name || "Без имени"}
                role={adminData?.role === "ADMIN" ? "Суперадмин" : "Модератор"}
                loading={loadingAdminData}
            />

            <nav className="grid grid-cols-1 gap-1.5">
                {loadingAdminData
                    ? Array.from({ length: 2 }).map(() => (
                          <AdminNavLink
                              key={uuidv4()}
                              href="#"
                              icon={Users}
                              title="Клиенты"
                              isActive={false}
                              loading
                          />
                      ))
                    : ADMIN_LINK_ITEMS.map((link, index) => {
                          if (link.forAdmin && adminData?.role !== "ADMIN")
                              return null;

                          const isActive =
                              pathname === link.href ||
                              pathname.startsWith(link.href + "/");

                          return (
                              <AdminNavLink
                                  key={index}
                                  title={link.title}
                                  href={link.href}
                                  icon={link.icon}
                                  isActive={isActive}
                              />
                          );
                      })}
            </nav>

            <form action={logout} className="mt-auto w-full">
                <button
                    type="submit"
                    className="w-full flex items-center gap-1.5 cursor-pointer group"
                >
                    <LogOutIcon width={18} height={18} className="text-black" />

                    <p
                        className={cn(
                            gtWalsheim.className,
                            "text-[16px] font-medium leading-[0%] tracking-[0%] text-gray group-hover:text-black transition-colors duration-300 ease-in-out mt-0.5",
                        )}
                    >
                        Выйти
                    </p>
                </button>
            </form>
        </aside>
    );
};
