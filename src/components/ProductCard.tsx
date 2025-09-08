import { Button } from "@/components/ui/button";
import loyaltyCoin from "@/assets/loyalty-coin.png";

interface ProductCardProps {
  name: string;
  specs: string;
  coins: number;
  image: string;
  category: string;
}

const ProductCard = ({ name, specs, coins, image, category }: ProductCardProps) => {
  return (
    <div className="card-float p-4 group hover:scale-[1.02] transition-all duration-300">
      <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2">{name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{specs}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={loyaltyCoin} alt="Loyalty coin" className="w-5 h-5" />
            <span className="font-bold text-gold text-lg">{coins.toLocaleString()}</span>
          </div>
          
          <Button size="sm" className="btn-gradient text-xs px-4 py-2 h-8">
            Get
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;