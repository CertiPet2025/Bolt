import React, { useState } from 'react';
import { Mail, CheckCircle, FileSignature } from 'lucide-react';

interface PaymentAgreementProps {
  onSendAgreement: () => void;
  agreementSent: boolean;
}

const PaymentAgreement: React.FC<PaymentAgreementProps> = ({
  onSendAgreement,
  agreementSent
}) => {
  const [agreementSigned, setAgreementSigned] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <div className="flex items-center mb-4">
        <FileSignature className="w-6 h-6 text-[#70C1B3] mr-3" />
        <h3 className="text-xl font-bold text-black">Accord de Paiement</h3>
      </div>

      {!agreementSent ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Envoyez l'accord de paiement à l'acheteur pour finaliser les conditions de transaction.
          </p>
          <button
            onClick={onSendAgreement}
            className="bg-[#A8E6CF] text-black px-6 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium flex items-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Envoyer l'Accord de Paiement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">
                Accord envoyé à l'acheteur par email
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="agreementSigned"
              checked={agreementSigned}
              onChange={(e) => setAgreementSigned(e.target.checked)}
              className="h-4 w-4 text-[#A8E6CF] focus:ring-[#A8E6CF] border-gray-300 rounded"
            />
            <label htmlFor="agreementSigned" className="text-black font-medium">
              Accord signé par l'acheteur
            </label>
          </div>

          {agreementSigned && (
            <div className="bg-[#A8E6CF] bg-opacity-20 border border-[#A8E6CF] p-4 rounded-lg">
              <p className="text-black font-medium">
                ✅ Accord signé - Prêt pour le paiement
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentAgreement;