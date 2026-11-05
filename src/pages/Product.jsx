import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Star, Heart, ShoppingCart, X, Eye, Info } from "lucide-react";
const ProductCard = ({ product, onClick, }) => {
    const { name, specs, price, originalPrice, image, rating, reviews, inStock, badge } = product;
    const [isLiked, setIsLiked] = useState(false);
    return (<div className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 overflow-hidden">
      {/* Badge */}
      {/* {badge && (
          <div className="absolute z-10 top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {badge}
          </div>
        )} */}

      
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-3">
            <button onClick={(e) => {
            e.stopPropagation();
            onClick();
        }} className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <Eye className="w-5 h-5 text-gray-700"/>
            </button>
            <button className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <ShoppingCart className="w-5 h-5 text-white"/>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6" onClick={onClick}>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"}`}/>))}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({reviews})
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{specs}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (<span className="text-sm text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>)}
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${inStock
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <Button disabled={!inStock} className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl font-medium shadow-sm hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </div>
    </div>);
};
const ProductPreview = ({ product, onClose, }) => {
    if (!product)
        return null;
    return (<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50 animate-in fade-in duration-300">
      <div className="w-full sm:w-[480px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5"/>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Product Image */}
          <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
            {/* {product.badge && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {product.badge}
          </div>
        )} */}
          </div>

          <div className="p-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"}`}/>))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Product Info */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.specs}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-orange-600">
                {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (<span className="text-lg text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()}
                </span>)}
              <div className={`ml-auto text-sm font-medium px-3 py-1 rounded-full ${product.inStock
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4"/>
                Description
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "This is a premium product with excellent quality and performance."}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (<div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (<li key={index} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>))}
                </ul>
              </div>)}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-2xl border-orange-200 text-orange-600 hover:bg-orange-50">
              <Heart className="w-4 h-4 mr-2"/>
              Save
            </Button>
            <Button disabled={!product.inStock} className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-2xl font-medium shadow-sm hover:shadow-lg transition-all duration-200 disabled:opacity-50">
              <ShoppingCart className="w-4 h-4 mr-2"/>
              {product.inStock ? "Add to Cart" : "Notify Me"}
            </Button>
          </div>
        </div>
      </div>
    </div>);
};
const ProductShowcase = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const filters = ["All", "Mobile", "TV", "Monitors", "Laptops", "Headphones"];
    const products = [
        {
            name: "iPhone 15 Pro Max",
            specs: "256GB, Natural Titanium, A17 Pro Chip",
            price: 1199,
            originalPrice: 1299,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Mobile",
            description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and pro camera system for incredible photos and videos.",
            rating: 4.8,
            reviews: 1240,
            features: ["A17 Pro chip", "Titanium design", "48MP camera system", "5G connectivity", "Face ID"],
            inStock: true,
            badge: "New"
        },
        {
            name: 'Samsung 55" QLED 4K TV',
            specs: "256GB, Natural Titanium, A17 Pro Chip",
            price: 899,
            originalPrice: 1099,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "TV",
            description: "Experience cinema-quality visuals with quantum dot technology and vibrant colors that bring entertainment to life.",
            rating: 4.6,
            reviews: 890,
            features: ["Quantum Dot technology", "4K UHD resolution", "Smart TV platform", "HDR10+ support", "Voice remote"],
            inStock: true,
            badge: "Sale"
        },
        {
            name: "Dell UltraSharp 27\" Monitor",
            specs: "4K USB-C Hub, IPS Panel, 95% DCI-P3",
            price: 649,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Monitors",
            description: "Professional-grade 4K monitor with USB-C hub and exceptional color accuracy for creative professionals.",
            rating: 4.7,
            reviews: 456,
            features: ["4K resolution", "USB-C hub", "95% DCI-P3", "IPS panel", "Height adjustable"],
            inStock: false
        },
        {
            name: "MacBook Air M3",
            specs: "13-inch, 8GB RAM, 256GB SSD, Midnight",
            price: 1099,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Laptops",
            description: "Incredibly thin and light laptop powered by the M3 chip, perfect for productivity and creative work.",
            rating: 4.9,
            reviews: 2103,
            features: ["M3 chip", "All-day battery", "Liquid Retina display", "MagSafe charging", "Touch ID"],
            inStock: true,
            badge: "Popular"
        },
        {
            name: "Sony WH-1000XM5",
            specs: "Wireless, Noise Canceling, 30hr Battery",
            price: 399,
            originalPrice: 449,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Headphones",
            description: "Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.",
            rating: 4.5,
            reviews: 1789,
            features: ["Active noise canceling", "30-hour battery", "Quick charge", "Multipoint connection", "Speak-to-chat"],
            inStock: true
        },
    ];
    const filteredProducts = products.filter((product) => {
        const matchesFilter = activeFilter === "All" || product.category === activeFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.specs.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      {/* Header Section */}
      <div className="bg-white/70 backdrop-blur-lg border-b border-gray-200/30  top-0 z-10">
        <div className=" flex justify-around max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                Product Showcase
              </h1>
              <p className="text-gray-600 text-lg">
                Discover amazing products with premium quality
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-lg w-full">
              {/* <Search className="absolute color-black left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
              <input type="text" placeholder="Search for products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-lg text-lg"/>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (<button key={filter} onClick={() => setActiveFilter(filter)} className={`px-8 py-3 rounded-3xl font-semibold transition-all duration-300 text-lg ${activeFilter === filter
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xl shadow-orange-500/25 scale-105"
                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-lg border border-gray-200/50"}`}>
                {filter}
              </button>))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (<ProductCard key={`${product.name}-${idx}`} product={product} onClick={() => setSelectedProduct(product)}/>))}
          </div>) : (<div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-6"/>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No products found
              </h3>
              <p className="text-gray-600 text-lg">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>)}
      </div>

      {/* Product Preview Drawer */}
      {selectedProduct && (<ProductPreview product={selectedProduct} onClose={() => setSelectedProduct(null)}/>)}
    </div>);
};
export default ProductShowcase;
