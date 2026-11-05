import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Coins, X } from "lucide-react";
const ProductCard = ({ product, onClick, }) => {
    const { name, specs, coins, image } = product;
    return (<div onClick={onClick} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{specs}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            <Coins className="w-4 h-4"/>
            {coins?.toLocaleString()}
          </div>
          <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
            Redeem
          </Button>
        </div>
      </div>
    </div>);
};
const ProductPreview = ({ product, onClose, }) => {
    if (!product)
        return null;
    return (<div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="w-full sm:w-[400px] h-full bg-white shadow-xl p-6 flex flex-col animate-slideIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5"/>
          </Button>
        </div>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4"/>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.specs}</p>
        <p className="mt-2 font-bold text-orange-600">
          {product.coins.toLocaleString()} coins
        </p>
        <p className="mt-4 text-gray-600">
          {product.description ||
            "This is a premium reward you can redeem with your coins."}
        </p>
        <Button className="mt-auto w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl" onClick={() => alert('Redeem functionality coming soon!')}>
          Redeem Now
        </Button>
      </div>
    </div>);
};
const Rewards = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const filters = ["All", "Mobile", "TV", "Monitors", "Laptops", "Headphones"];
    const products = [
        {
            name: "iPhone 15 Pro Max",
            specs: "256GB, Natural Titanium",
            coins: 150000,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Mobile",
            description: "The latest iPhone 15 Pro Max with A17 Pro chip and titanium build.",
        },
        {
            name: 'Samsung 55" QLED TV',
            specs: "4K UHD, Smart TV",
            coins: 85000,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "TV",
            description: "Experience ultra-vivid colors and lifelike visuals.",
        },
        {
            name: "Dell UltraSharp Monitor",
            specs: '27" 4K USB-C Hub',
            coins: 45000,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Monitors",
            description: "Professional-grade 4K monitor with USB-C hub.",
        },
        {
            name: "MacBook Air M3",
            specs: "13-inch, 8GB RAM, 256GB",
            coins: 120000,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Laptops",
            description: "Lightweight MacBook Air with M3 chip for performance.",
        },
        {
            name: "Sony WH-1000XM5",
            specs: "Wireless Noise Canceling",
            coins: 28000,
            image: "https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto",
            category: "Headphones",
            description: "Industry-leading noise-canceling headphones with great audio.",
        },
    ];
    const filteredProducts = products.filter((product) => {
        const matchesFilter = activeFilter === "All" || product.category === activeFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.specs.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50  top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Rewards Store
              </h1>
              <p className="text-gray-600 mt-1">
                Redeem your coins for amazing products
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm"/>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (<button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${activeFilter === filter
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"}`}>
                {filter}
              </button>))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (<ProductCard key={`${product.name}-${idx}`} product={product} onClick={() => setSelectedProduct(product)}/>))}
          </div>) : (<div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>)}
      </div>

      {/* Product Preview Drawer */}
      {selectedProduct && (<ProductPreview product={selectedProduct} onClose={() => setSelectedProduct(null)}/>)}
    </div>);
};
export default Rewards;
