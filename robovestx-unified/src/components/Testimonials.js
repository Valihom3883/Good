export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <p className="text-gray-600 dark:text-gray-300 mb-4">"RoboVestX has been a game-changer for me. I'm now making passive income without having to watch the markets all day."</p>
            <p className="font-bold text-gray-900 dark:text-white">- John Doe</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <p className="text-gray-600 dark:text-gray-300 mb-4">"As a trader, RoboVestX has allowed me to monetize my skills and build a following. The platform is easy to use and the support is great."</p>
            <p className="font-bold text-gray-900 dark:text-white">- Jane Smith</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md dark:bg-gray-700">
            <p className="text-gray-600 dark:text-gray-300 mb-4">"I'm new to investing, and RoboVestX has made it so easy to get started. I love the investment plans and the transparency of the platform."</p>
            <p className="font-bold text-gray-900 dark:text-white">- Mike Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
}
