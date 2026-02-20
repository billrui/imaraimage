import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function SocialBar() {
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIcons(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const icons = [
    { 
      icon: <FaFacebookF />, 
      href: "https://facebook.com",
      bgColor: "bg-[#1877F2]",
      hoverBg: "hover:bg-[#1877F2]",
      textColor: "text-white"
    },
    { 
      icon: <FaInstagram />, 
      href: "https://instagram.com",
      bgColor: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
      hoverBg: "hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
      textColor: "text-white"
    },
    { 
      icon: <FaTiktok />, 
      href: "https://tiktok.com",
      bgColor: "bg-black",
      hoverBg: "hover:bg-black",
      textColor: "text-white"
    },
    { 
      icon: <FaWhatsapp />, 
      href: "https://wa.me/254736351633",
      bgColor: "bg-[#25D366]",
      hoverBg: "hover:bg-[#25D366]",
      textColor: "text-white"
    },
  ];

  return (
    <div className="fixed bottom-8 left-6 z-50 flex flex-col gap-4">
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-11 h-11 flex items-center justify-center
                      rounded-full
                      ${item.bgColor}
                      ${item.textColor}
                      shadow-lg
                      border border-white/20
                      transition-all duration-500 ease-out
                      ${item.hoverBg} hover:scale-110 hover:shadow-xl
                      ${showIcons ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}