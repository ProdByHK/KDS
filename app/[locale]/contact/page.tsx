export default function ContactPage() {
  return (
    <div className="min-h-screen bg-deepBlue-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 text-center">Contact Us</h1>
        <p className="text-xl text-gray-300 leading-relaxed text-center mb-16">
          Reach out to King David Service for general inquiries, support, or direct communication with our executive team.
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows={5} className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"></textarea>
            </div>
            <button type="button" className="w-full bg-white hover:bg-gray-200 text-deepBlue-900 font-bold py-4 rounded transition-colors text-lg tracking-wide">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
