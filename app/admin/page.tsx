import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminPage() {
  redirect((await getAdminSession()) ? "/admin/articles" : "/admin/login");
}
