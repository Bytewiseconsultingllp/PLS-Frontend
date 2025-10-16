"use client";
import { useSearchParams } from "next/navigation";

export default function FreelancerRegisterSuccess() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const country = searchParams.get("country") || "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8">
      <div className="bg-white rounded-xl shadow-lg p-0 w-full max-w-2xl min-h-[600px] flex flex-col items-center">
        <div className="w-full bg-blue-700 py-8 rounded-t-xl shadow">
          <h2 className="text-center text-white text-3xl font-semibold tracking-wide">
            Prime Logic Solutions
          </h2>
        </div>

        <div className="p-12 w-full flex flex-col items-center flex-grow">
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
            Registration Successful!
          </h1>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Thank you for registering as a freelancer. Your application has been received.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 shadow w-full max-w-md mb-10">
            <div className="mb-4"><span className="font-semibold text-blue-800">Name:</span> {name}</div>
            <div className="mb-4"><span className="font-semibold text-blue-800">Email:</span> {email}</div>
            <div><span className="font-semibold text-blue-800">Country:</span> {country}</div>
          </div>
          <a
            href="/"
            className="mt-auto px-8 py-3 rounded bg-blue-700 text-white hover:bg-blue-600 transition text-center block w-full max-w-xs"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
