"use client";
import AdminLayout from "@/ui/AdminLayout";
import TruthsList from "@/ui/TruthsList";

export default function TruthsPage() {
  return (
    <AdminLayout activePage="truths">
      <TruthsList />
    </AdminLayout>
  );
}
