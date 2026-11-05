const ProductCard = ({ product }) => {
    const { name, specs, coins, image } = product;
    return (<div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-40 object-contain mb-4 rounded-lg"/>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500">{specs}</p>
      <p className="mt-2 font-bold text-blue-600">
        {coins?.toLocaleString()} coins
      </p>
    </div>);
};
