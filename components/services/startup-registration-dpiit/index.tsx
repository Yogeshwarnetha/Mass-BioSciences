// app/services/startup-registration-dpiit/page.tsx
import Link from "next/link";

export default function StartupRegistrationPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Service</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                Startup Registration (DPIIT)
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Get DPIIT recognition and unlock exclusive benefits under the Startup India scheme. 
                Tax exemptions, funding access, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="#benefits"
                  className="px-8 py-4 border-2 border-[#145886] text-[#145886] font-semibold rounded-lg hover:bg-[#145886] hover:text-white transition-all duration-300"
                >
                  View Benefits
                </Link>
              </div>
            </div>
            <div className="bg-[#145886] rounded-2xl p-8 text-white">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  DPIIT Recognition Certificate
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Tax Exemption under 80IAC
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Angel Tax Exemption
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Benefits of DPIIT Recognition</h2>
            <p className="text-gray-600 mt-2">Why every startup should register</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: "Tax Holiday", desc: "100% tax exemption for 3 consecutive years under section 80IAC" },
              { icon: "💸", title: "Angel Tax Exemption", desc: "Exemption from section 56(2)(viib) on investments above fair value" },
              { icon: "⚡", title: "Fast-track Patent", desc: "80% rebate on patent filing & fast-track examination" },
              { icon: "📋", title: "Self-certification", desc: "Self-certify compliance under 6 labour & 3 environment laws" },
              { icon: "🏛️", title: "Government Tenders", desc: "Relaxation in eligibility criteria for government tenders" },
              { icon: "💰", title: "Fund of Funds", desc: "Access to ₹10,000 crore Fund of Funds for startups" },
              { icon: "🔄", title: "Easy Winding Up", desc: "Fast-track insolvency resolution within 90 days" },
              { icon: "🌐", title: "Networking", desc: "Access to startup ecosystem and networking events" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-[#145886] mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-6">Eligibility Criteria</h2>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <ul className="space-y-4">
                  {[
                    "Entity type: Private Limited, LLP, or Partnership",
                    "Age: Less than 10 years from incorporation",
                    "Annual turnover: Not exceeding ₹100 crore in any year",
                    "Innovation: Working towards innovation/improvement of products/processes",
                    "Not formed by splitting/reconstructing existing business",
                    "Original entity: Should not have been formed by demerger/reconstruction"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-[#145886] rounded-full flex items-center justify-center text-white text-sm mr-3 flex-shrink-0">{index + 1}</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-6">Documents Required</h2>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <ul className="space-y-3">
                  {[
                    "Certificate of Incorporation",
                    "PAN of the entity",
                    "Detailed business plan/pitch deck",
                    "Proof of funding (if any)",
                    "Patent/Trademark details (if any)",
                    "Website/app details",
                    "Director/Partner details with DIN/PAN",
                    "Brief video (2-5 minutes) about the startup"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-5 h-5 bg-[#55B848] rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Benefits Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#145886] text-center mb-12">Tax Benefits Explained</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Section 80IAC - Tax Holiday",
                desc: "100% deduction of profits for 3 consecutive years out of 10 years",
                condition: "Turnover不超过₹25 crore",
                benefit: "Save up to ₹25 lakhs per year"
              },
              {
                title: "Section 56(2)(viib) - Angel Tax Exemption",
                desc: "Exemption from tax on share premium received from investors",
                condition: "Investment up to ₹25 crore",
                benefit: "No tax on angel funding"
              },
              {
                title: "Capital Gains Exemption",
                desc: "Exemption on capital gains invested in startup",
                condition: "Investment in eligible startup shares",
                benefit: "Save up to 20% on LTCG"
              },
              {
                title: "Patent Filing Rebate",
                desc: "80% rebate on patent filing fees",
                condition: "For startups recognized by DPIIT",
                benefit: "80% cost savings on patents"
              }
            ].map((item, index) => (
              <div key={index} className="bg-[#145886]/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#145886] mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.desc}</p>
                <div className="text-sm">
                  <span className="font-semibold text-[#F37920]">Condition: </span>
                  <span className="text-gray-700">{item.condition}</span>
                </div>
                <div className="text-sm mt-1">
                  <span className="font-semibold text-[#55B848]">Benefit: </span>
                  <span className="text-gray-700">{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Registration Process</h2>
            <p className="text-gray-600 mt-2">Simple 5-step process to get DPIIT recognition</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Entity Incorporation", desc: "Register as Pvt Ltd/LLP" },
              { step: "2", title: "Document Collection", desc: "Gather all required documents" },
              { step: "3", title: "Online Application", desc: "Fill DPIIT recognition form" },
              { step: "4", title: "Document Upload", desc: "Upload on startup portal" },
              { step: "5", title: "Certificate Issuance", desc: "Get recognition certificate" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[#145886] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#145886] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">Timeline: <span className="font-bold text-[#145886]">7-10 working days</span></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#145886]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Startup?</h2>
          <p className="text-white/90 mb-8">Get DPIIT recognition and unlock exclusive benefits for your startup.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            Register Your Startup
          </Link>
        </div>
      </section>
    </main>
  );
}