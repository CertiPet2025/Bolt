import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Eye, AlertTriangle, Calendar, User } from 'lucide-react';
import StarRating from '../components/StarRating';
import { Review } from '../types/review';

const AdminReviewModeration: React.FC = () => {
  const { t } = useTranslation();
  
  const [pendingReviews, setPendingReviews] = useState<Review[]>([
    {
      id: 'rev_pending_1',
      breederId: 'breeder_1',
      buyerId: 'buyer_3',
      buyerName: 'Sophie L.',
      rating: 5,
      comment: 'Excellent éleveur, très professionnel et à l\'écoute. Je recommande vivement !',
      transactionId: 'txn_3',
      status: 'pending',
      createdAt: '2024-01-16T10:30:00Z',
      updatedAt: '2024-01-16T10:30:00Z'
    },
    {
      id: 'rev_pending_2',
      breederId: 'breeder_2',
      buyerId: 'buyer_4',
      buyerName: 'Marc D.',
      rating: 2,
      comment: 'Service décevant, animal pas en bonne santé à la livraison.',
      transactionId: 'txn_4',
      status: 'pending',
      createdAt: '2024-01-16T09:15:00Z',
      updatedAt: '2024-01-16T09:15:00Z'
    }
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [moderationNote, setModerationNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleModerateReview = async (reviewId: string, action: 'approve' | 'reject') => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update review status
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      
      console.log(`Review ${reviewId} ${action}ed with note:`, moderationNote);
      
      // In real app, this would trigger notifications
      console.log('Notifications sent:', {
        buyer: `Review ${action}ed`,
        breeder: action === 'approve' ? 'New review published' : undefined
      });
      
      setSelectedReview(null);
      setModerationNote('');
      
      alert(t(`reviews.moderation.${action}Success`));
      
    } catch (error) {
      console.error('Error moderating review:', error);
      alert(t('reviews.moderation.error'));
    } finally {
      setLoading(false);
    }
  };

  const getOffensiveWords = (text: string): string[] => {
    // Simple offensive word detection - in real app this would be more sophisticated
    const offensiveWords = ['spam', 'fake', 'scam'];
    return offensiveWords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {t('reviews.moderation.title')}
          </h1>
          <p className="text-gray-600">{t('reviews.moderation.subtitle')}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{pendingReviews.length}</div>
            <div className="text-gray-600 text-sm">{t('reviews.moderation.pending')}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-gray-600 text-sm">{t('reviews.moderation.approved')}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-gray-600 text-sm">{t('reviews.moderation.rejected')}</div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">
              {t('reviews.moderation.pendingReviews')}
            </h2>
          </div>
          
          <div className="p-6">
            {pendingReviews.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#70C1B3]" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">
                  {t('reviews.moderation.noPending')}
                </h3>
                <p className="text-gray-600">
                  {t('reviews.moderation.allCaughtUp')}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingReviews.map((review) => {
                  const offensiveWords = getOffensiveWords(review.comment || '');
                  
                  return (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
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
                        <div className="mb-4">
                          <p className="text-gray-700 text-sm leading-relaxed mb-2">
                            {review.comment}
                          </p>
                          
                          {offensiveWords.length > 0 && (
                            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                              <div className="flex items-center text-red-800 text-sm">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                {t('reviews.moderation.flaggedWords')}: {offensiveWords.join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleModerateReview(review.id, 'approve')}
                          disabled={loading}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center disabled:opacity-50"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {t('reviews.moderation.approve')}
                        </button>
                        
                        <button
                          onClick={() => handleModerateReview(review.id, 'reject')}
                          disabled={loading}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center disabled:opacity-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          {t('reviews.moderation.reject')}
                        </button>
                        
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t('reviews.moderation.viewDetails')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Review Detail Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">
                    {t('reviews.moderation.reviewDetails')}
                  </h3>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        {t('reviews.moderation.reviewer')}
                      </label>
                      <p className="text-black">{selectedReview.buyerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        {t('reviews.moderation.rating')}
                      </label>
                      <div className="flex items-center">
                        <StarRating rating={selectedReview.rating} readonly />
                        <span className="ml-2 text-black">{selectedReview.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReview.comment && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        {t('reviews.moderation.comment')}
                      </label>
                      <p className="text-black bg-gray-50 p-3 rounded-lg">
                        {selectedReview.comment}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {t('reviews.moderation.submittedAt')}
                    </label>
                    <p className="text-black">
                      {new Date(selectedReview.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('reviews.moderation.moderationNote')}
                  </label>
                  <textarea
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                    placeholder={t('reviews.moderation.noteOptional')}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleModerateReview(selectedReview.id, 'approve')}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {loading ? t('common.loading') : t('reviews.moderation.approve')}
                  </button>
                  <button
                    onClick={() => handleModerateReview(selectedReview.id, 'reject')}
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {loading ? t('common.loading') : t('reviews.moderation.reject')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewModeration;