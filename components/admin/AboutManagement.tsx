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
    FaArrowUp,
    FaArrowDown,
    FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
    getAllAboutSectionsAdmin,
    createAboutSection,
    updateAboutSection,
    deleteAboutSection,
    updateSectionVisibility,
    reorderAboutSections,
    AboutSection,
} from "@/apirequests/about";
import ReactQuillWrapper from "./ReactQuillWrapper";

const AboutManagement: React.FC = () => {
    const [sections, setSections] = useState<AboutSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentSection, setCurrentSection] = useState<AboutSection | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState<AboutSection>({
        sectionTitle: "",
        sectionSubtitle: "",
        content: "",
        imageUrl: "",
        order: 0,
        isVisible: true,
    });

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
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            setLoading(true);
            const data = await getAllAboutSectionsAdmin();
            setSections(data || []);
        } catch (error) {
            toast.error("Failed to fetch about sections");
            setSections([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({
            ...prev,
            content,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.sectionTitle.trim()) {
            toast.error("Section title is required");
            return;
        }
        if (!formData.content.trim()) {
            toast.error("Content is required");
            return;
        }

        const submitFormData = new FormData();
        submitFormData.append("sectionTitle", formData.sectionTitle);
        submitFormData.append("sectionSubtitle", formData.sectionSubtitle || "");
        submitFormData.append("content", formData.content);
        submitFormData.append("order", String(formData.order));
        submitFormData.append("isVisible", String(formData.isVisible));

        if (selectedImage) {
            submitFormData.append("image", selectedImage);
        }

        try {
            if (editMode && currentSection?.id) {
                await updateAboutSection(currentSection.id, submitFormData);
                toast.success("Section updated successfully");
            } else {
                await createAboutSection(submitFormData);
                toast.success("Section created successfully");
            }
            resetForm();
            fetchSections();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save section");
        }
    };

    const handleEdit = (section: AboutSection) => {
        setCurrentSection(section);
        setFormData(section);
        setEditMode(true);
        setPreviewUrl(section.imageUrl || null);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this section?")) {
            try {
                await deleteAboutSection(id);
                toast.success("Section deleted successfully");
                fetchSections();
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed to delete section");
            }
        }
    };

    const handleToggleVisibility = async (id: number, currentVisibility: boolean) => {
        try {
            await updateSectionVisibility(id, !currentVisibility);
            toast.success("Visibility updated successfully");
            fetchSections();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update visibility");
        }
    };

    const handleReorder = async (id: number, direction: "up" | "down") => {
        const index = sections.findIndex((s) => s.id === id);
        if (
            (direction === "up" && index === 0) ||
            (direction === "down" && index === sections.length - 1)
        ) {
            return;
        }

        const newSections = [...sections];
        const swapIndex = direction === "up" ? index - 1 : index + 1;

        // Swap orders
        const temp = newSections[index].order;
        newSections[index].order = newSections[swapIndex].order;
        newSections[swapIndex].order = temp;

        setSections(newSections);

        try {
            const reorderData = newSections.map((s) => ({
                id: s.id!,
                order: s.order,
            }));
            await reorderAboutSections(reorderData);
            toast.success("Order updated successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to reorder sections");
            fetchSections();
        }
    };

    const resetForm = () => {
        setFormData({
            sectionTitle: "",
            sectionSubtitle: "",
            content: "",
            imageUrl: "",
            order: 0,
            isVisible: true,
        });
        setSelectedImage(null);
        setPreviewUrl(null);
        setEditMode(false);
        setCurrentSection(null);
        setShowModal(false);
    };

    const filteredSections = sections.filter((section) =>
        section.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">About Page Management</h1>
                    <p className="text-gray-600 text-sm mt-1">
                        Manage sections of your About Us page
                    </p>
                </div>
                <button
                    onClick={() => resetForm()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <FaPlus className="w-4 h-4" />
                    Add Section
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Sections List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {filteredSections.length === 0 ? (
                    <div className="p-8 text-center">
                        <FaInfoCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No sections found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        Section Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSections.map((section) => (
                                    <tr key={section.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {section.sectionTitle}
                                                </p>
                                                {section.sectionSubtitle && (
                                                    <p className="text-sm text-gray-500">
                                                        {section.sectionSubtitle}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleReorder(section.id!, "up")}
                                                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                                                    disabled={
                                                        sections.findIndex((s) => s.id === section.id) === 0
                                                    }
                                                >
                                                    <FaArrowUp className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <span className="text-sm font-medium text-gray-700 w-8 text-center">
                                                    {section.order}
                                                </span>
                                                <button
                                                    onClick={() => handleReorder(section.id!, "down")}
                                                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                                                    disabled={
                                                        sections.findIndex((s) => s.id === section.id) ===
                                                        sections.length - 1
                                                    }
                                                >
                                                    <FaArrowDown className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(section.id!, section.isVisible)}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    section.isVisible
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                            >
                                                {section.isVisible ? (
                                                    <>
                                                        <FaEye className="w-3 h-3" /> Visible
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaEyeSlash className="w-3 h-3" /> Hidden
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(section)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(section.id!)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editMode ? "Edit Section" : "Add New Section"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Section Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title *
                                </label>
                                <input
                                    type="text"
                                    name="sectionTitle"
                                    value={formData.sectionTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Firm Overview"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Section Subtitle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="sectionSubtitle"
                                    value={formData.sectionSubtitle || ""}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Overview"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <ReactQuillWrapper
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    placeholder="Enter section content..."
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Image
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full"
                                    />
                                    {previewUrl && (
                                        <div className="mt-4">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-h-64 rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Visibility */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="isVisible"
                                    checked={formData.isVisible}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                    Visible on website
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 justify-end border-t border-gray-200 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editMode ? "Update Section" : "Create Section"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutManagement;
