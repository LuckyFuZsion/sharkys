import Link from "next/link"
import PageHeader from "@/components/page-header"
import { businessInfo } from "@/lib/business-info"
import { localizeHref } from "@/lib/i18n/navigation"
import type { Dictionary, Locale } from "@/lib/i18n/types"

type PrivacyContentProps = {
  dictionary: Dictionary
  locale: Locale
}

export default function PrivacyContent({ dictionary, locale }: PrivacyContentProps) {
  const { privacy: copy } = dictionary
  const sections = copy.sections

  return (
    <>
      <PageHeader title={copy.pageTitle} description={copy.pageDesc} />

      <div className="container mx-auto px-4 py-12 max-w-3xl text-gray-700">
        <p className="text-sm text-gray-500 mb-8">{copy.lastUpdated}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.whoWeAre.title}</h2>
          <p>{sections.whoWeAre.paragraph}</p>
          <address className="mt-4 not-italic">
            <strong>{businessInfo.name}</strong>
            <br />
            {sections.whoWeAre.addressLabel}: {businessInfo.address.formatted}
            <br />
            {sections.whoWeAre.emailLabel}:{" "}
            <a href={`mailto:${businessInfo.email}`} className="text-blue-700 hover:underline">
              {businessInfo.email}
            </a>
            <br />
            {sections.whoWeAre.phoneLabel}:{" "}
            <a href={`tel:${businessInfo.telephone}`} className="text-blue-700 hover:underline">
              {businessInfo.telephoneDisplay}
            </a>
          </address>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.whatDataWeCollect.title}</h2>
          <p className="mb-3">{sections.whatDataWeCollect.intro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {sections.whatDataWeCollect.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{sections.whatDataWeCollect.outro}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.howWeUseYourData.title}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {sections.howWeUseYourData.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.legalBasis.title}</h2>
          <p className="mb-3">{sections.legalBasis.intro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {sections.legalBasis.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.cookies.title}</h2>
          {sections.cookies.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-3">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.thirdPartyServices.title}</h2>
          <p className="mb-3">{sections.thirdPartyServices.intro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {sections.thirdPartyServices.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.howLongWeKeepData.title}</h2>
          <p>{sections.howLongWeKeepData.paragraph}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.yourRights.title}</h2>
          <p className="mb-3">{sections.yourRights.intro}</p>
          <ul className="list-disc pl-6 space-y-2">
            {sections.yourRights.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{sections.yourRights.outro}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{sections.changesToPolicy.title}</h2>
          <p>{sections.changesToPolicy.paragraph}</p>
        </section>

        <p className="text-sm">
          <Link href={localizeHref("/", locale)} className="text-blue-700 hover:underline">
            {dictionary.common.siteName}
          </Link>
        </p>
      </div>
    </>
  )
}
