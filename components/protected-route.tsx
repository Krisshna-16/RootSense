"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/auth/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsub();
    }, [router]);

    if (loading) return <p className="p-8 text-center">Checking authentication...</p>;

    return <>{children}</>;
}
