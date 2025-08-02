import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, AlertCircle } from 'lucide-react';
import StarRating from './StarRating';
import { Transaction } from '../types/review';

interface ReviewFormProps {
  transaction: Transaction;
  onSubmitReview: (rating: number, comment: string) => void;
  loading?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  transaction,
  onSubmitReview,
  loading = false
}) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setShowError(true);
      return;
    }
    
    setShowError(false);
    onSubmitReview(rating, comment.trim());
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-black mb-2">
          {t('reviews.submitReview')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('reviews.reviewPrompt', { animal: transaction.animalName })}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-3">
            {t('reviews.rating')} <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              size="lg"
            />
            <span className="text-sm text-gray-600">
              {rating > 0 ? `${rating}/5` : t('reviews.selectRating')}
            </span>
          </div>
          {showError && rating === 0 && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {t('reviews.ratingRequired')}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            {t('reviews.comment')} ({t('reviews.optional')})
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={500}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
            placeholder={t('reviews.commentPlaceholder')}
          />
          <div className="mt-1 text-xs text-gray-500 text-right">
            {comment.length}/500
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-blue-800 text-sm">
              <p className="font-medium mb-1">{t('reviews.importantNote')}</p>
              <p>{t('reviews.reviewVisibilityNote')}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || rating === 0}
          className="w-full bg-[#A8E6CF] text-black py-3 px-4 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2"></div>
              {t('reviews.submitting')}
            </div>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              {t('reviews.submitReview')}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;