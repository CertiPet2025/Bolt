import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Shield, Users, AlertCircle } from 'lucide-react';

const CGV: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('legal.cgv.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('legal.cgv.subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('legal.lastUpdated')}: 15 janvier 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('legal.cgv.important')}</h3>
                <p className="text-blue-800 text-sm">
                  {t('legal.cgv.importantText')}
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Users className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.cgv.article1')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article1Text')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('legal.cgv.article1Point1')}</li>
              <li>{t('legal.cgv.article1Point2')}</li>
              <li>{t('legal.cgv.article1Point3')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.cgv.article2')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article2Text')}
            </p>
            <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
              <h4 className="font-semibold text-black mb-2">{t('legal.cgv.commission')}</h4>
              <p className="text-gray-700 text-sm">
                {t('legal.cgv.commissionText')}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.cgv.article3')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article3Text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.cgv.article4')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article4Text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.cgv.article5')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article5Text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.cgv.article6')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.cgv.article6Text')}
            </p>
          </section>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-12">
            <h3 className="text-lg font-semibold text-black mb-3">{t('legal.contact')}</h3>
            <p className="text-gray-700 text-sm">
              {t('legal.contactText')}
            </p>
            <div className="mt-3 text-sm text-gray-600">
              <p>Email: legal@certipet.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
              <p>Adresse: 123 Rue des Animaux, 75001 Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGV;