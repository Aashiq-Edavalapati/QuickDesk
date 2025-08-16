'use client';

import { useState } from 'react';
import Link from 'next/link';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
      {/* Heading */}
      <h1 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-snug">
        Create your free account to streamline your customer support
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-mail address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#03ef62] hover:bg-[#65ff8f] text-black rounded-md py-2 font-semibold transition-colors duration-300"
        >
          Get Started
        </button>
      </form>

      {/* OR register */}
      <div className="mt-4 text-center text-xs text-gray-500">Or register using:</div>

      {/* Only Google Button */}
      <div className="mt-2">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-300">
          <img src="/google.svg" alt="Google" className="h-5 mr-3" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>
      </div>

      {/* Terms */}
      <p className="mt-4 text-[10px] text-gray-500 text-center leading-relaxed">
        By continuing, you accept our <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>, our{' '}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and that your data is stored in the USA.
      </p>

      {/* Sign In link */}
      <div className="mt-6 border-t pt-4 text-center">
        <p className="text-xs text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;