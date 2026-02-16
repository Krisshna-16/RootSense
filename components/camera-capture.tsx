"use client"

import React, { useRef, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw, Check, X } from "lucide-react";

interface CameraCaptureProps {
    onCapture: (file: File) => void;
    onCancel: () => void;
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" } // Prefer back camera on mobile
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
                setError(null);
            }
        } catch (err: any) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera. Please ensure you have granted permissions.");
        }
    };

    // Start camera on mount
    React.useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
        }
    };

    const captureImage = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert to Blob/File
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                        onCapture(file);
                        stopCamera();
                    }
                }, "image/jpeg", 0.8);
            }
        }
    }, [onCapture]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button variant="outline" onClick={onCancel}>Close</Button>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col items-center bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 sm:h-80 object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute bottom-4 flex gap-4">
                <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={onCancel}
                    title="Cancel"
                >
                    <X className="h-6 w-6" />
                </Button>

                <Button
                    variant="default"
                    size="icon"
                    className="rounded-full h-16 w-16 border-4 border-white"
                    onClick={captureImage}
                    title="Capture Photo"
                >
                    <div className="h-12 w-12 bg-white rounded-full" />
                </Button>
            </div>
        </div>
    );
}
