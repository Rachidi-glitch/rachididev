"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import { navLinks } from "@/lib/nav-links";
import { Button } from "@/components/ui/Button";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col justify-between border-l border-white/10 bg-dark-soft px-6 py-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">RachidiDev</span>
                <button
                  onClick={onClose}
                  aria-label="Fermer le menu"
                  className="rounded-full p-2 text-white hover:bg-white/10"
                >
                  <IconX size={22} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        active
                          ? "bg-brand/10 text-brand-light"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <Button href="/contact" className="w-full" onClick={onClose}>
              Me contacter
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
