export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-deepBlue-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">About King David</h1>
        <p className="text-xl text-gray-300 leading-relaxed text-balance">
          King David Service is a premier ecosystem of luxury services, enterprise technology, and global logistics, integrated seamlessly to elevate corporate standards and deliver unparalleled value.
        </p>
      </div>
    </div>
  );
}
