"use client";
import React from "react";
import { Mail, Phone, Instagram } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">
          <Typewriter
            words={[
              " Get in Touch ✉️",
              "Exolve Your Writing Needs 🚀",
              "Connect with Us 🤝",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>
        <p className="text-gray-600 mb-12">
          We&apos;d love to hear from you! Whether it&apos;s feedback...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600" />
              <span className="text-gray-700 text-lg font-medium">
                +91 7800105170
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <span className="text-gray-700 text-lg font-medium">
                manishgupta724872@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="text-pink-600" />
              <span className="text-gray-700 text-lg font-medium">
                @manishg7244
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/contact-illustration.png"
              alt="Contact Illustration"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        <p className="mt-16 text-sm text-gray-500">
          We typically respond within 24 hours. Let’s connect and build
          something amazing together!
        </p>
      </div>
    </div>
  );
};

export default Contact;
