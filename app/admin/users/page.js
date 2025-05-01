"use client";
import AdminLayout from "@/ui/AdminLayout";
import UsersList from "@/ui/UsersList";

export default function UsersPage() {
  return (
    <AdminLayout activePage="users">
      <UsersList />
    </AdminLayout>
  );
}
