import Link from "next/link";
import { FeaturesList } from "./components/feature-list";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          Welcome to Our Store!
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Discover amazing products and enjoy a seamless shopping experience.
        </p>
        <FeaturesList />
        <Link href="/products">
          <button className="w-full rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-200 ease-in-out hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
            Go to Product Listing
          </button>
        </Link>
      </div>
    </div>
  );
}
