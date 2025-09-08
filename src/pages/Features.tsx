import { FileText, Coins, Gift, TrendingUp, Shield, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Invoice Punch-in",
      description: "Easy sales order entry with comprehensive tracking and management capabilities.",
      color: "text-primary"
    },
    {
      icon: Coins,
      title: "Points Dashboard",
      description: "Real-time loyalty balance tracking with detailed earning history and analytics.",
      color: "text-gold"
    },
    {
      icon: Gift,
      title: "Rewards Store",
      description: "Redeem exciting products from our extensive catalog of premium rewards.",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Order Tracking",
      description: "Monitor draft, created, and approved invoices with status updates.",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security ensuring your data and transactions are protected.",
      color: "text-destructive"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage multiple sales representatives and track team performance metrics.",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
              Your Success
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage invoices, track loyalty points, and redeem amazing rewards.
            Built for distributors, retailers, and sales professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-float p-8 text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-muted to-accent rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="card-float p-12 bg-gradient-to-r from-primary/5 to-primary-glow/5">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Transform Your Sales Process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of sales professionals who are already using our platform 
              to streamline their workflow and maximize their rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gradient px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-transform duration-200">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-2xl border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;