"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabasePage() {
    const [status, setStatus] = useState("Testing connection...")
    const [tableExists, setTableExists] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errorDetails, setErrorDetails] = useState<any>(null)

    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log("Testing Supabase connection...")

                // Test: Can we connect to Supabase?
                const { data, error: selectError } = await supabase
                    .from("trees")
                    .select("*")
                    .limit(1)

                console.log("Supabase response:", { data, error: selectError })

                if (selectError) {
                    setError(`Error: ${selectError.message}`)
                    setErrorDetails(selectError)
                    setStatus("Connection failed")
                    setTableExists(false)
                } else {
                    setStatus("Connection successful!")
                    setTableExists(true)
                    setError(null)
                }
            } catch (err: any) {
                console.error("Unexpected error:", err)
                setError(`Unexpected error: ${err.message}`)
                setErrorDetails(err)
                setStatus("Connection failed")
            }
        }

        testConnection()
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

            <div className="space-y-4">
                <div>
                    <strong>Status:</strong> {status}
                </div>

                <div>
                    <strong>Table Exists:</strong> {tableExists ? "✅ Yes" : "❌ No"}
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {errorDetails && (
                    <div className="bg-gray-100 border border-gray-400 px-4 py-3 rounded text-xs">
                        <strong>Error Details:</strong>
                        <pre className="mt-2 overflow-auto">{JSON.stringify(errorDetails, null, 2)}</pre>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="font-bold mb-2">Check Browser Console (F12)</h2>
                    <p className="text-sm text-gray-600">Open the browser console to see detailed logs</p>
                </div>
            </div>
        </div>
    )
}
