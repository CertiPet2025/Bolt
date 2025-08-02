import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Users, CheckCircle, AlertTriangle } from 'lucide-react';

const Charter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('legal.charter.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('legal.charter.subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('legal.lastUpdated')}: 15 janvier 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
            <div className="flex items-start space-x-3">
              <Heart className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">{t('legal.charter.mission')}</h3>
                <p className="text-green-800 text-sm">
                  {t('legal.charter.missionText')}
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.charter.animalWelfare')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.charter.animalWelfareText')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {t('legal.charter.healthCertificates')}
                </h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.charter.healthCertificatesText')}
                </p>
              </div>
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {t('legal.charter.vaccinations')}
                </h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.charter.vaccinationsText')}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Users className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.charter.breederResponsibilities')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.charter.breederResponsibilitiesText')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('legal.charter.breederPoint1')}</li>
              <li>{t('legal.charter.breederPoint2')}</li>
              <li>{t('legal.charter.breederPoint3')}</li>
              <li>{t('legal.charter.breederPoint4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.charter.buyerCommitments')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.charter.buyerCommitmentsText')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('legal.charter.buyerPoint1')}</li>
              <li>{t('legal.charter.buyerPoint2')}</li>
              <li>{t('legal.charter.buyerPoint3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.charter.prohibitedPractices')}</h2>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-red-800 mb-4">
                    {t('legal.charter.prohibitedPracticesText')}
                  </p>
                  <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                    <li>{t('legal.charter.prohibited1')}</li>
                    <li>{t('legal.charter.prohibited2')}</li>
                    <li>{t('legal.charter.prohibited3')}</li>
                    <li>{t('legal.charter.prohibited4')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.charter.sanctions')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.charter.sanctionsText')}
            </p>
          </section>

          <div className="bg-[#A8E6CF] bg-opacity-30 border border-[#A8E6CF] p-6 rounded-lg mt-12">
            <h3 className="text-lg font-semibold text-black mb-3">{t('legal.charter.commitment')}</h3>
            <p className="text-gray-700">
              {t('legal.charter.commitmentText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charter;