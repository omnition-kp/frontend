"use client";

import { useEffect } from "react";
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
import { useLeftPanelStage } from "@/shared/store";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_PANEL_CONFIG } from "../config";

export const AdminLeftPanel = () => {
    const pathname = usePathname();
    const { data: adminData, isLoading: loadingAdminData } = useAdminData();
    const { setStage } = useLeftPanelStage();
    const isNarrow = /^\/admin\/kp\/(create\/)?[^/]+$/.test(pathname);
    const { width, padding, sizes, animation } = ADMIN_PANEL_CONFIG;

    useEffect(() => {
        setStage(isNarrow ? "narrowed" : "full");
    }, [pathname, setStage, isNarrow]);

    return (
        <motion.aside
            initial={false}
            // Анимируем ширину панели и паддинги
            animate={{
                width: isNarrow ? width.collapsed : width.expanded,
                paddingLeft: isNarrow ? padding.collapsed : padding.expanded,
                paddingRight: isNarrow ? padding.collapsed : padding.expanded,
            }}
            transition={animation}
            // items-start важно, чтобы элементы не прыгали в центр при расширении
            className="bg-[#F9F9F9] rounded-[4px] py-5 min-h-[700px] sticky top-[20px] flex flex-col overflow-hidden z-50 items-start box-border"
        >
            {/* ЛОГОТИП */}
            <div
                className="mb-15 shrink-0 flex items-center overflow-hidden"
                style={{ height: sizes.logoHeight, width: "100%" }}
            >
                <motion.div
                    animate={{ opacity: isNarrow ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: sizes.logoWidth }}
                >
                    <Image
                        src="/admin-images/logo.svg"
                        alt="logo"
                        width={sizes.logoWidth}
                        height={sizes.logoHeight}
                        priority
                    />
                </motion.div>
            </div>

            {/* ПРОФИЛЬ */}
            <motion.div
                className="mb-8 overflow-hidden shrink-0"
                // ВАЖНО: Анимируем в конкретные пиксели (250px), а не в 100%
                animate={{
                    width: isNarrow ? sizes.elementWidth : sizes.contentWidth,
                }}
                transition={animation}
            >
                {/* min-w-[250px] держит контент жестким, пока маска (родитель) расширяется */}
                <div
                    className="flex items-center"
                    style={{ minWidth: sizes.contentWidth }}
                >
                    <AdminProfile
                        name={adminData?.name || "Без имени"}
                        role={
                            adminData?.role === "ADMIN"
                                ? "Суперадмин"
                                : "Модератор"
                        }
                        loading={loadingAdminData}
                    />
                </div>
            </motion.div>

            {/* НАВИГАЦИЯ */}
            <nav className="flex flex-col gap-1.5 w-full">
                {loadingAdminData
                    ? Array.from({ length: 2 }).map(() => (
                          <AdminNavLink
                              key={uuidv4()}
                              href="#"
                              icon={Users}
                              title={isNarrow ? "" : "Клиенты"}
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
                                  title={isNarrow ? "" : link.title}
                                  href={link.href}
                                  icon={link.icon}
                                  isActive={isActive}
                                  className={cn(
                                      isNarrow && "justify-center gap-0 px-0",
                                  )}
                                  // Здесь тоже жесткие размеры для плавности
                                  style={{
                                      width: isNarrow
                                          ? sizes.elementWidth
                                          : sizes.contentWidth,
                                      height: isNarrow
                                          ? sizes.elementHeight
                                          : "auto",
                                  }}
                              />
                          );
                      })}
            </nav>

            {/* КНОПКА ВЫХОДА */}
            <form action={logout} className="mt-auto w-full">
                <button
                    type="submit"
                    className={cn(
                        "w-full flex items-center gap-1.5 cursor-pointer group transition-all",
                        isNarrow ? "justify-center gap-0" : "justify-start",
                    )}
                    // Анимируем ширину кнопки явно
                    style={{
                        height: sizes.elementHeight,
                        width: isNarrow
                            ? sizes.elementWidth
                            : sizes.contentWidth,
                    }}
                    title="Выйти"
                >
                    <LogOutIcon
                        width={18}
                        height={18}
                        className="text-black shrink-0"
                    />

                    <AnimatePresence>
                        {!isNarrow && (
                            <motion.p
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className={cn(
                                    gtWalsheim.className,
                                    "text-[16px] font-medium text-gray group-hover:text-black transition-colors ml-1 whitespace-nowrap overflow-hidden",
                                )}
                            >
                                Выйти
                            </motion.p>
                        )}
                    </AnimatePresence>
                </button>
            </form>
        </motion.aside>
    );
};
