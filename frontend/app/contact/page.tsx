"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
    { icon: MapPin, label: "Location", value: "Available Worldwide", href: null },
    { icon: Phone, label: "Availability", value: "Open to opportunities", href: null },
  ];

  const inputClasses =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border focus:ring-2";

  return (
    <PageTransition themeId="contact">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let&apos;s
              <span style={{ color: "var(--accent)" }}> Connect</span>
            </motion.h1>
            <motion.p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Whether you have a project in mind, want to collaborate, or just
              want to say hello — I&apos;d love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClasses}
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "rgba(128,128,128,0.15)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClasses}
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "rgba(128,128,128,0.15)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={inputClasses}
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "rgba(128,128,128,0.15)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or idea..."
                    className={`${inputClasses} resize-none`}
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "rgba(128,128,128,0.15)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#ffffff",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(37,99,235,0.1)", color: "var(--accent)" }}
                  >
                    <info.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-semibold hover:underline"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t" style={{ borderColor: "rgba(128,128,128,0.15)" }}>
                <p className="text-sm font-medium mb-4" style={{ color: "var(--text-secondary)" }}>
                  Find me online
                </p>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors hover:border-current"
                    style={{ borderColor: "rgba(128,128,128,0.15)", color: "var(--text-secondary)" }}
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors hover:border-current"
                    style={{ borderColor: "rgba(128,128,128,0.15)", color: "var(--text-secondary)" }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${siteConfig.socials.email}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors hover:border-current"
                    style={{ borderColor: "rgba(128,128,128,0.15)", color: "var(--text-secondary)" }}
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
