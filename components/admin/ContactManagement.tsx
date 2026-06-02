"use client";
import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaSearch,
  FaSpinner,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getPaginatedContacts,
  deleteContact,
  ContactResponse,
} from "@/apirequests/contact";

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<ContactResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [itemsPerPage] = useState(10);
  const [selectedContact, setSelectedContact] = useState<ContactResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const fetchContacts = async (page: number) => {
    try {
      setLoading(true);
      const response = await getPaginatedContacts(page, itemsPerPage);
      
      // Handle the nested data structure from backend
      if (response.success && response.data) {
        setContacts(response.data.contacts || []);
        setTotalContacts(response.data.pagination?.total || 0);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setContacts([]);
        setTotalContacts(0);
        setTotalPages(1);
      }
    } catch (error: any) {
      console.error("Fetch contacts error:", error);
      setContacts([]);
      setTotalContacts(0);
      setTotalPages(1);
      
      // Handle 401 Unauthorized specifically
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        // Redirect to login
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to fetch contacts");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully");
      fetchContacts(currentPage);
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const handleViewDetails = (contact: ContactResponse) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const filteredContacts = (contacts || []).filter((contact) =>
    contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact?.phone?.includes(searchQuery) ||
    contact?.service?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceBadgeColor = (service: string) => {
    const colors: { [key: string]: string } = {
      "Company Incorporation": "bg-blue-100 text-blue-800",
      "Company Annual Compliances": "bg-purple-100 text-purple-800",
      "GST Filings": "bg-green-100 text-green-800",
      "ITR Filings": "bg-yellow-100 text-yellow-800",
      "Startup Registration (DPIIT)": "bg-red-100 text-red-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[service] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaEnvelope className="mr-3 text-blue-600" />
              Contact Submissions
            </h1>
            <p className="text-gray-600 mt-2">
              Total Submissions: <span className="font-bold text-[#145886]">{totalContacts}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredContacts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">No contact submissions found</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0">
                  <div className="flex-1 w-full">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {contact.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getServiceBadgeColor(contact.service)}`}>
                            {contact.service}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Phone:</span>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-[#145886] hover:text-[#F37920] transition-colors"
                        >
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-semibold text-gray-700">Message:</span>
                        <p className="text-gray-600 line-clamp-2">{contact.message}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <span>
                          {new Date(contact.createdAt || "").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full lg:w-auto">
                    <button
                      onClick={() => handleViewDetails(contact)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all text-sm font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => contact.id && handleDelete(contact.id)}
                      className="flex-1 lg:flex-none p-2 hover:bg-red-100 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FaTrash className="text-red-600 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h2>
                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getServiceBadgeColor(selectedContact.service)}`}>
                    {selectedContact.service}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-lg text-[#145886] hover:text-[#F37920] font-semibold transition-colors"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>

                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  Submitted on{" "}
                  <span className="font-semibold text-gray-900">
                    {new Date(selectedContact.createdAt || "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="flex-1 px-4 py-3 bg-[#145886] text-white font-semibold rounded-lg hover:bg-[#145886]/90 transition-all text-center"
                >
                  Call
                </a>
                <button
                  onClick={() => {
                    selectedContact.id && handleDelete(selectedContact.id);
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
