import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import productClutch from "@/assets/product-clutch.jpg";
import productBelt from "@/assets/product-belt.jpg";
import productAccessories from "@/assets/product-accessories.jpg";
import productEvening from "@/assets/product-evening-bag.jpg";
import heroBag from "@/assets/hero-bag.jpg";

const categories = ["All", "Bags", "Belts", "Accessories", "Custom Orders"];

const products = [
  { id: 1, name: "Rosé Pearl Clutch", category: "Bags", price: 285, image: productClutch },
  { id: 2, name: "Satin Bow Beaded Bag", category: "Bags", price: 420, image: heroBag },
  { id: 3, name: "Blush Bead Belt", category: "Belts", price: 145, image: productBelt },
  { id: 4, name: "Pearl Strand Necklace", category: "Accessories", price: 195, image: productAccessories },
  { id: 5, name: "Evening Soirée Bag", category: "Bags", price: 380, image: productEvening },
  { id: 6, name: "Rose Gold Bead Bracelet", category: "Accessories", price: 95, image: productAccessories },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const initialCat = urlCategory
    ? categories.find((c) => c.toLowerCase() === urlCategory.toLowerCase()) || "All"
    : "All";
  const [active, setActive] = useState(initialCat);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-center mb-4 font-light tracking-wide">
          Collections
        </h1>
        <p className="font-body text-center text-muted-foreground mb-12">
          Handcrafted with intention. Each piece is unique.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 ${
                active === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-xl mb-1">{product.name}</h3>
              <p className="font-body text-sm text-muted-foreground">${product.price}</p>
            </div>
          ))}
        </div>

        {/* Product detail modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-background max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-up"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-square object-cover" />
              <div className="p-8">
                <h2 className="font-heading text-3xl mb-2">{selectedProduct.name}</h2>
                <p className="font-body text-lg text-primary mb-4">${selectedProduct.price}</p>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Each piece is handcrafted with premium beads and materials. Please allow 2-3 weeks for creation.
                </p>
                <div className="mb-6">
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                    Color
                  </label>
                  <div className="flex gap-3">
                    {["Blush Pink", "Rose Gold", "Ivory"].map((c) => (
                      <button key={c} className="font-body text-xs border border-border px-4 py-2 hover:border-primary transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="w-full font-body text-sm tracking-[0.2em] uppercase bg-accent text-accent-foreground py-4 hover:opacity-90 transition-opacity">
                  Place Order
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full mt-3 font-body text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
