export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">RoboVestX</h3>
            <p className="text-gray-600 dark:text-gray-300">Automate your trades, amplify your gains.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Links</h3>
            <ul className="text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <form>
              <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-md mb-2" />
              <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="text-center text-gray-600 dark:text-gray-300 mt-8">
          &copy; {new Date().getFullYear()} RoboVestX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
