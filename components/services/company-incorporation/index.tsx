// app/services/company-incorporation/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function CompanyIncorporationPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Service</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                Company Incorporation
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Register your business as a Private Limited Company, LLP, or OPC with expert guidance. 
                We handle all documentation and filings for a hassle-free experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="bg-[#145886] rounded-2xl p-8 text-white">
             
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Private Limited Company
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Limited Liability Partnership (LLP)
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  One Person Company (OPC)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">What We Offer</h2>
            <p className="text-gray-600 mt-2">Complete company registration solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Private Limited Company",
                features: ["Minimum 2 directors", "Minimum 2 shareholders", "Limited liability protection", "Easy funding access"],
                icon: "🏢"
              },
              {
                title: "Limited Liability Partnership",
                features: ["Minimum 2 partners", "No minimum capital", "Lower compliance cost", "Perpetual succession"],
                icon: "🤝"
              },
              {
                title: "One Person Company",
                features: ["Single director/shareholder", "Limited liability", "Full control", "Professional credibility"],
                icon: "👤"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#145886] mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-4">Documents Required</h2>
              <div className="space-y-4">
                {[
                  "PAN Card of all directors/partners",
                  "Aadhaar Card of all directors/partners",
                  "Passport size photographs",
                  "Address proof (Bank statement/Utility bill)",
                  "Registered office address proof",
                  "NOC from property owner"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-[#145886] rounded-full flex items-center justify-center text-white text-sm mr-3 flex-shrink-0">{index + 1}</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-[#145886] mb-4">Process Timeline</h3>
              <div className="space-y-4">
                {[
                  { step: "Document Collection", time: "Day 1-2", status: "Same day" },
                  { step: "Name Approval (RUN/SPICe+)", time: "Day 2-4", status: "2-3 days" },
                  { step: "DIN & DSC Application", time: "Day 2-3", status: "1-2 days" },
                  { step: "MoA & AoA Drafting", time: "Day 3-4", status: "1 day" },
                  { step: "Filing with ROC", time: "Day 4-5", status: "1-2 days" },
                  { step: "Certificate Issuance", time: "Day 7-10", status: "Complete" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700">{item.step}</span>
                    <span className="font-semibold text-[#145886]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#145886]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Register Your Company?</h2>
          <p className="text-white/90 mb-8">Get expert assistance for smooth and quick company registration.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}