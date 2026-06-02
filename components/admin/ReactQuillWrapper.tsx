"use client";
import React, { useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";

interface ReactQuillWrapperProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    modules?: any;
    formats?: string[];
    className?: string;
}

const ReactQuillWrapper: React.FC<ReactQuillWrapperProps> = ({
    value,
    onChange,
    placeholder = "Write your content here...",
    modules,
    className = "",
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const isUpdatingRef = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined" || !editorRef.current) return;

        // Import Quill dynamically
        import("quill").then((Quill) => {
            if (!editorRef.current || quillRef.current) return;

            // Initialize Quill
            quillRef.current = new Quill.default(editorRef.current, {
                theme: "snow",
                placeholder,
                modules: modules || {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ align: [] }],
                        ["link", "image"],
                        ["clean"],
                        [{ color: [] }, { background: [] }],
                    ],
                },
            });

            // Set initial content
            if (value) {
                quillRef.current.root.innerHTML = value;
            }

            // Handle text changes
            quillRef.current.on("text-change", () => {
                if (isUpdatingRef.current) return;
                const html = quillRef.current.root.innerHTML;
                onChange(html);
            });
        });

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    // Update content when value prop changes
    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            isUpdatingRef.current = true;
            quillRef.current.root.innerHTML = value || "";
            isUpdatingRef.current = false;
        }
    }, [value]);

    return (
        <div className={className}>
            <div ref={editorRef} />
        </div>
    );
};

export default React.memo(ReactQuillWrapper);
