// app/services/itr-filings/page.tsx
import Link from "next/link";

export default function ITRFilingsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Service</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                ITR Filings
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Accurate and timely income tax return filing for individuals, businesses, and firms. 
                Maximize your tax savings with expert advice.
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
                  ITR-1 to ITR-6 Filing
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Tax Planning & Savings
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Notice Handling & Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ITR Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Which ITR Form to Use?</h2>
            <p className="text-gray-600 mt-2">Choose the right form for your income type</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { form: "ITR-1 (Sahaj)", for: "Salaried individuals, pensioners", income: "Income up to ₹50 lakhs" },
              { form: "ITR-2", for: "Individuals/HUF not having business", income: "Capital gains, foreign income" },
              { form: "ITR-3", for: "Business/profession individuals", income: "Proprietorship, business income" },
              { form: "ITR-4 (Sugam)", for: "Presumptive business", income: "Business under 44AD, 44ADA" },
              { form: "ITR-5", for: "Firms, LLPs, AOPs", income: "Partnership firms, LLPs" },
              { form: "ITR-6", for: "Companies", income: "All companies except section 11" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-[#145886] mb-2">{item.form}</h3>
                <p className="text-gray-600 text-sm mb-2"><span className="font-semibold">For:</span> {item.for}</p>
                <p className="text-gray-600 text-sm"><span className="font-semibold">Income:</span> {item.income}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Due Dates & Penalties */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-6">Important Due Dates</h2>
              <div className="space-y-4">
                {[
                  { type: "Individual/HUF (Non-audit)", due: "31st July 2024", lateFee: "₹5,000" },
                  { type: "Business (Audit)", due: "31st October 2024", lateFee: "₹5,000" },
                  { type: "Transfer Pricing", due: "30th November 2024", lateFee: "₹10,000" },
                  { type: "Belated Return", due: "31st December 2024", lateFee: "₹5,000 - ₹10,000" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-[#145886]">{item.type}</span>
                        <p className="text-sm text-gray-500">Due: {item.due}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#F37920] text-white text-sm rounded-full">Late Fee: {item.lateFee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-6">Benefits of Timely Filing</h2>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <ul className="space-y-3">
                  {[
                    "Avoid late filing fees up to ₹10,000",
                    "Carry forward losses to future years",
                    "Quick income tax refund processing",
                    "Easy loan approval process",
                    "Visa application support",
                    "No notices from Income Tax Department"
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

      {/* CTA */}
      <section className="py-16 bg-[#145886]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">File Your ITR Today</h2>
          <p className="text-white/90 mb-8">Avoid penalties and maximize your tax savings with expert assistance.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            File ITR Now
          </Link>
        </div>
      </section>
    </main>
  );
}