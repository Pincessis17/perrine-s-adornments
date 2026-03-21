import { useState } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-center font-light tracking-wide mb-4 animate-fade-up">
          Get in Touch
        </h1>
        <p className="font-body text-center text-muted-foreground mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-heading text-2xl mb-8">Connect With Us</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "hello@perrine.com" },
                { icon: Phone, label: "+1 (555) 123-4567" },
                { icon: Instagram, label: "@perrine.beads" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon size={18} className="text-primary" />
                  <span className="font-body text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div>
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full font-body text-sm tracking-[0.2em] uppercase bg-accent text-accent-foreground py-4 hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
