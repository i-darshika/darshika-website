import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use darshikaraj.com, including the website disclaimer.",
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Using this website",
    body: (
      <p>
        These terms apply to your use of darshikaraj.com, run by Darshika Raj, a freelance digital
        marketer based in India. By using the website you agree to them. If you do not agree, please
        do not use the website.
      </p>
    ),
  },
  {
    id: "services",
    title: "About the services shown",
    body: (
      <p>
        This website describes the digital marketing services I offer, such as SEO, social media
        marketing, graphic design and website building. Nothing on the website is a binding offer.
        The scope, timeline, price and terms of any project are agreed separately in writing (for
        example, by email, proposal or contract) before work begins.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Content and intellectual property",
    body: (
      <>
        <p>
          Unless stated otherwise, the content of this website, including text, articles, the
          &ldquo;DARSHiKA&rdquo; logo and the design, belongs to Darshika Raj. You may read, share
          links to and quote short extracts with credit, but you may not copy, republish or use the
          content commercially without my written permission.
        </p>
        <p>
          Client names, brands and trademarks shown in the portfolio belong to their respective
          owners and are shown only as examples of my work.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>When using this website, please do not:</p>
        <ul>
          <li>use it for anything unlawful, misleading or harmful;</li>
          <li>send spam, malicious code or automated mass messages through the contact form;</li>
          <li>try to gain unauthorised access to the website or interfere with how it works.</li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <>
        <p>
          Blog articles and other content on this website are for general information only. They
          are not professional, legal or financial advice, and you should consider your own situation
          before acting on them.
        </p>
        <p>
          Digital marketing results depend on many factors outside my control, such as search engine
          and social platform changes, competition and budget. Past work and testimonials show what
          has been achieved for specific clients; they are not a guarantee of particular rankings,
          traffic, followers or sales.
        </p>
        <p>
          I try to keep the website accurate and up to date, but it is provided &ldquo;as is&rdquo;
          without warranties of any kind, and it may occasionally be unavailable.
        </p>
      </>
    ),
  },
  {
    id: "testimonials",
    title: "Portfolio and testimonials",
    body: (
      <p>
        Portfolio case studies and testimonials describe real client projects and are shared with
        the clients&rsquo; permission. They reflect individual experiences.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    body: (
      <p>
        The website contains links to third-party sites, such as social media profiles and client
        websites. I do not control those sites and am not responsible for their content, products or
        privacy practices.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, I am not liable for any loss or damage arising from your use
        of this website or reliance on its content. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How I handle personal information sent through this website is explained in the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        I may update these terms from time to time. The &ldquo;last updated&rdquo; date at the top of
        this page shows when they last changed, and continuing to use the website means you accept the
        current version.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute relating to this website will be
        subject to the jurisdiction of the courts of India.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to {mail} or through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="October 25, 2026"
      intro="The simple rules for using this website, including what you can expect from its content."
      sections={sections}
    />
  );
}
