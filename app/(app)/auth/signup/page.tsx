"use client"
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/auth/login");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-2xl font-bold mb-4">Create an Account</h1>

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
                onClick={handleSignup}
                className="bg-green-600 text-white px-4 py-2 rounded w-80 mt-4"
            >
                Sign Up
            </button>

            <p className="mt-4 text-sm">
                Already have an account?{" "}
                <a className="text-green-600" href="/auth/login">
                    Login
                </a>
            </p>
        </div>
    );
}
