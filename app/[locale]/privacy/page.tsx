import { unstable_setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export const metadata = {
  title: 'Privacy Policy — King David Service',
  description: 'Privacy Policy for King David Service. Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#05080f] overflow-hidden">
      <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 top-0 right-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        <span className="text-gold-400 text-xs tracking-widest uppercase font-mono mb-4 block">Legal</span>
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-12">Privacy Policy</h1>
        <p className="text-white/40 text-sm font-mono mb-12">Last updated: March 2025</p>

        <div className="space-y-10 text-white/65 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-serif text-white mb-4">1. Introduction</h2>
            <p>
              King David Service (&quot;KDS&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
              protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and
              safeguard your information when you visit our website or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">2. Information We Collect</h2>
            <p>
              We may collect the following categories of information: personal identification information (name, email
              address, phone number, company name); usage data (pages visited, time spent, browser type); and
              communication data submitted through contact or inquiry forms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide requested services, improve our
              website and service offerings, send relevant business communications with your consent, and comply with
              applicable legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We may share your information with trusted third-party service
              providers who assist us in delivering our services, subject to appropriate confidentiality agreements. We
              may also disclose information where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil the purposes outlined in this
              policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">6. Your Rights</h2>
            <p>
              Subject to applicable law, you may have the right to access, correct, delete, or restrict the processing
              of your personal data. To exercise any of these rights, please contact us at
              privacy@kingdavidservice.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">7. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information against
              unauthorised access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">8. Contact</h2>
            <p>
              For privacy-related inquiries, please contact: King David Service — Data Privacy Officer,
              Sudirman Central Business District, Jakarta 12930, Indonesia. Email: privacy@kingdavidservice.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
