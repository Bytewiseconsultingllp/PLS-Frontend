// app/features/freelancer/success/page.tsx

import React from "react";

export default function FreelancerRegisterSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-2">Registration Successful!</h1>
      <p className="text-lg text-gray-700 mb-4">
        Thank you for registering as a freelancer. Your application has been received.
      </p>
      <a href="/" className="mt-6 px-6 py-2 rounded bg-green-500 text-white hover:bg-green-700 transition">
        Go to Home
      </a>
    </div>
  );
}
