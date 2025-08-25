import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">KnowledgeSite</h2>
          <p className="text-gray-400">
            Share knowledge, read articles, and grow your skills with our community.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/articles" className="hover:text-white transition">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-white transition">
                Signup
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">
              <FiFacebook size={24} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiTwitter size={24} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiInstagram size={24} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} KnowledgeSite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
