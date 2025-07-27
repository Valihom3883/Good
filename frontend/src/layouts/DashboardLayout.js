import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-64 bg-white dark:bg-gray-900">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RoboVestX</h1>
          <ThemeToggle />
        </div>
        <nav className="mt-5">
          <Link href="/dashboard" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Overview</Link>
          <Link href="/dashboard/copy-trading" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Copy Trading</Link>
          <Link href="/dashboard/investments" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Investments</Link>
          <Link href="/dashboard/wallet" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Wallet</Link>
          <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Link>
        </nav>
      </div>
      <div className="flex-1 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
