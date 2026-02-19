import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function SocialBar() {
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIcons(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const icons = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaWhatsapp />, href: "https://wa.me/254736351633" },
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
                      bg-white/10 backdrop-blur-md
                      text-white/80
                      border border-white/20
                      transition-all duration-500 ease-out
                      hover:bg-white hover:text-black hover:scale-110
                      ${showIcons ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
