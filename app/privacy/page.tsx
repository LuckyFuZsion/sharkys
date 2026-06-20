import type { Metadata } from "next"
import Link from "next/link"
import SiteChrome from "@/components/site-chrome"
import PageHeader from "@/components/page-header"
import { createPageMetadata } from "@/lib/page-metadata"
import { businessInfo } from "@/lib/business-info"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Sharky's Bar collects, uses, and protects personal data on sharkys-albufeira.com, in line with GDPR and Portuguese data protection law.",
  path: "/privacy",
})

const lastUpdated = "20 June 2025"

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <PageHeader
        title="Privacy Policy"
        description="This policy explains how we handle personal data when you visit our website or contact Sharky's Bar."
      />

      <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-700">
        <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Who we are</h2>
          <p>
            Sharky&apos;s Bar (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates{" "}
            <Link href="/" className="text-blue-700 hover:underline">
              sharkys-albufeira.com
            </Link>
            . We are the data controller for personal data processed through this website.
          </p>
          <address className="mt-4 not-italic">
            <strong>{businessInfo.name}</strong>
            <br />
            {businessInfo.address.formatted}
            <br />
            Email:{" "}
            <a href={`mailto:${businessInfo.email}`} className="text-blue-700 hover:underline">
              {businessInfo.email}
            </a>
            <br />
            Phone:{" "}
            <a href={`tel:${businessInfo.telephone}`} className="text-blue-700 hover:underline">
              {businessInfo.telephoneDisplay}
            </a>
          </address>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What data we collect</h2>
          <p className="mb-3">We collect limited information depending on how you use the site:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Website visitors:</strong> technical data such as IP address, browser type, device type, and
              pages viewed. This is collected automatically by our hosting provider to deliver the site securely.
            </li>
            <li>
              <strong>When you contact us:</strong> if you email, call, WhatsApp, or message us via social media, we
              receive the information you choose to share (for example your name, phone number, or message content).
            </li>
            <li>
              <strong>Admin area:</strong> if you log in to the private gallery admin at{" "}
              <Link href="/admin" className="text-blue-700 hover:underline">
                /admin
              </Link>
              , we set a session cookie to keep you signed in. Login credentials are verified on our server and are
              not stored in the cookie.
            </li>
          </ul>
          <p className="mt-3">
            We do not operate a public contact form on this website and we do not sell personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How we use your data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate, maintain, and secure the website.</li>
            <li>To respond to enquiries about bookings, events, menu items, or general questions.</li>
            <li>To manage gallery content through the password-protected admin area.</li>
            <li>To comply with legal obligations where required.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Legal basis (GDPR)</h2>
          <p className="mb-3">Under the General Data Protection Regulation (GDPR), we rely on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Legitimate interests</strong> — to run and protect our website and respond to routine business
              enquiries.
            </li>
            <li>
              <strong>Contract or pre-contractual steps</strong> — when you ask us about private events, reservations,
              or similar services.
            </li>
            <li>
              <strong>Consent</strong> — where you choose to contact us or follow links to third-party platforms.
            </li>
            <li>
              <strong>Legal obligation</strong> — where we must retain or disclose information to comply with law.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
          <p className="mb-3">
            This website uses essential cookies only. The admin session cookie (<code>sharkys_admin_session</code>)
            is set when an authorised user logs in to manage gallery images. It expires after 24 hours or when you log
            out.
          </p>
          <p>
            We do not use advertising cookies or third-party marketing trackers on the public pages of this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-party services</h2>
          <p className="mb-3">Some parts of the site rely on external providers:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Vercel</strong> — hosts the website and may process server logs for security and performance.
            </li>
            <li>
              <strong>Vercel Blob</strong> — stores gallery images and hosted video files served on the site.
            </li>
            <li>
              <strong>Google Maps</strong> — embedded map on our location page; Google may collect data according to
              its own privacy policy when you interact with the map.
            </li>
            <li>
              <strong>External links</strong> — we link to Facebook, TripAdvisor, Google Maps, and WhatsApp. Those
              services have their own privacy policies and are not controlled by us.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How long we keep data</h2>
          <p>
            Server logs are kept for a limited period by our hosting provider. Messages you send us are kept only as
            long as needed to handle your enquiry and for reasonable business record-keeping. Admin session cookies
            expire automatically after 24 hours.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Your rights</h2>
          <p className="mb-3">
            If you are in the European Economic Area or UK, you have rights under GDPR, including to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Request a copy of your data in a portable format.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Lodge a complaint with the Portuguese data protection authority (CNPD).</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${businessInfo.email}`} className="text-blue-700 hover:underline">
              {businessInfo.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to this policy</h2>
          <p>
            We may update this page from time to time. The &quot;Last updated&quot; date at the top will change when
            we do. Continued use of the website after changes means you accept the updated policy.
          </p>
        </section>
      </div>
    </SiteChrome>
  )
}
