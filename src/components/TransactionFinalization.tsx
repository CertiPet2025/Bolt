import React, { useState } from 'react';
import { Handshake, Truck, CheckCircle } from 'lucide-react';

interface TransactionFinalizationProps {
  onFinalize: (method: 'handover' | 'delivery') => void;
}

const TransactionFinalization: React.FC<TransactionFinalizationProps> = ({ onFinalize }) => {
  const [finalized, setFinalized] = useState(false);
  const [method, setMethod] = useState<'handover' | 'delivery' | null>(null);

  const handleFinalization = (selectedMethod: 'handover' | 'delivery') => {
    setMethod(selectedMethod);
    setFinalized(true);
    onFinalize(selectedMethod);
  };

  if (finalized) {
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-green-500 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-black mb-2">Transaction Finalisée</h3>
        <p className="text-gray-600 mb-4">
          {method === 'handover' 
            ? 'Animal remis en main propre confirmé' 
            : 'Livraison confirmée par le transporteur'
          }
        </p>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-green-800 font-medium">
            💰 Fonds libérés du séquestre vers l'éleveur
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <h3 className="text-xl font-bold text-black mb-4 text-center">
        Finaliser la Transaction
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Confirmez la méthode de remise de l'animal pour libérer les fonds du séquestre
      </p>

      <div className="space-y-4">
        <button
          onClick={() => handleFinalization('handover')}
          className="w-full p-4 border-2 border-[#A8E6CF] rounded-lg hover:bg-[#A8E6CF] hover:bg-opacity-20 transition-colors flex items-center justify-center space-x-3"
        >
          <Handshake className="w-6 h-6 text-[#70C1B3]" />
          <span className="font-medium text-black">Animal remis en main propre</span>
        </button>

        <button
          onClick={() => handleFinalization('delivery')}
          className="w-full p-4 border-2 border-[#A8E6CF] rounded-lg hover:bg-[#A8E6CF] hover:bg-opacity-20 transition-colors flex items-center justify-center space-x-3"
        >
          <Truck className="w-6 h-6 text-[#70C1B3]" />
          <span className="font-medium text-black">Animal livré par transporteur</span>
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Cette action libérera immédiatement les fonds vers l'éleveur
      </p>
    </div>
  );
};

export default TransactionFinalization;