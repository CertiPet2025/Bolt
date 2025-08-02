import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CreditCard, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SubscriptionCard from '../components/SubscriptionCard';
import SubscriptionStatus from '../components/SubscriptionStatus';
import LegalConsent from '../components/LegalConsent';
import { SUBSCRIPTION_PLANS, Subscription } from '../types/subscription';

const SubscriptionManagement: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  // Mock subscription data - in real app this would come from API
  const mockSubscription: Subscription = {
    id: 'sub_123',
    userId: user?.id || '',
    planId: user?.subscription?.planId || 'free',
    status: user?.subscription?.status || 'active',
    currentPeriodStart: '2024-01-01T00:00:00Z',
    currentPeriodEnd: user?.subscription?.currentPeriodEnd || '2024-02-01T00:00:00Z',
    stripeSubscriptionId: 'sub_stripe_123',
    stripeCustomerId: 'cus_stripe_123',
    cancelAtPeriodEnd: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const handlePlanSelection = (planId: string) => {
    if (planId === mockSubscription.planId) return;
    
    setSelectedPlan(planId);
    if (planId === 'pro') {
      setShowUpgrade(true);
    } else {
      handleDowngrade();
    }
  };

  const handleUpgrade = async () => {
    if (!legalConsent) {
      alert(t('legal.consent.required'));
      return;
    }

    setLoading(true);
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call Stripe API
      console.log('Creating Stripe subscription for Pro plan');
      console.log('Legal consent recorded:', new Date().toISOString());
      
      alert(t('subscription.upgradeSuccess'));
      navigate('/breeder/dashboard');
    } catch (error) {
      console.error('Subscription upgrade failed:', error);
      alert(t('subscription.upgradeError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDowngrade = async () => {
    if (window.confirm(t('subscription.confirmDowngrade'))) {
      setLoading(true);
      
      try {
        // Simulate API call to downgrade
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Downgrading to free plan');
        
        alert(t('subscription.downgradeSuccess'));
        navigate('/breeder/dashboard');
      } catch (error) {
        console.error('Subscription downgrade failed:', error);
        alert(t('subscription.downgradeError'));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm(t('subscription.confirmCancel'))) {
      setLoading(true);
      
      try {
        // Simulate API call to cancel subscription
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Canceling subscription at period end');
        
        alert(t('subscription.cancelSuccess'));
        window.location.reload();
      } catch (error) {
        console.error('Subscription cancellation failed:', error);
        alert(t('subscription.cancelError'));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/breeder/dashboard')}
          className="flex items-center text-[#70C1B3] hover:text-[#A8E6CF] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('subscription.backToDashboard')}
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{t('subscription.title')}</h1>
          <p className="text-gray-600">{t('subscription.subtitle')}</p>
        </div>

        {/* Current Subscription Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">{t('subscription.currentSubscription')}</h2>
          <SubscriptionStatus
            subscription={mockSubscription}
            onManageSubscription={() => setShowUpgrade(true)}
          />
        </div>

        {/* Plan Comparison */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-6">{t('subscription.choosePlan')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                currentPlan={mockSubscription.planId}
                onSelectPlan={handlePlanSelection}
                loading={loading}
              />
            ))}
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgrade && selectedPlan === 'pro' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">{t('subscription.upgradeToPro')}</h3>
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="bg-[#A8E6CF] bg-opacity-20 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <CreditCard className="w-5 h-5 text-[#70C1B3] mr-2" />
                      <span className="font-medium text-black">{t('subscription.monthlyBilling')}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#70C1B3]">9.99€ / {t('subscription.month')}</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>✓ {t('subscription.features.unlimitedListings')}</p>
                    <p>✓ {t('subscription.features.featuredListings')}</p>
                    <p>✓ {t('subscription.features.certifiedBadge')}</p>
                    <p>✓ {t('subscription.features.dedicatedPage')}</p>
                  </div>
                </div>

                <LegalConsent
                  checked={legalConsent}
                  onChange={setLegalConsent}
                  required={true}
                  className="mb-6"
                />

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleUpgrade}
                    disabled={loading || !legalConsent}
                    className="flex-1 px-4 py-3 bg-[#A8E6CF] text-black rounded-lg hover:bg-[#70C1B3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2"></div>
                        {t('subscription.processing')}
                      </div>
                    ) : (
                      t('subscription.confirmUpgrade')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Management Actions */}
        {mockSubscription.planId === 'pro' && (
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-4">{t('subscription.dangerZone')}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">{t('subscription.cancelSubscription')}</p>
                <p className="text-gray-600 text-sm">{t('subscription.cancelDescription')}</p>
              </div>
              <button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {t('subscription.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;