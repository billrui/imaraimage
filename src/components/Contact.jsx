import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ContactBg from "../assets/con.jpg";

export default function Contact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  /* EMAILJS SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_rapdvl1",
        "template_u5kurba",
        formRef.current,
        "NwiBom_kjZvpQfXpR"
      );

      alert("✨ Message sent successfully! We'll get back to you soon.");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Please try again.");
    }

    setSending(false);
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Company links
  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${ContactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>

            <div className="h-0.5 w-[60px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mt-3" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* CONTACT FORM */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 md:p-6 shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-green-400 to-blue-500 rounded-full" />
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Send a Message
                </span>
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-green-400/50 transition-colors"
                />

                <input
                  type="email"
                  name="user_email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-green-400/50 transition-colors"
                />

                <textarea
                  name="request_details"
                  rows="3"
                  placeholder="Your Message"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-green-400/50 transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className={`bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                    sending ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 hover:scale-[1.02]"
                  }`}
                >
                  {sending ? "Sending..." : "Send Message →"}
                </button>
              </form>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <span className="text-green-400">✓</span> Secure
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <span className="text-green-400">✓</span> Encrypted
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <span className="text-green-400">✓</span> 24/7
                </span>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-4">
              {/* Company Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-lg shrink-0">
                    🏢
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">Company</h4>
                    <p className="text-white/80 text-xs">Imara Analytical Laboratories</p>
                    <p className="text-white/60 text-xs">P.O Box: 1555-20200 Kericho</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-lg shrink-0">
                    📧
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">Email</h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href="mailto:imaralaboratory@gmail.com"
                        className="text-white/80 hover:text-white text-xs transition-colors"
                      >
                        imaralaboratory@gmail.com
                      </a>
                      <button
                        onClick={() => copyToClipboard("imaralaboratory@gmail.com")}
                        className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md text-[10px] text-white/60 hover:text-white transition-all"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-lg shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">Phone</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <a href="tel:+254703333423" className="text-white/80 hover:text-white text-xs">
                        (+254) 703 333 423
                      </a>
                      <span className="hidden sm:inline text-white/40">|</span>
                      <a href="tel:+254736351633" className="text-white/80 hover:text-white text-xs">
                        (+254) 736 351 633
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAP - Fixed positioning */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
                <div className="h-[120px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d249.35888895894476!2d35.245964673611866!3d-0.35387145227605094!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a59ad2311dffd%3A0xd4b6e684c5d25678!2sIMARA%20ANALYTICAL%20LABORATORY!5e0!3m2!1sen!2ske!4v1770727357718!5m2!1sen!2ske"
                    width="100%"
                    height="120"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Imara Laboratories Map"
                    className="w-full"
                  />
                  
                  {/* Location overlay - Now properly positioned within the map container */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20 inline-block">
                      <p className="text-white text-xs flex items-center gap-1">
                        <span className="text-green-400">📍</span>
                        <span>Imara Analytical Laboratories, Kericho</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-gradient-to-b from-black/60 to-black/90 backdrop-blur-xl border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Company Links */}
            <div className="flex items-center gap-4">
              {companyLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white text-xs transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-white/30 text-xs">
              © 2026 Imara Analytical Laboratories
            </div>
            
            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1.5 bg-white/10 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 rounded-full text-white text-xs transition-all flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Copy notification */}
      {copied && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl border border-green-400/30 flex items-center gap-2 text-xs">
            <span>✓ Email copied to clipboard!</span>
          </div>
        </div>
      )}
    </section>
  );
}