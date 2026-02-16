"use client"
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/"); // redirect to home
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <input
                className="border px-3 py-2 rounded mb-2 w-80"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border px-3 py-2 rounded mb-2 w-80"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="bg-green-600 text-white px-4 py-2 rounded w-80 mt-4"
            >
                Login
            </button>

            <p className="mt-4 text-sm">
                Don’t have an account?{" "}
                <a className="text-green-600" href="/auth/signup">
                    Create Account
                </a>
            </p>
        </div>
    );
}
