import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - SIXARMS',
  description: 'Privacy Policy for SIXARMS AI-powered content creation platform',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-light-gray">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p className="text-light-gray">
              SIXARMS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our AI-powered content 
              creation platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mt-4">Personal Information</h3>
            <p className="text-light-gray">We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Profile information</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-4">Usage Information</h3>
            <p className="text-light-gray">We automatically collect:</p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li>Content generation history</li>
              <li>Platform preferences</li>
              <li>Feature usage patterns</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
            <p className="text-light-gray">We use the collected information to:</p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li>Provide and maintain our Service</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications (with consent)</li>
              <li>Improve our AI models and services</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Data Sharing and Disclosure</h2>
            <p className="text-light-gray">We may share your information with:</p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf</li>
              <li><strong>AI Providers:</strong> OpenAI for content generation (anonymized)</li>
              <li><strong>Payment Processors:</strong> Stripe for secure payment processing</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-light-gray mt-4">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
            <p className="text-light-gray">
              We implement appropriate technical and organizational measures to protect your information, including:
            </p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Your Rights and Choices</h2>
            <p className="text-light-gray">You have the right to:</p>
            <ul className="list-disc list-inside text-light-gray space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your account and associated data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Cookies and Tracking</h2>
            <p className="text-light-gray">
              We use cookies and similar tracking technologies to improve your experience. You can control 
              cookies through your browser settings, but disabling them may limit certain features.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. International Data Transfers</h2>
            <p className="text-light-gray">
              Your information may be transferred to and processed in countries other than your own. We ensure 
              appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Children&apos;s Privacy</h2>
            <p className="text-light-gray">
              Our Service is not directed to children under 13. We do not knowingly collect personal information 
              from children under 13. If you become aware that a child has provided us with personal information, 
              please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Changes to This Policy</h2>
            <p className="text-light-gray">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">11. Contact Us</h2>
            <p className="text-light-gray">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              <br /><br />
              Email: privacy@sixarms.ai
              <br />
              Address: SIXARMS, Inc., [Your Address]
              <br />
              Data Protection Officer: dpo@sixarms.ai
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">12. California Privacy Rights</h2>
            <p className="text-light-gray">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), 
              including the right to know, delete, and opt-out of the sale of personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">13. European Privacy Rights</h2>
            <p className="text-light-gray">
              If you are in the European Economic Area (EEA), you have additional rights under the General Data 
              Protection Regulation (GDPR), including the right to lodge a complaint with your local supervisory authority.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-coral hover:text-coral-light transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}