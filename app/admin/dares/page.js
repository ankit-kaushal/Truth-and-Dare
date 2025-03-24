'use client';
import AdminLayout from '@/ui/AdminLayout';
import DaresList from '@/ui/DaresList';

export default function DaresPage() {
    return (
        <AdminLayout activePage="dares">
            <DaresList />
        </AdminLayout>
    );
}