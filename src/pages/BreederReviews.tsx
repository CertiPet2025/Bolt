import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { Review, ReviewStats, Transaction } from '../types/review';

const BreederReviews: React.FC = () => {
  const { breederId } = useParams<{ breederId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [userTransaction, setUserTransaction] = useState<Transaction | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });

  // Mock data - in real app this would come from API
  useEffect(() => {
    if (!breederId || !user) return;

    // Mock transaction data
    const mockTransaction: Transaction = {
      id: 'txn_123',
      breederId: breederId,
      buyerId: user.id,
      animalId: 'animal_123',
      animalName: 'Luna - Golden Retriever',
      status: 'completed',
      completedAt: '2024-01-15T00:00:00Z',
      hasReview: false
    };

    // Mock reviews data
    const mockReviews: Review[] = [
      {
        id: 'rev_1',
        breederId: breederId,
        buyerId: 'buyer_1',
        buyerName: 'Marie D.',
        rating: 5,
        comment: 'Excellent éleveur, très professionnel. Luna est en parfaite santé et très bien socialisée.',
        transactionId: 'txn_1',
        status: 'approved',
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z'
      },
      {
        id: 'rev_2',
        breederId: breederId,
        buyerId: 'buyer_2',
        buyerName: 'Pierre M.',
        rating: 4,
        comment: 'Très bon contact, animal en bonne santé. Recommandé !',
        transactionId: 'txn_2',
        status: 'approved',
        createdAt: '2024-01-08T00:00:00Z',
        updatedAt: '2024-01-08T00:00:00Z'
      }
    ];

    const mockStats: ReviewStats = {
      averageRating: 4.5,
      totalReviews: 2,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1 }
    };

    // Check if user has completed transaction and can review
    if (user.type === 'buyer' && mockTransaction.status === 'completed') {
      setUserTransaction(mockTransaction);
    }

    // Check if user has already reviewed
    const userReview = mockReviews.find(r => r.buyerId === user.id);
    setHasUserReviewed(!!userReview);

    setReviews(mockReviews);
    setStats(mockStats);
  }, [breederId, user]);

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!userTransaction || !user) return;

    setLoading(true);
    
    try {
      // Simulate API call to submit review
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newReview: Review = {
        id: `rev_${Date.now()}`,
        breederId: breederId!,
        buyerId: user.id,
        buyerName: user.name,
        rating,
        comment,
        transactionId: userTransaction.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Review submitted:', newReview);
      
      // Update state
      setHasUserReviewed(true);
      setUserTransaction(null);
      
      // Show success message
      alert(t('reviews.reviewSubmitted'));
      
      // In real app, this would trigger notifications to breeder and admin
      console.log('Notifications sent:', {
        breeder: 'New review received',
        admin: 'Review pending moderation'
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(t('reviews.submitError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#70C1B3] hover:text-[#A8E6CF] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('common.back')}
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2 flex items-center">
            <Star className="w-8 h-8 text-yellow-400 mr-3" />
            {t('reviews.breederReviews')}
          </h1>
          <p className="text-gray-600">{t('reviews.reviewsSubtitle')}</p>
        </div>

        <div className="space-y-8">
          {/* Review Form - Only show if user can review */}
          {userTransaction && !hasUserReviewed && user?.type === 'buyer' && (
            <ReviewForm
              transaction={userTransaction}
              onSubmitReview={handleSubmitReview}
              loading={loading}
            />
          )}

          {/* Review List - Show based on user review status */}
          <ReviewList
            reviews={reviews}
            stats={stats}
            hasUserReviewed={hasUserReviewed}
          />
        </div>
      </div>
    </div>
  );
};

export default BreederReviews;