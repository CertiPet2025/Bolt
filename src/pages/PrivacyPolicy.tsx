import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Eye, Database, Shield, Users, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#A8E6CF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('legal.privacy.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('legal.privacy.subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('legal.lastUpdated')}: 15 janvier 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('legal.privacy.rgpdCompliance')}</h3>
                <p className="text-blue-800 text-sm">
                  {t('legal.privacy.rgpdComplianceText')}
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Database className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.privacy.dataCollection')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.privacy.dataCollectionText')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.personalData')}</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• {t('legal.privacy.personalData1')}</li>
                  <li>• {t('legal.privacy.personalData2')}</li>
                  <li>• {t('legal.privacy.personalData3')}</li>
                  <li>• {t('legal.privacy.personalData4')}</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.technicalData')}</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• {t('legal.privacy.technicalData1')}</li>
                  <li>• {t('legal.privacy.technicalData2')}</li>
                  <li>• {t('legal.privacy.technicalData3')}</li>
                  <li>• {t('legal.privacy.technicalData4')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.privacy.dataUsage')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.privacy.dataUsageText')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('legal.privacy.usage1')}</li>
              <li>{t('legal.privacy.usage2')}</li>
              <li>{t('legal.privacy.usage3')}</li>
              <li>{t('legal.privacy.usage4')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <Users className="w-6 h-6 mr-3 text-[#70C1B3]" />
              {t('legal.privacy.dataSharing')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('legal.privacy.dataSharingText')}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                {t('legal.privacy.dataSharingWarning')}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.privacy.userRights')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.privacy.userRightsText')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.rightAccess')}</h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.privacy.rightAccessText')}
                </p>
              </div>
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.rightRectification')}</h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.privacy.rightRectificationText')}
                </p>
              </div>
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.rightErasure')}</h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.privacy.rightErasureText')}
                </p>
              </div>
              <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">{t('legal.privacy.rightPortability')}</h4>
                <p className="text-gray-700 text-sm">
                  {t('legal.privacy.rightPortabilityText')}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">{t('legal.privacy.cookies')}</h2>
            <p className="text-gray-700 mb-4">
              {t('legal.privacy.cookiesText')}
            </p>
          </section>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-12">
            <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              {t('legal.privacy.contact')}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {t('legal.privacy.contactText')}
            </p>
            <div className="text-sm text-gray-600">
              <p>Email: privacy@certipet.com</p>
              <p>DPO: dpo@certipet.com</p>
              <p>Adresse: 123 Rue des Animaux, 75001 Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;