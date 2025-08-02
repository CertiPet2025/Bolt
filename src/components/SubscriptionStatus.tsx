import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CreditCard, AlertTriangle, CheckCircle, Crown } from 'lucide-react';
import { Subscription } from '../types/subscription';

interface SubscriptionStatusProps {
  subscription: Subscription;
  onManageSubscription: () => void;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  subscription,
  onManageSubscription
}) => {
  const { t } = useTranslation();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'past_due':
        return 'text-red-600 bg-red-100';
      case 'canceled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'past_due':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const isPro = subscription.planId === 'pro';

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {isPro ? (
            <Crown className="w-6 h-6 text-[#70C1B3] mr-3" />
          ) : (
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-3" />
          )}
          <div>
            <h3 className="text-xl font-bold text-black">
              {t(`subscription.plans.${subscription.planId}.name`)}
            </h3>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
              {getStatusIcon(subscription.status)}
              <span className="ml-1">{t(`subscription.status.${subscription.status}`)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onManageSubscription}
          className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors text-sm font-medium"
        >
          {t('subscription.manage')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">{t('subscription.nextBilling')}</p>
            <p className="font-medium text-black">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {isPro && (
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t('subscription.monthlyPrice')}</p>
              <p className="font-medium text-black">9.99€</p>
            </div>
          </div>
        )}
      </div>

      {subscription.status === 'past_due' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 text-sm font-medium">
              {t('subscription.paymentFailed')}
            </p>
          </div>
          <p className="text-red-700 text-sm mt-1">
            {t('subscription.updatePaymentMethod')}
          </p>
        </div>
      )}

      {subscription.cancelAtPeriodEnd && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 text-sm font-medium">
              {t('subscription.cancelingAtPeriodEnd')}
            </p>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            {t('subscription.accessUntil', { date: new Date(subscription.currentPeriodEnd).toLocaleDateString() })}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;