// app/services/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      id: "company-incorporation",
      title: "Company Incorporation",
     
      shortDesc: "Register your business as Private Limited, LLP, or OPC with expert guidance",
      description: "End-to-end company registration services with expert documentation and filing support.",
      features: [
        "Private Limited Company Registration",
        "Limited Liability Partnership (LLP)",
        "One Person Company (OPC)",
        "Section 8 Company (NGO)",
        "Partnership Firm Registration",
        "Sole Proprietorship"
      ],
      benefits: [
        "Legal entity recognition",
        "Limited liability protection",
        "Easy access to funding",
        "Separate legal identity",
        "Perpetual succession",
        "Tax benefits and deductions"
      ],
      color: "from-[#145886] to-[#145886]/80"
    },
    {
      id: "company-annual-compliances",
      title: "Company Annual Compliances",
      
      shortDesc: "Stay compliant with ROC filings, board meetings, and annual returns",
      description: "Complete annual compliance management for your business to avoid penalties and legal issues.",
      features: [
        "Annual ROC Filings (AOC-4, MGT-7)",
        "Board Meeting Minutes",
        "Annual General Meeting",
        "Director's Report",
        "Maintenance of Statutory Registers",
        "XBRL Filings"
      ],
      benefits: [
        "Avoid heavy penalties",
        "Maintain good standing",
        "Stress-free compliance",
        "Expert documentation",
        "Timely filings",
        "Legal protection"
      ],
      color: "from-[#F37920] to-[#F37920]/80"
    },
    {
      id: "gst-filings",
      title: "GST Filings",
      shortDesc: "Hassle-free GST return filing and compliance management",
      description: "Professional GST return filing services with input credit optimization and compliance tracking.",
      features: [
        "GSTR-1 (Monthly/Quarterly)",
        "GSTR-3B (Monthly)",
        "GSTR-9 (Annual Return)",
        "GSTR-9C (Reconciliation)",
        "Input Tax Credit Optimization",
        "GST Registration"
      ],
      benefits: [
        "Error-free filings",
        "Maximum input credit",
        "Deadline reminders",
        "Expert review",
        "Compliance tracking",
        "Peace of mind"
      ],
      color: "from-[#145886] to-[#145886]/80"
    },
    {
      id: "itr-filings",
      title: "ITR Filings",
      
      shortDesc: "Income tax return filing for individuals and businesses",
      description: "Accurate and timely income tax return filing services with tax planning advice.",
      features: [
        "ITR-1 (Salaried Individuals)",
        "ITR-3 (Business/Profession)",
        "ITR-4 (Presumptive Income)",
        "ITR-5 (Firms/LLPs)",
        "ITR-6 (Companies)",
        "TDS Return Filing"
      ],
      benefits: [
        "Maximum tax savings",
        "Error-free returns",
        "Quick processing",
        "Expert tax advice",
        "Notice handling",
        "Refund tracking"
      ],
      color: "from-[#F37920] to-[#F37920]/80"
    },
    {
      id: "startup-registration-dpiit",
      title: "Startup Registration (DPIIT)",
      
      shortDesc: "Get DPIIT recognition and avail startup India benefits",
      description: "Complete assistance for DPIIT registration and startup India scheme benefits.",
      features: [
        "DPIIT Recognition",
        "Startup India Certificate",
        "Tax Exemption under 80IAC",
        "Angel Tax Exemption",
        "Self-certification under Labour Laws",
        "IPR Benefits"
      ],
      benefits: [
        "Tax holiday for 3 years",
        "Fast-track patent examination",
        "Access to funding",
        "Government tenders access",
        "Networking opportunities",
        "Credibility boost"
      ],
      color: "from-[#145886] to-[#145886]/80"
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
              Comprehensive Business Solutions
            </h1>
            <p className="text-lg text-gray-600">
              End-to-end professional services to help your business grow and stay compliant
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${service.color} p-6`}>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                  <div className="flex items-center text-[#F37920] font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Why Choose Our Services</h2>
            <p className="text-gray-600 mt-2">We deliver excellence through expertise and commitment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {  title: "Fast Turnaround", desc: "Quick processing with attention to detail" },
              {  title: "100% Accuracy", desc: "Error-free documentation and filings" },
              {  title: "Confidentiality", desc: "Strict privacy and data protection" },
              {  title: "Expert Team", desc: "Qualified CA, CS, and legal professionals" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-[#145886] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#145886] mb-4">Need Help Choosing the Right Service?</h2>
          <p className="text-gray-600 mb-8">
            Our experts are here to guide you. Schedule a free consultation today.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}