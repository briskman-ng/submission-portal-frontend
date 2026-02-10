import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Bell,
  UserCheck,
  Globe,
  Mail,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import routes from "@/helpers/routes";

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2026";
  const effectiveDate = "January 15, 2026";

  return (
    <>
      <Navigation />
      <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 sm:p-12">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-8 pb-8 border-b border-stone-200">
              <span>
                <strong>Last Updated:</strong> {lastUpdated}
              </span>
              <span>
                <strong>Effective Date:</strong> {effectiveDate}
              </span>
            </div>

            {/* Quick Summary */}
            <section className="mb-10 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy at a Glance
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Database className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-800">
                    We collect only information necessary to process your
                    submissions
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-800">
                    Your data is encrypted and stored securely
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-800">
                    We do not sell your personal information
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-800">
                    You have rights to access and correct your data
                  </span>
                </div>
              </div>
            </section>

            {/* Introduction */}
            <section className="mb-10">
              <p className="text-stone-600 leading-relaxed">
                The Niger Delta Development Commission (&quot;NDDC&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed
                to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use the NDDC Connect Hub (&quot;Portal&quot;). This policy
                complies with the Nigeria Data Protection Regulation (NDPR) and
                other applicable data protection laws.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                1. Information We Collect
              </h2>

              <h3 className="text-lg font-medium text-stone-800 mt-6 mb-3">
                1.1 Information You Provide
              </h3>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>When you use our Portal, you may provide us with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Identification Information:</strong> Full
                    name, date of birth, gender, nationality, and
                    government-issued identification numbers
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Email address, phone
                    number, postal address, and emergency contact details
                  </li>
                  <li>
                    <strong>Professional Information:</strong> Organization
                    name, job title, professional qualifications, and business
                    registration details
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Bank account details
                    (for payment-related submissions), tax identification
                    numbers
                  </li>
                  <li>
                    <strong>Submission Content:</strong> Documents, proposals,
                    complaints, requests, and any attachments you upload
                  </li>
                  <li>
                    <strong>Communication Records:</strong> Messages, responses,
                    and correspondence through the Portal
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-stone-800 mt-6 mb-3">
                1.2 Information Collected Automatically
              </h3>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>When you access the Portal, we automatically collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Device Information:</strong> IP address, browser
                    type and version, operating system, device identifiers
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Pages visited, time spent on
                    pages, click patterns, submission history
                  </li>
                  <li>
                    <strong>Log Data:</strong> Access times, error logs,
                    referring URLs
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong> Session
                    cookies, authentication tokens, and preference settings
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600" />
                2. How We Use Your Information
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>We use your information for the following purposes:</p>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  2.1 Primary Purposes
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing and managing your submissions</li>
                  <li>
                    Communicating with you about your submissions and requests
                  </li>
                  <li>Verifying your identity and preventing fraud</li>
                  <li>
                    Providing customer support and responding to inquiries
                  </li>
                  <li>
                    Fulfilling NDDC&apos;s governmental and regulatory functions
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  2.2 Secondary Purposes
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Improving and optimizing the Portal&apos;s functionality
                  </li>
                  <li>Analyzing usage patterns to enhance user experience</li>
                  <li>Generating anonymized statistical reports</li>
                  <li>Ensuring security and preventing unauthorized access</li>
                  <li>
                    Complying with legal obligations and government audits
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>We may share your information with:</p>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  3.1 Within NDDC
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Relevant departments and directorates processing your
                    submission
                  </li>
                  <li>
                    State offices when submissions relate to their jurisdiction
                  </li>
                  <li>Internal audit and compliance teams</li>
                </ul>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  3.2 Third Parties
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Government Agencies:</strong> Other federal, state,
                    or local government bodies when required for processing or
                    by law
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Technology vendors,
                    cloud service providers, and contractors who assist in
                    Portal operations (under strict data protection agreements)
                  </li>
                  <li>
                    <strong>Financial Institutions:</strong> Banks and payment
                    processors for payment-related submissions
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> Law enforcement, courts,
                    or regulatory bodies when legally required
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  3.3 We Do NOT
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sell your personal information to third parties</li>
                  <li>
                    Share your information for commercial marketing purposes
                  </li>
                  <li>
                    Transfer your data internationally without adequate
                    safeguards
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                4. Data Security
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  We implement comprehensive security measures to protect your
                  information:
                </p>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  4.1 Technical Safeguards
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Multi-factor authentication (MFA) for user accounts</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Intrusion detection and prevention systems</li>
                  <li>Automated backup and disaster recovery systems</li>
                </ul>

                <h3 className="text-lg font-medium text-stone-800 mt-4 mb-2">
                  4.2 Organizational Safeguards
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Role-based access control (RBAC) limiting data access to
                    authorized personnel
                  </li>
                  <li>
                    Regular staff training on data protection and security
                  </li>
                  <li>Incident response procedures for data breaches</li>
                  <li>Compliance with ISO 27001 security standards</li>
                </ul>

                <p className="mt-4">
                  While we strive to protect your information, no method of
                  electronic transmission or storage is 100% secure. We cannot
                  guarantee absolute security but will notify you of any breach
                  affecting your data as required by law.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                5. Data Retention
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>We retain your information for the following periods:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Active Submissions:</strong> Retained until the
                    submission is fully processed and closed
                  </li>
                  <li>
                    <strong>Completed Submissions:</strong> Retained for a
                    minimum of 7 years in accordance with government records
                    retention requirements
                  </li>
                  <li>
                    <strong>Account Information:</strong> Retained for the
                    duration of your account plus 3 years after closure
                  </li>
                  <li>
                    <strong>Audit Logs:</strong> Retained for 10 years for
                    compliance and accountability purposes
                  </li>
                </ul>
                <p className="mt-4">
                  After the retention period, data is securely deleted or
                  anonymized for statistical purposes.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                6. Your Rights Under NDPR
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  Under the Nigeria Data Protection Regulation (NDPR), you have
                  the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of the
                    personal data we hold about you
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Request correction
                    of inaccurate or incomplete data
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> Request deletion of your
                    data (subject to legal retention requirements)
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> Request
                    limitation of how we use your data
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Request your
                    data in a machine-readable format
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to certain types of
                    processing
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent
                    where processing is based on consent
                  </li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact our Data Protection
                  Officer using the contact information below. We will respond
                  to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>We use the following types of cookies:</p>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border border-stone-200 rounded-lg">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="text-left p-3 border-b border-stone-200 font-semibold">
                          Cookie Type
                        </th>
                        <th className="text-left p-3 border-b border-stone-200 font-semibold">
                          Purpose
                        </th>
                        <th className="text-left p-3 border-b border-stone-200 font-semibold">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-b border-stone-100">
                          Essential
                        </td>
                        <td className="p-3 border-b border-stone-100">
                          Authentication, security, basic functionality
                        </td>
                        <td className="p-3 border-b border-stone-100">
                          Session
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border-b border-stone-100">
                          Functional
                        </td>
                        <td className="p-3 border-b border-stone-100">
                          Remember preferences, language settings
                        </td>
                        <td className="p-3 border-b border-stone-100">
                          1 year
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">Analytics</td>
                        <td className="p-3">
                          Usage statistics, performance monitoring
                        </td>
                        <td className="p-3">2 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">
                  You can manage cookie preferences through your browser
                  settings. Note that disabling essential cookies may affect
                  Portal functionality.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                8. Children&apos;s Privacy
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  The Portal is not intended for use by individuals under 18
                  years of age. We do not knowingly collect personal information
                  from children. If you believe we have collected information
                  from a minor, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-600" />
                9. Changes to This Policy
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  We may update this Privacy Policy periodically. When we make
                  material changes, we will:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Post the updated policy on this page with a new &quot;Last
                    Updated&quot; date
                  </li>
                  <li>Notify you via email if you have an account</li>
                  <li>Display a prominent notice on the Portal</li>
                </ul>
                <p className="mt-4">
                  We encourage you to review this policy regularly. Your
                  continued use of the Portal after changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                10. Complaints
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  If you believe your privacy rights have been violated, you
                  may:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact our Data Protection Officer directly</li>
                  <li>
                    Lodge a complaint with the National Information Technology
                    Development Agency (NITDA)
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 11 - Contact */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                11. Contact Us
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  For questions, concerns, or requests regarding this Privacy
                  Policy or your personal data, please contact:
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  <div className="bg-stone-50 rounded-lg p-6">
                    <h3 className="font-semibold text-stone-900 mb-3">
                      Data Protection Officer
                    </h3>
                    <p>Niger Delta Development Commission</p>
                    <p>167 Aba Road, Port Harcourt</p>
                    <p>Rivers State, Nigeria</p>
                    <p className="mt-3">
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:dpo@nddc.gov.ng"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        dpo@nddc.gov.ng
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong> +234 800 NDDC DPO
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-lg p-6">
                    <h3 className="font-semibold text-stone-900 mb-3">
                      General Inquiries
                    </h3>
                    <p>NDDC Connect Hub Support</p>
                    <p className="mt-3">
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:support@nddc.gov.ng"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        support@nddc.gov.ng
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong> +234 800 NDDC HELP
                    </p>
                    <p className="mt-3">
                      <strong>Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM
                      WAT
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Links */}
            <div className="pt-8 border-t border-stone-200 flex flex-wrap gap-4 text-sm">
              <Link
                href={routes.termsAndConditions()}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Terms and Conditions →
              </Link>
              <Link
                href={routes.home()}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Return to Portal →
              </Link>
            </div>
          </div>
        </main>
      </section>

      <Footer />
    </>
  );
}
