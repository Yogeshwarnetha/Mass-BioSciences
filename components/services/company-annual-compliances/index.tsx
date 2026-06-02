// app/services/company-annual-compliances/page.tsx
import Link from "next/link";

export default function CompanyAnnualCompliancesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Service</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                Company Annual Compliances
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Stay compliant with ROC filings, board meetings, and annual returns. 
                We handle all statutory requirements to keep your company in good standing.
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
                  Annual ROC Filings (AOC-4, MGT-7)
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Board Meeting Minutes
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Director's Report & Financials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Annual Compliance Checklist</h2>
            <p className="text-gray-600 mt-2">Everything we handle for your company</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "ROC Filings",
                items: ["Form AOC-4 (Financial Statements)", "Form MGT-7 (Annual Return)", "Form ADT-1 (Auditor Appointment)", "Form DIR-3 KYC (Director KYC)"]
              },
              {
                title: "Board Meetings",
                items: ["Minimum 4 Board Meetings per year", "Meeting Minutes preparation", "Meeting Notices & Agenda", "Resolution drafting"]
              },
              {
                title: "Statutory Registers",
                items: ["Register of Members", "Register of Directors", "Register of Charges", "Register of Contracts"]
              },
              {
                title: "Additional Compliance",
                items: ["Director's Report", "Annual General Meeting", "Maintenance of Books", "XBRL Filings (if applicable)"]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-[#145886] mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Due Dates */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#145886] text-center mb-12">Important Due Dates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { form: "AOC-4", due: "Within 30 days of AGM", penalty: "₹100/day" },
              { form: "MGT-7", due: "Within 60 days of AGM", penalty: "₹100/day" },
              { form: "DIR-3 KYC", due: "30th April annually", penalty: "₹5,000" },
              { form: "ADT-1", due: "15 days from AGM", penalty: "₹300/day" },
              { form: "Income Tax Return", due: "31st October", penalty: "₹5,000+" },
              { form: "GST Returns", due: "20th of next month", penalty: "₹50/day" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#145886]">{item.form}</h3>
                <p className="text-gray-600 text-sm mt-1">Due: {item.due}</p>
                <p className="text-[#F37920] font-semibold text-sm mt-2">Late Fee: {item.penalty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#145886]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Avoid Penalties, Stay Compliant</h2>
          <p className="text-white/90 mb-8">Let us handle your annual compliances while you focus on business.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            Get Compliance Support
          </Link>
        </div>
      </section>
    </main>
  );
}