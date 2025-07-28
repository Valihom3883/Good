import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">Page Not Found</p>
        <Link href="/" className="mt-4 inline-block px-4 py-2 text-white bg-indigo-600 rounded-md">
          Go back home
        </Link>
      </div>
    </div>
  );
}
