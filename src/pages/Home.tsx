import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Heart, Shield, Award } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#A8E6CF] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-black mb-12 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              to="/auth/breeder"
              className="bg-[#A8E6CF] hover:bg-[#70C1B3] text-black px-8 py-4 rounded-lg text-xl font-semibold transition-colors transform hover:scale-105 shadow-lg min-w-[200px]"
            >
              {t('home.imBreeder')}
            </Link>
            <Link
              to="/auth/buyer"
              className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 text-black border-2 border-[#A8E6CF] px-8 py-4 rounded-lg text-xl font-semibold transition-colors transform hover:scale-105 shadow-lg min-w-[200px]"
            >
              {t('home.imBuyer')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t('home.whyChoose')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.whySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border-2 border-[#A8E6CF] hover:bg-[#A8E6CF] hover:bg-opacity-10 transition-colors">
              <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{t('home.verifiedBreeders')}</h3>
              <p className="text-gray-600">{t('home.verifiedBreedersDesc')}</p>
            </div>

            <div className="text-center p-6 rounded-lg border-2 border-[#A8E6CF] hover:bg-[#A8E6CF] hover:bg-opacity-10 transition-colors">
              <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{t('home.healthyAnimals')}</h3>
              <p className="text-gray-600">{t('home.healthyAnimalsDesc')}</p>
            </div>

            <div className="text-center p-6 rounded-lg border-2 border-[#A8E6CF] hover:bg-[#A8E6CF] hover:bg-opacity-10 transition-colors">
              <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{t('home.secureTransactions')}</h3>
              <p className="text-gray-600">{t('home.secureTransactionsDesc')}</p>
            </div>

            <div className="text-center p-6 rounded-lg border-2 border-[#A8E6CF] hover:bg-[#A8E6CF] hover:bg-opacity-10 transition-colors">
              <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{t('home.qualityGuarantee')}</h3>
              <p className="text-gray-600">{t('home.qualityGuaranteeDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#A8E6CF] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {t('home.readyToFind')}
          </h2>
          <p className="text-xl text-black mb-8">
            {t('home.readySubtitle')}
          </p>
          <Link
            to="/auth/buyer"
            className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-lg text-xl font-semibold transition-colors transform hover:scale-105 shadow-lg"
          >
            {t('home.startSearch')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;