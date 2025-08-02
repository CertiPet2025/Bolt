import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star, Crown } from 'lucide-react';
import { SubscriptionPlan } from '../types/subscription';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  currentPlan?: string;
  onSelectPlan: (planId: string) => void;
  loading?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  currentPlan,
  onSelectPlan,
  loading = false
}) => {
  const { t } = useTranslation();
  const isCurrentPlan = currentPlan === plan.id;
  const isPro = plan.id === 'pro';

  return (
    <div className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
      isPro 
        ? 'border-[#A8E6CF] bg-gradient-to-br from-[#A8E6CF]/10 to-white shadow-lg' 
        : 'border-gray-200 bg-white hover:border-[#A8E6CF]'
    } ${isCurrentPlan ? 'ring-2 ring-[#70C1B3]' : ''}`}>
      
      {isPro && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#A8E6CF] text-black px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Crown className="w-4 h-4 mr-1" />
            {t('subscription.recommended')}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          {isPro ? (
            <Star className="w-8 h-8 text-[#70C1B3] mr-2" />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
          )}
          <h3 className="text-2xl font-bold text-black">{t(`subscription.plans.${plan.id}.name`)}</h3>
        </div>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-[#70C1B3]">
            {plan.price === 0 ? t('subscription.free') : `${plan.price}€`}
          </span>
          {plan.price > 0 && (
            <span className="text-gray-600 ml-1">/{t('subscription.month')}</span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
          <span className="text-gray-700">
            {plan.features.maxListings === 'unlimited' 
              ? t('subscription.features.unlimitedListings')
              : t('subscription.features.maxListings', { count: plan.features.maxListings })
            }
          </span>
        </div>
        
        {plan.features.featuredListings && (
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{t('subscription.features.featuredListings')}</span>
          </div>
        )}
        
        {plan.features.certifiedBadge && (
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{t('subscription.features.certifiedBadge')}</span>
          </div>
        )}
        
        {plan.features.dedicatedPage && (
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{t('subscription.features.dedicatedPage')}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onSelectPlan(plan.id)}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : isPro
              ? 'bg-[#A8E6CF] hover:bg-[#70C1B3] text-black'
              : 'bg-white border-2 border-[#A8E6CF] text-black hover:bg-[#A8E6CF]'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2"></div>
            {t('subscription.processing')}
          </div>
        ) : isCurrentPlan ? (
          t('subscription.currentPlan')
        ) : plan.price === 0 ? (
          t('subscription.selectFree')
        ) : (
          t('subscription.upgradeToPro')
        )}
      </button>
    </div>
  );
};

export default SubscriptionCard;