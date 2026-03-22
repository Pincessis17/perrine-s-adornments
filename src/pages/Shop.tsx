import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const categories = ["All", "Bags", "Belts", "Accessories", "Custom Orders"];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  const initialCat = urlCategory
    ? categories.find((c) => c.toLowerCase() === urlCategory.toLowerCase()) || "All"
    : "All";

  const [active, setActive] = useState(initialCat);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // ✅ Fetch products from Supabase
  useEffect(() => {
  const test = async () => {
    try {
      const res = await fetch("https://tvbccszndxozqijluhfo.supabase.co/rest/v1/products", {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YmNjc3puZHhvenFqamx1aGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzU5MzksImV4cCI6MjA4OTcxMTkzOX0.4NZAvMH3STnYo5QrsweQa9qGF6FyMfrjiCdYPUN2mDoY",
        },
      });

      const data = await res.json();
      console.log("FETCH TEST:", data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  test();
}, []);

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-center mb-4 font-light tracking-wide">
          Collections
        </h1>

        <p className="font-body text-center text-muted-foreground mb-12">
          Handcrafted with intention. Each piece is unique.
        </p>

        {/* Categories */}
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

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading text-xl mb-1">
                {product.name}
              </h3>

              <p className="font-body text-sm text-muted-foreground">
                ${product.price}
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full mb-4"
              />

              <h2 className="text-2xl mb-2">{selectedProduct.name}</h2>
              <p className="mb-4">${selectedProduct.price}</p>

              {/* ✅ Place Order */}
              <button
                onClick={async () => {
                  const { error } = await supabase.from("orders").insert([
                    {
                      product: selectedProduct.name,
                      name: "Test User",
                      email: "test@email.com",
                    },
                  ]);

                  if (error) {
                    console.error(error);
                    alert("Error placing order");
                  } else {
                    alert("Order placed!");
                  }
                }}
                className="w-full bg-black text-white py-3 mb-2"
              >
                Place Order
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full text-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;