import { useState } from "react";
import { Upload, Heart } from "lucide-react";
import productClutch from "@/assets/product-clutch.jpg";
import productEvening from "@/assets/product-evening-bag.jpg";
import aboutCraft from "@/assets/about-craft.jpg";
import heroBag from "@/assets/hero-bag.jpg";

const galleryItems = [
  { id: 1, image: productClutch, name: "Sarah M.", caption: "Date night with my Rosé Clutch ✨", likes: 24 },
  { id: 2, image: heroBag, caption: "Wedding season ready!", name: "Amara K.", likes: 42 },
  { id: 3, image: productEvening, caption: "My go-to evening bag", name: "Jade L.", likes: 18 },
  { id: 4, image: aboutCraft, caption: "Behind the scenes at Perrine", name: "Perrine", likes: 67 },
];

const Community = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-center font-light tracking-wide mb-4 animate-fade-up">
          Community Lookbook
        </h1>
        <p className="font-body text-center text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          See how our community styles their Perrine pieces.
        </p>

        <div className="text-center mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="inline-flex items-center gap-2 font-body text-sm tracking-[0.2em] uppercase border border-border px-8 py-3 hover:border-primary hover:text-primary transition-all"
          >
            <Upload size={16} /> Share Your Look
          </button>
        </div>

        {showUpload && (
          <div className="max-w-lg mx-auto mb-16 p-8 border border-border bg-card animate-fade-up">
            <h3 className="font-heading text-xl mb-4">Share Your Perrine Moment</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Tell us about this moment..."
                rows={3}
                className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-primary py-8 cursor-pointer transition-colors">
                <Upload size={20} className="text-muted-foreground mb-2" />
                <span className="font-body text-sm text-muted-foreground">Upload photo or video</span>
                <input type="file" accept="image/*,video/*" className="hidden" />
              </label>
              <button className="w-full font-body text-sm tracking-[0.2em] uppercase bg-accent text-accent-foreground py-3 hover:opacity-90 transition-opacity">
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className="break-inside-avoid group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading text-sm">{item.name}</span>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <Heart size={14} />
                    <span className="font-body text-xs">{item.likes}</span>
                  </button>
                </div>
                <p className="font-body text-xs text-muted-foreground">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
