import Link from "next/link";
import NavigationComponent from "@/components/Navigation";
import Footer from "@/components/Footer";
import routes from "@/helpers/routes";

export default function TermsAndConditions() {
  const lastUpdated = "January 15, 2026";
  const effectiveDate = "January 15, 2026";

  return (
    <>
      <NavigationComponent />
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

            {/* Introduction */}
            <section className="mb-10">
              <p className="text-stone-600 leading-relaxed">
                Welcome to the NDDC Connect Hub (&quot;Portal&quot;), the
                official digital submission platform of the Niger Delta
                Development Commission (&quot;NDDC&quot;, &quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;). By accessing or using this
                Portal, you (&quot;User&quot;, &quot;you&quot;, or
                &quot;your&quot;) agree to be bound by these Terms and
                Conditions (&quot;Terms&quot;). If you do not agree with any
                part of these Terms, you must not use this Portal.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                1. Definitions
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  <strong>&quot;Portal&quot;</strong> refers to the NDDC Connect
                  Hub digital submission platform, including all associated
                  websites, applications, and services.
                </p>
                <p>
                  <strong>&quot;Submission&quot;</strong> refers to any
                  document, form, request, proposal, complaint, or communication
                  submitted through the Portal.
                </p>
                <p>
                  <strong>&quot;User Account&quot;</strong> refers to the
                  registered account created to access the Portal&apos;s
                  services.
                </p>
                <p>
                  <strong>&quot;Content&quot;</strong> refers to all text,
                  documents, images, data, and other materials uploaded or
                  submitted through the Portal.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                2. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  By using this Portal, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms, as well as
                  our Privacy Policy. These Terms constitute a legally binding
                  agreement between you and NDDC.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time.
                  Changes will be effective immediately upon posting to the
                  Portal. Your continued use of the Portal after any changes
                  constitutes acceptance of the modified Terms.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                3. Eligibility and Registration
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>To use this Portal, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Be at least 18 years of age or have the legal capacity to
                    enter into binding agreements
                  </li>
                  <li>
                    Provide accurate, current, and complete information during
                    registration
                  </li>
                  <li>Maintain the security of your account credentials</li>
                  <li>
                    Notify us immediately of any unauthorized access to your
                    account
                  </li>
                  <li>
                    Accept responsibility for all activities that occur under
                    your account
                  </li>
                </ul>
                <p>
                  NDDC reserves the right to refuse service, terminate accounts,
                  or remove content at our sole discretion.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                4. Permitted Use
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  The Portal is provided for the purpose of facilitating
                  legitimate communications and submissions to NDDC. You agree
                  to use the Portal only for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Submitting legitimate requests, proposals, complaints, and
                    communications to NDDC
                  </li>
                  <li>Tracking the status of your submissions</li>
                  <li>Responding to requests for additional information</li>
                  <li>Accessing information and resources provided by NDDC</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                5. Prohibited Activities
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>
                    Impersonate any person or entity or misrepresent your
                    affiliation
                  </li>
                  <li>Upload malicious software, viruses, or harmful code</li>
                  <li>
                    Attempt to gain unauthorized access to the Portal&apos;s
                    systems or other users&apos; accounts
                  </li>
                  <li>
                    Interfere with or disrupt the Portal&apos;s infrastructure
                    or services
                  </li>
                  <li>
                    Use the Portal for any illegal purpose or in violation of
                    Nigerian law
                  </li>
                  <li>
                    Harvest, collect, or store personal information of other
                    users
                  </li>
                  <li>
                    Use automated systems (bots, scrapers) to access the Portal
                    without permission
                  </li>
                  <li>
                    Circumvent, disable, or interfere with security features of
                    the Portal
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                6. Submissions and Content
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  <strong>6.1 Ownership:</strong> You retain ownership of any
                  original content you submit through the Portal. However, by
                  submitting content, you grant NDDC a non-exclusive,
                  royalty-free license to use, process, store, and share your
                  submission as necessary to provide our services and fulfill
                  our governmental functions.
                </p>
                <p>
                  <strong>6.2 Accuracy:</strong> You represent and warrant that
                  all information and documents you submit are accurate,
                  complete, and not misleading. Submission of false or
                  fraudulent information may result in legal consequences under
                  Nigerian law.
                </p>
                <p>
                  <strong>6.3 Retention:</strong> Submissions may be retained in
                  accordance with government records retention policies and
                  applicable Nigerian regulations.
                </p>
                <p>
                  <strong>6.4 No Guarantee of Action:</strong> Submission
                  through this Portal does not guarantee approval, funding, or
                  any specific action by NDDC. All submissions are subject to
                  review and processing according to NDDC&apos;s policies and
                  procedures.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                7. Processing and Response Times
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  While NDDC strives to process submissions in a timely manner,
                  processing times may vary based on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The type and complexity of the submission</li>
                  <li>The completeness of information provided</li>
                  <li>Current workload and resource availability</li>
                  <li>Required inter-departmental reviews and approvals</li>
                </ul>
                <p>
                  NDDC does not guarantee specific response times unless
                  explicitly stated in applicable Service Level Agreements.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                8. Intellectual Property
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  The Portal, including its design, graphics, logos, text, and
                  software, is the property of NDDC and is protected by Nigerian
                  copyright and intellectual property laws. You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Copy, modify, or distribute any part of the Portal without
                    authorization
                  </li>
                  <li>
                    Use NDDC&apos;s name, logo, or branding without written
                    permission
                  </li>
                  <li>Remove or alter any proprietary notices or labels</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                9. Disclaimer of Warranties
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  The Portal is provided &quot;AS IS&quot; and &quot;AS
                  AVAILABLE&quot; without warranties of any kind, either express
                  or implied. NDDC disclaims all warranties, including but not
                  limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Implied warranties of merchantability and fitness for a
                    particular purpose
                  </li>
                  <li>
                    Warranties that the Portal will be uninterrupted,
                    error-free, or secure
                  </li>
                  <li>
                    Warranties regarding the accuracy or reliability of any
                    information obtained through the Portal
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                10. Limitation of Liability
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  To the maximum extent permitted by Nigerian law, NDDC shall
                  not be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use or inability to use the Portal</li>
                  <li>
                    Any unauthorized access to or alteration of your submissions
                  </li>
                  <li>Any interruption or cessation of Portal services</li>
                  <li>
                    Any errors or omissions in the Portal&apos;s content or
                    functionality
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                11. Indemnification
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  You agree to indemnify, defend, and hold harmless NDDC, its
                  officers, employees, and agents from any claims, damages,
                  losses, or expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your violation of these Terms</li>
                  <li>Your submission of false or fraudulent information</li>
                  <li>Your violation of any rights of third parties</li>
                  <li>Your violation of any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                12. Governing Law and Jurisdiction
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the Federal Republic of Nigeria. Any disputes
                  arising from or relating to these Terms or your use of the
                  Portal shall be subject to the exclusive jurisdiction of the
                  Nigerian courts.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                13. Severability
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  If any provision of these Terms is found to be invalid or
                  unenforceable, the remaining provisions shall continue in full
                  force and effect. The invalid or unenforceable provision shall
                  be modified to the minimum extent necessary to make it valid
                  and enforceable.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                14. Entire Agreement
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  These Terms, together with our Privacy Policy, constitute the
                  entire agreement between you and NDDC regarding your use of
                  the Portal and supersede any prior agreements or
                  understandings.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-stone-900 mb-4">
                15. Contact Information
              </h2>
              <div className="space-y-3 text-stone-600 leading-relaxed">
                <p>
                  For questions or concerns regarding these Terms, please
                  contact us:
                </p>
                <div className="bg-stone-50 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-stone-900">
                    Niger Delta Development Commission
                  </p>
                  <p>167 Aba Road, Port Harcourt</p>
                  <p>Rivers State, Nigeria</p>
                  <p className="mt-3">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:legal@nddc.gov.ng"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      legal@nddc.gov.ng
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 800 NDDC HELP
                  </p>
                </div>
              </div>
            </section>

            {/* Footer Links */}
            <div className="pt-8 border-t border-stone-200 flex flex-wrap gap-4 text-sm">
              <Link
                href={routes.privacyPolicy()}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Privacy Policy →
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
