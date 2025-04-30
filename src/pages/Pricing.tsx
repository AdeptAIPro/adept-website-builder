
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const pricingTiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Free Trial',
      description: 'Access basic features and experience our platform',
      price: 0,
      billingPeriod: 'forever',
      features: [
        'Talent Matchmaking (5 matches)',
        'Basic candidate searching',
        'Basic job posting features',
      ],
      buttonText: 'Start for Free',
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing companies with more advanced needs',
      price: billingPeriod === 'monthly' ? 79 : 69,
      billingPeriod: billingPeriod,
      features: [
        'Unlimited Talent Matchmaking',
        'Compliance management',
        'Access to talent marketplace',
        'Automated payroll processing',
        'Basic AI-powered insights',
        'Priority support',
      ],
      buttonText: 'Get Started',
      isPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with custom requirements',
      price: billingPeriod === 'monthly' ? 299 : 249,
      billingPeriod: billingPeriod,
      features: [
        'All Business features',
        'Advanced AI platform access',
        'Custom integrations',
        'Multi-tenant user management',
        'Dedicated account manager',
        'Custom reporting',
        'SLA guarantees',
        'Enterprise API access',
      ],
      buttonText: 'Contact Sales',
    }
  ];

  const handlePurchase = (tier: PricingTier) => {
    if (tier.id === 'free') {
      navigate('/dashboard/talent');
      return;
    }

    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    // For enterprise tier, redirect to contact page
    if (tier.id === 'enterprise') {
      navigate('/contact');
      return;
    }

    // For paid tiers, redirect to checkout (would be implemented with Stripe)
    alert(`You would be redirected to a payment processing page for the ${tier.name} plan.`);
    // In a real implementation, redirect to a checkout page
  };

  return (
    <div className="container py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a plan that works for your business needs, from startups to enterprise.
        </p>
        
        <div className="mt-6 mb-10 inline-flex items-center p-1 bg-muted rounded-lg">
          <Button 
            variant={billingPeriod === 'monthly' ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod('monthly')}
            className="relative z-10"
          >
            Monthly
          </Button>
          <Button 
            variant={billingPeriod === 'yearly' ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod('yearly')}
            className="relative z-10"
          >
            Yearly
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Save 15%
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.id} 
            className={`flex flex-col ${tier.isPopular ? 'border-primary shadow-lg' : ''}`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg rounded-tr-md">
                  Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground ml-2">
                  {tier.billingPeriod === 'forever' ? '' : `per user/${tier.billingPeriod}`}
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePurchase(tier)} 
                className="w-full" 
                variant={tier.isPopular ? "default" : "outline"}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold mb-2">Need something custom?</h3>
        <p className="mb-4 text-muted-foreground">
          We can create a tailored solution for your specific business needs.
        </p>
        <Button 
          variant="outline"
          onClick={() => navigate('/contact')}
        >
          Contact our Sales Team
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
