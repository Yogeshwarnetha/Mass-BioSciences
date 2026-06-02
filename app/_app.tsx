// pages/_app.tsx
"use client";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useEffect(() => {
        // Disable right-click context menu
        const onContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Prevent text selection except in input fields
        const onSelectStart = (e: Event) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable)
            ) {
                return;
            }
            e.preventDefault();
        };

        // Prevent copy/cut/paste except in input fields
        const onCopyCut = (e: ClipboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable)
            ) {
                return;
            }
            e.preventDefault();
        };

        // Prevent keyboard shortcuts
        const onKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

            // Allow copy/cut/paste in input fields
            const target = e.target as HTMLElement | null;
            const isInput = target && (
                target.tagName === "INPUT" || 
                target.tagName === "TEXTAREA" || 
                target.isContentEditable
            );

            if (isInput) {
                // Allow copy/paste in input fields
                if (
                    (ctrlKey && e.key.toLowerCase() === "c") ||
                    (ctrlKey && e.key.toLowerCase() === "v") ||
                    (ctrlKey && e.key.toLowerCase() === "x")
                ) {
                    return;
                }
            }

            if (
                (ctrlKey && e.key.toLowerCase() === "u") || // view source
                (ctrlKey && e.key.toLowerCase() === "s") || // save
                (ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // devtools
                (ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") || // devtools element
                (ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") || // devtools console
                e.key === "F12" || // devtools
                (ctrlKey && e.key.toLowerCase() === "p") // print
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", onContextMenu);
        document.addEventListener("selectstart", onSelectStart);
        document.addEventListener("copy", onCopyCut);
        document.addEventListener("cut", onCopyCut);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("contextmenu", onContextMenu);
            document.removeEventListener("selectstart", onSelectStart);
            document.removeEventListener("copy", onCopyCut);
            document.removeEventListener("cut", onCopyCut);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;