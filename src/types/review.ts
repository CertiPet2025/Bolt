export interface Review {
  id: string;
  breederId: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment?: string;
  transactionId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  moderatedBy?: string;
  moderationNote?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface Transaction {
  id: string;
  breederId: string;
  buyerId: string;
  animalId: string;
  animalName: string;
  status: 'completed' | 'pending' | 'cancelled';
  completedAt?: string;
  hasReview: boolean;
}