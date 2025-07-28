export default function HowItWorks() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Register & Fund</h3>
            <p className="text-gray-600 dark:text-gray-300">Create an account in minutes and fund your wallet using our secure payment gateways.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Choose & Copy</h3>
            <p className="text-gray-600 dark:text-gray-300">Browse our list of top-performing traders and choose who you want to copy. Or, select from our curated investment plans.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Track & Grow</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor your portfolio's performance in real-time from your dashboard and watch your investments grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
