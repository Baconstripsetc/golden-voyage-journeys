
import React from 'react';
import { CircleDollarSign, CreditCard, Plane, Crown } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CircleDollarSign,
      title: "All-Inclusive",
      subtitle: "with Trevecom"
    },
    {
      icon: CreditCard,
      title: "Low Deposit",
      subtitle: "when booking"
    },
    {
      icon: Plane,
      title: "Stress Free Travel",
      subtitle: "with transport"
    },
    {
      icon: Crown,
      title: "Loyalty Programme",
      subtitle: "with many perks"
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Psst! There's more:
          </h2>
        </div>
        
        <div className="bg-[#F5F7FA] rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#A7CE39]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {benefit.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
