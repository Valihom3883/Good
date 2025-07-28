export default function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-600">100+</h3>
            <p className="text-gray-600 dark:text-gray-300">Top Traders</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-600">25%</h3>
            <p className="text-gray-600 dark:text-gray-300">Average ROI</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-600">5,000+</h3>
            <p className="text-gray-600 dark:text-gray-300">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-indigo-600">$1M+</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Invested</p>
          </div>
        </div>
      </div>
    </section>
  );
}
