import { unstable_setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export const metadata = {
  title: 'Terms of Service — King David Service',
  description: 'Terms of Service for King David Service. Read the terms and conditions governing use of our website and services.',
};

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#05080f] overflow-hidden">
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 top-0 left-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        <span className="text-gold-400 text-xs tracking-widest uppercase font-mono mb-4 block">Legal</span>
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-12">Terms of Service</h1>
        <p className="text-white/40 text-sm font-mono mb-12">Last updated: March 2025</p>

        <div className="space-y-10 text-white/65 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-serif text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the King David Service website (kds-three-henna.vercel.app), you agree to be bound
              by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of
              these terms, you may not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">2. Use of the Website</h2>
            <p>
              This website is provided for informational and business development purposes only. You agree to use the
              website only for lawful purposes and in a manner that does not infringe the rights of any third party or
              restrict or inhibit the use and enjoyment of the website by others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">3. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of
              King David Service or its content suppliers and is protected by applicable intellectual property laws.
              Reproduction or redistribution without prior written consent is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">4. Disclaimer of Warranties</h2>
            <p>
              The website and its content are provided &quot;as is&quot; without any warranties, express or implied.
              King David Service does not warrant that the website will be uninterrupted, error-free, or free of
              viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, King David Service shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of or inability
              to use the website or its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">6. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. These links are provided solely for your
              convenience. King David Service has no control over the content of those sites and accepts no
              responsibility for them or for any loss or damage arising from your use of them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of
              Indonesia. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the
              courts of Jakarta, Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">8. Changes to Terms</h2>
            <p>
              King David Service reserves the right to modify these Terms of Service at any time. Changes will be
              effective upon posting to the website. Your continued use of the website following any changes constitutes
              your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-white mb-4">9. Contact</h2>
            <p>
              For questions regarding these Terms of Service, contact us at: legal@kingdavidservice.com or King David
              Service, Sudirman Central Business District, Jakarta 12930, Indonesia.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
