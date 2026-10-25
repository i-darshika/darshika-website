import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How darshikaraj.com collects, uses and protects your personal information.",
};

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This website, darshikaraj.com, is run by Darshika Raj, a freelance digital marketer based in
          India (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;). I am responsible for the personal
          information collected through this website.
        </p>
        <p>For any privacy question or request, email {mail}.</p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "Information I collect",
    body: (
      <>
        <p>I only collect the information needed to reply to you and to run the website:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, subject and message when you
            send an enquiry.
          </li>
          <li>
            <strong>Emails and messages:</strong> anything you choose to share when you email me or
            contact me on social media.
          </li>
          <li>
            <strong>Technical data:</strong> my hosting provider automatically processes basic
            technical information such as your IP address, browser type and the pages requested, to
            deliver the website securely and protect it from abuse.
          </li>
        </ul>
        <p>
          This website does not use advertising or analytics cookies and does not track you across
          other websites. Please do not send sensitive information (such as financial details or
          passwords) through the contact form.
        </p>
      </>
    ),
  },
  {
    id: "how-i-use-it",
    title: "How I use your information",
    body: (
      <>
        <ul>
          <li>To reply to your enquiry and discuss a possible project.</li>
          <li>To provide services you have agreed to, and to keep records of our communication.</li>
          <li>To keep the website secure and working properly.</li>
          <li>To meet legal, tax or accounting obligations where they apply.</li>
        </ul>
        <p>
          I do not sell, rent or trade your personal information, and I will not add you to a
          marketing list without your clear permission.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Consent and legal basis",
    body: (
      <>
        <p>
          By submitting the contact form or emailing me, you consent to me using your details to
          respond to you as described in this policy. You can withdraw your consent at any time by
          emailing {mail}; this will not affect anything done before you withdrew it.
        </p>
        <p>
          This policy is intended to meet India&rsquo;s Digital Personal Data Protection Act, 2023
          and the Information Technology Act, 2000 and its rules. If you are in the European Union or
          United Kingdom, I process your enquiry on the basis of your consent and my legitimate
          interest in replying to you.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Services that help run this website",
    body: (
      <>
        <p>A small number of trusted providers process data on my behalf:</p>
        <ul>
          <li>
            <strong>FormSubmit</strong> (formsubmit.co) delivers contact form messages to my email
            inbox.
          </li>
          <li>
            <strong>Google (Gmail)</strong> stores the emails and enquiries I receive.
          </li>
          <li>
            <strong>Cloudflare</strong> hosts the website and protects it against attacks.
          </li>
        </ul>
        <p>
          These providers may store or process data on servers outside India. Each has its own
          privacy policy, and I only use them for the purposes described here.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long I keep it",
    body: (
      <p>
        I keep enquiries for as long as needed to reply and, if we work together, for the length of
        our working relationship. Messages that do not lead to a project are deleted within 2 years of
        our last contact. Records may be kept longer only where the law requires it (for example,
        invoices for tax purposes).
      </p>
    ),
  },
  {
    id: "security",
    title: "Keeping your information safe",
    body: (
      <p>
        The website is served over a secure (HTTPS) connection, and I use reputable providers with
        strong security practices. No method of sending or storing data online is completely secure,
        but I take reasonable steps to protect your information from loss or misuse.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You can ask me at any time to:</p>
        <ul>
          <li>tell you what personal information I hold about you;</li>
          <li>correct or update it;</li>
          <li>delete it;</li>
          <li>withdraw your consent to me using it.</li>
        </ul>
        <p>
          Email {mail} with your request. I will reply within 30 days. If you are not satisfied with
          my response, you may complain to the relevant data protection authority, such as the Data
          Protection Board of India.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website is meant for businesses and adults. I do not knowingly collect personal
        information from anyone under 18. If you believe a child has sent me their details, please
        contact me and I will delete them.
      </p>
    ),
  },
  {
    id: "other-websites",
    title: "Links to other websites",
    body: (
      <p>
        This website links to other sites, such as social media profiles and client websites. I am
        not responsible for how those sites handle your information, so please check their own
        privacy policies.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        I may update this policy from time to time, for example if I add new tools to the website.
        The &ldquo;last updated&rdquo; date at the top of this page shows when it last changed.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions, requests or complaints about privacy can be sent to {mail} or through the{" "}
        <Link href="/contact">contact page</Link>. I will respond as soon as possible.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 25, 2026"
      intro="Your privacy matters. This page explains what information this website collects, why, and how you stay in control of it."
      sections={sections}
    />
  );
}
