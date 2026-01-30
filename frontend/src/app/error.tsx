"use client";

import { useEffect } from "react";
import { CenteredLayout } from "@/components/layout/centered-layout";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <CenteredLayout>
            500 - Internal Server Error
        </CenteredLayout>
    );
}