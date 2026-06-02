"use client";
import React, { useState, useEffect } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaSearch,
    FaSpinner,
    FaNewspaper,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
    getAllInsightsAdmin,
    createInsight,
    updateInsight,
    deleteInsight,
    Insight,
} from "@/apirequests/insights";
import ReactQuillWrapper from "./ReactQuillWrapper";

const InsightsManagement: React.FC = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentInsight, setCurrentInsight] = useState<Insight | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState<Insight>({
        title: "",
        excerpt: "",
        category: "General",
        author: "CA Ratan V",
        readTime: "5 min read",
        slug: "",
        content: "",
        isPublished: true,
    });

    const categories = [
        "General",
        "Tax Updates",
        "GST",
        "Startup",
        "Company Law",
        "ITR",
        "Compliance",
    ];

    // ReactQuill modules configuration
    const quillModules = {
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
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "color",
        "background",
    ];

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        try {
            setLoading(true);
            const data = await getAllInsightsAdmin();
            setInsights(data);
        } catch (error) {
            toast.error("Failed to fetch insights");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Auto-generate slug whenever title changes
    useEffect(() => {
        if (formData.title) {
            const slug = formData.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
                .replace(/(^-|-$)/g, ""); // Remove leading/trailing hyphens
            
            setFormData((prev) => ({
                ...prev,
                slug,
            }));
        }
    }, [formData.title]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size must be less than 5MB");
                return;
            }
            // Validate file type
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file");
                return;
            }
            setSelectedImage(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.slug) {
            toast.error("Please fill all required fields (Title and Content)");
            return;
        }

        try {
            if (editMode && currentInsight?.id) {
                // Create FormData for multipart/form-data
                const submitData = new FormData();
                submitData.append("title", formData.title);
                submitData.append("excerpt", formData.excerpt || "");
                submitData.append("category", formData.category);
                submitData.append("author", formData.author);
                submitData.append("readTime", formData.readTime);
                submitData.append("slug", formData.slug);
                submitData.append("content", formData.content || "");
                submitData.append("isPublished", String(formData.isPublished));
                if (selectedImage) {
                    submitData.append("image", selectedImage);
                }
                await updateInsight(currentInsight.id, submitData);
                toast.success("Insight updated successfully");
            } else {
                // Create FormData for multipart/form-data
                const submitData = new FormData();
                submitData.append("title", formData.title);
                submitData.append("excerpt", formData.excerpt || "");
                submitData.append("category", formData.category);
                submitData.append("author", formData.author);
                submitData.append("readTime", formData.readTime);
                submitData.append("slug", formData.slug);
                submitData.append("content", formData.content || "");
                submitData.append("isPublished", String(formData.isPublished));
                if (selectedImage) {
                    submitData.append("image", selectedImage);
                }
                await createInsight(submitData);
                toast.success("Insight created successfully");
            }
            fetchInsights();
            handleCloseModal();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save insight");
        }
    };

    const handleEdit = (insight: Insight) => {
        setCurrentInsight(insight);
        setFormData({
            title: insight.title,
            excerpt: insight.excerpt || "",
            category: insight.category,
            author: insight.author,
            readTime: insight.readTime,
            slug: insight.slug,
            content: insight.content || "",
            imageUrl: insight.imageUrl,
            isPublished: insight.isPublished,
        });
        setSelectedImage(null);
        setPreviewUrl(insight.imageUrl || null);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this insight?")) {
            return;
        }

        try {
            await deleteInsight(id);
            toast.success("Insight deleted successfully");
            fetchInsights();
        } catch (error) {
            toast.error("Failed to delete insight");
        }
    };

    const handleTogglePublish = async (insight: Insight) => {
        if (!insight.id) return;

        try {
            await updateInsight(insight.id, {
                isPublished: !insight.isPublished,
            });
            toast.success(
                insight.isPublished
                    ? "Insight unpublished successfully"
                    : "Insight published successfully"
            );
            fetchInsights();
        } catch (error) {
            toast.error("Failed to update insight");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditMode(false);
        setCurrentInsight(null);
        setSelectedImage(null);
        setPreviewUrl(null);
        setFormData({
            title: "",
            excerpt: "",
            category: "General",
            author: "CA Ratan V",
            readTime: "5 min read",
            slug: "",
            content: "",
            imageUrl: "",
            isPublished: true,
        });
    };

    const filteredInsights = insights.filter(
        (insight) =>
            insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            insight.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper function to create content preview
    const getContentPreview = (content: string, maxLength: number = 150): string => {
        // Strip HTML tags
        const stripped = content.replace(/<[^>]*>/g, "");
        // Trim and truncate
        return stripped.length > maxLength
            ? stripped.substring(0, maxLength) + "..."
            : stripped;
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <FaNewspaper className="mr-3 text-blue-600" />
                            Insights Management
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage your blog posts and insights
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                    >
                        <FaPlus />
                        <span>Add New Insight</span>
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search insights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Insights List */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredInsights.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
                            <p className="text-gray-600">No insights found</p>
                        </div>
                    ) : (
                        filteredInsights.map((insight) => (
                            <div
                                key={insight.id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {insight.title}
                                                    </h3>
                                                    {insight.isPublished ? (
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                                            Draft
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 mb-3">
                                                    {insight.excerpt || getContentPreview(insight.content || "")}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                        {insight.category}
                                                    </span>
                                                    <span>👤 {insight.author}</span>
                                                    <span>⏱️ {insight.readTime}</span>
                                                    <span>
                                                        📅{" "}
                                                        {new Date(
                                                            insight.createdAt || ""
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleTogglePublish(insight)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                                            title={
                                                insight.isPublished
                                                    ? "Unpublish"
                                                    : "Publish"
                                            }
                                        >
                                            {insight.isPublished ? (
                                                <FaEye className="text-green-600" />
                                            ) : (
                                                <FaEyeSlash className="text-gray-400" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(insight)}
                                            className="p-2 hover:bg-blue-100 rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <FaEdit className="text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() => insight.id && handleDelete(insight.id)}
                                            className="p-2 hover:bg-red-100 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <FaTrash className="text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editMode ? "Edit Insight" : "Add New Insight"}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Slug will be auto-generated: {formData.slug || "your-slug-here"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Read Time
                                    </label>
                                    <input
                                        type="text"
                                        name="readTime"
                                        value={formData.readTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author
                                </label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                    </label>
                                    <div className="mb-4">
                                        {previewUrl && (
                                            <div className="relative mb-4">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedImage(null);
                                                        setPreviewUrl(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}\n                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />\n                                        <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WebP, GIF. Max size: 5MB</p>\n                                    </div>\n                                </div>\n\n                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <div className="bg-white rounded-lg border border-gray-300">
                                    <ReactQuillWrapper
                                        value={formData.content || ""}
                                        onChange={(value) =>
                                            setFormData((prev) => ({ ...prev, content: value }))
                                        }
                                        modules={quillModules}
                                        formats={quillFormats}
                                        placeholder="Write your blog content here..."
                                        className="h-64"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Use the rich text editor to format your content with headings, lists, links, and images.
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={formData.isPublished}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            isPublished: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Publish immediately
                                </label>
                            </div>

                            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                                >
                                    {editMode ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InsightsManagement;
