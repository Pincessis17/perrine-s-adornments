import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
        setOrderName("");
        setOrderEmail("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
              className={`font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 ${active === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col active:scale-[0.98] transition-all duration-200"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="bg-secondary/20 aspect-[4/5] overflow-hidden mb-5 rounded-sm">
                <img
                  src={`${product.image}?v=${Date.now()}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col space-y-1 px-1">
                <h3 className="font-heading text-lg font-medium tracking-wide text-foreground">
                  {product.name}
                </h3>

                <p className="font-body text-sm text-muted-foreground">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
            onClick={() => {
              setSelectedProduct(null);
              setOrderName("");
              setOrderEmail("");
            }}
          >
            <div
              className="bg-background border shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-secondary/20 relative aspect-square md:aspect-auto overflow-hidden shrink-0">
                <img
                  src={`${selectedProduct.image}?v=${Date.now()}`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto relative">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setOrderName("");
                    setOrderEmail("");
                  }}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <h2 className="font-heading text-3xl font-medium tracking-wide mb-2 mt-4 text-foreground">
                  {selectedProduct.name}
                </h2>
                <p className="font-body text-xl text-muted-foreground mb-8">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(selectedProduct.price || 0)}
                </p>

                <div className="prose prose-sm text-muted-foreground mb-6 flex-1">
                  <p>A beautifully handcrafted piece featuring intricate details and premium materials. Keep as a statement piece or gift to someone special.</p>
                </div>

                <div className="mt-auto space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-heading font-medium tracking-wide uppercase text-muted-foreground mb-1">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border-b border-muted-foreground/30 bg-transparent py-2 text-sm focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-heading font-medium tracking-wide uppercase text-muted-foreground mb-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full border-b border-muted-foreground/30 bg-transparent py-2 text-sm focus:border-foreground focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={isSubmitting || !orderName.trim() || !orderEmail.trim()}
                      onClick={async () => {
                        if (!orderName.trim() || !orderEmail.trim()) {
                          toast.error("Please fill out all fields.");
                          return;
                        }
                        
                        setIsSubmitting(true);
                        const { error } = await supabase.from("orders").insert([
                          {
                            product: selectedProduct.name,
                            name: orderName.trim(),
                            email: orderEmail.trim(),
                          },
                        ]);
                        setIsSubmitting(false);

                        if (error) {
                          console.error(error);
                          toast.error("Failed to place order. Please try again.");
                        } else {
                          toast.success("Order placed successfully! We'll be in touch.");
                          setSelectedProduct(null);
                          setOrderName("");
                          setOrderEmail("");
                        }
                      }}
                      className="w-full bg-foreground text-background font-body uppercase tracking-[0.2em] text-xs py-4 hover:bg-foreground/90 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? "Processing..." : "Place Pre-Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;