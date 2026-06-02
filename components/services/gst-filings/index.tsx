// app/services/gst-filings/page.tsx
import Link from "next/link";

export default function GSTFilingsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Service</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                GST Filings
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Hassle-free GST return filing with input credit optimization. 
                Stay compliant and avoid penalties with our expert assistance.
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
                  GSTR-1, GSTR-3B Filing
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Input Tax Credit Optimization
                </li>
                <li className="flex items-center">
                  <span className="w-5 h-5 bg-[#F37920] rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                  Annual GSTR-9 & 9C
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Return Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#145886]">Types of GST Returns</h2>
            <p className="text-gray-600 mt-2">We handle all types of GST filings</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { form: "GSTR-1", desc: "Details of outward supplies", due: "11th of next month", frequency: "Monthly/Quarterly" },
              { form: "GSTR-3B", desc: "Summary return with tax payment", due: "20th of next month", frequency: "Monthly" },
              { form: "GSTR-4", desc: "Composition scheme dealers", due: "18th of month after quarter", frequency: "Quarterly" },
              { form: "GSTR-9", desc: "Annual return", due: "31st December", frequency: "Annually" },
              { form: "GSTR-9C", desc: "Reconciliation statement", due: "31st December", frequency: "Annually" },
              { form: "GSTR-10", desc: "Final return (cancellation)", due: "Within 3 months", frequency: "One time" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-[#145886] mb-2">{item.form}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <div className="text-sm">
                  <span className="font-semibold text-[#F37920]">Due: </span>
                  <span className="text-gray-700">{item.due}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-[#F37920]">Frequency: </span>
                  <span className="text-gray-700">{item.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#145886]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#145886] mb-6">Why Choose Our GST Services</h2>
              <div className="space-y-4">
                {[
                  "Error-free return preparation and filing",
                  "Maximum Input Tax Credit optimization",
                  "Timely reminders for due dates",
                  "Expert review by qualified professionals",
                  "Reconciliation of GSTR-2B with books",
                  "Handling GST notices and assessments",
                  "GST registration assistance",
                  "Annual GST audit support"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-5 h-5 bg-[#55B848] rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-[#145886] mb-4">Late Filing Penalties</h3>
              <div className="space-y-4">
                {[
                  { condition: "Nil Tax Liability", penalty: "₹20/day (max ₹5,000)" },
                  { condition: "With Tax Liability", penalty: "₹50/day + Interest @18%" },
                  { condition: "GSTR-9 Late Fee", penalty: "₹200/day (CGST + SGST)" },
                  { condition: "GSTR-9C Late Fee", penalty: "₹200/day (CGST + SGST)" }
                ].map((item, index) => (
                  <div key={index} className="pb-2 border-b border-gray-200 last:border-0">
                    <div className="font-semibold text-[#145886]">{item.condition}</div>
                    <div className="text-[#F37920]">{item.penalty}</div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Stress-Free GST Compliance</h2>
          <p className="text-white/90 mb-8">Let our experts handle your GST filings accurately and on time.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 hover:shadow-xl transition-all duration-300"
          >
            Start GST Filing
          </Link>
        </div>
      </section>
    </main>
  );
}