import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, X, MessageCircle } from 'lucide-react';

const HelpBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#A8E6CF] text-black rounded-full shadow-lg hover:bg-[#70C1B3] transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-[#70C1B3]" />
                <h3 className="text-lg font-bold text-black">{t('helpBot.needHelp')}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <p className="text-gray-600 mb-4 text-sm">
                {t('helpBot.frequentQuestions')}
              </p>
              
              <div className="space-y-3">
                {[
                  { questionKey: 'helpBot.verifyBreeder', answerKey: 'helpBot.verifyBreederAnswer' },
                  { questionKey: 'helpBot.securePayment', answerKey: 'helpBot.securePaymentAnswer' },
                  { questionKey: 'helpBot.problem', answerKey: 'helpBot.problemAnswer' },
                  { questionKey: 'helpBot.modifyListing', answerKey: 'helpBot.modifyListingAnswer' },
                  { questionKey: 'helpBot.cancelReservation', answerKey: 'helpBot.cancelReservationAnswer' }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-[#A8E6CF] transition-colors">
                    <h4 className="font-medium text-black text-sm mb-2">
                      {t(item.questionKey)}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {t(item.answerKey)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-[#A8E6CF] bg-opacity-20 rounded-lg">
                <p className="text-sm text-black">
                  <strong>{t('helpBot.personalizedHelp')}</strong><br />
                  {t('helpBot.personalizedHelpDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpBot;