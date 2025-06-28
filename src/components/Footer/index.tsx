import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-[80px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/landing/hero.jpg"
                width={150}
                height={40}
                alt="Logo"
                className="w-[150px] h-[60px] brightness-0 invert"
              />
            </Link>
            <p className="text-gray-200 mb-4 leading-relaxed">
              Tingkatkan IPK dan prestasi akademik Anda dengan platform
              pembelajaran terbaik.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Mail size={16} className="text-gray-300" />
              <span className="text-gray-300">info@example.com</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <div className="text-gray-300 text-sm">
            © 2025 Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
