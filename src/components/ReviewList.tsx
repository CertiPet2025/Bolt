import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User } from 'lucide-react';
import StarRating from './StarRating';
import { Review, ReviewStats } from '../types/review';

interface ReviewListProps {
  reviews: Review[];
  stats: ReviewStats;
  hasUserReviewed: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  stats,
  hasUserReviewed
}) => {
  const { t } = useTranslation();

  if (!hasUserReviewed) {
    return (
      <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm text-center">
        <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#70C1B3]" />
        </div>
        <h3 className="text-lg font-medium text-black mb-2">
          {t('reviews.reviewToSeeOthers')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('reviews.submitFirstToView')}
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm text-center">
        <h3 className="text-lg font-medium text-black mb-2">
          {t('reviews.noReviews')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('reviews.beFirstToReview')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Statistics */}
      <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-black">{t('reviews.reviewSummary')}</h3>
          <div className="text-right">
            <div className="flex items-center">
              <StarRating rating={stats.averageRating} readonly size="lg" />
              <span className="ml-2 text-2xl font-bold text-black">
                {stats.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {t('reviews.basedOnReviews', { count: stats.totalReviews })}
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-8">{star}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${stats.totalReviews > 0 
                      ? (stats.ratingDistribution[star as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100 
                      : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">
                {stats.ratingDistribution[star as keyof typeof stats.ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-black">{t('reviews.allReviews')}</h4>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">{review.buyerName}</p>
                  <StarRating rating={review.rating} readonly size="sm" />
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {review.comment && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;