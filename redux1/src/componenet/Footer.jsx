import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className=" text-blacl text-bold rounded-sm shadow-2xl py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Brand */}
        <div className="text-2xl font-bold">
          zee<span className="text-pink-400">Store</span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-lg">
          <a href="https://instagram.com" className="text-black hover:text-pink-400 transition duration-200">
            <FaInstagram size={28} />
          </a>
          <a href="https://linkedin.com" className="text-black hover:text-pink-400 transition duration-200">
            <CiLinkedin size={28} />
          </a>
          <a href="https://facebook.com" className="text-black hover:text-pink-400 transition duration-200">
            <AiOutlineFacebook size={28} />
          </a>
          <a href="https://youtube.com" className="text-black hover:text-pink-400 transition duration-200">
            <CiYoutube size={28} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-black text-xs text-center md:text-right mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} zeeStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
