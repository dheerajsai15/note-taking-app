import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SpacesSidebar from "./spaces-sidebar";

export default async function SpacesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const userId = Number(session.user.id);

  const spaces = await prisma.space.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* ── Left Sidebar: Spaces ── */}
      <SpacesSidebar spaces={spaces} userEmail={session.user.email ?? ""}/>

      {/* ── Right content area: children (notes sidebar + main pane will go here) ── */}
      <section className="flex flex-1 flex-col overflow-hidden">
        {children}
      </section>
    </div>
  );
}
