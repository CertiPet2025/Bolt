import React, { useState } from 'react';
import { HeartHandshake as Handshake, Truck, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

interface TransactionFinalizationProps {
  onFinalize: (method: 'handover' | 'delivery') => void;
}

const TransactionFinalization: React.FC<TransactionFinalizationProps> = ({ onFinalize }) => {
  const [finalized, setFinalized] = useState(false);
  const [method, setMethod] = useState<'handover' | 'delivery' | null>(null);
  const [confirmationStep, setConfirmationStep] = useState<'select' | 'confirm' | 'processing' | 'complete'>('select');
  const [selectedMethod, setSelectedMethod] = useState<'handover' | 'delivery' | null>(null);

  const handleFinalization = (selectedMethod: 'handover' | 'delivery') => {
    setSelectedMethod(selectedMethod);
    setConfirmationStep('confirm');
  };

  const confirmFinalization = () => {
    if (!selectedMethod) return;
    
    setConfirmationStep('processing');
    
    // Simulate escrow release process
    setTimeout(() => {
      setMethod(selectedMethod);
      setFinalized(true);
      setConfirmationStep('complete');
      
      // Notify all parties about fund release
      console.log('Escrow funds released - notifications sent to:', {
        buyer: `Animal delivery confirmed via ${selectedMethod}`,
        breeder: 'Funds released from escrow to your account',
        admin: `Transaction completed - Funds released via ${selectedMethod} confirmation`
      });
      
      onFinalize(selectedMethod);
    }, 2000);
  };

  const cancelConfirmation = () => {
    setMethod(selectedMethod);
    setFinalized(true);
    onFinalize(selectedMethod);
  };

  if (confirmationStep === 'confirm') {
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-orange-300 shadow-sm">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold text-black mb-4 text-center">
          Confirmer la Libération des Fonds
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Vous êtes sur le point de libérer les fonds du séquestre vers l'éleveur.
          Cette action est <strong>irréversible</strong>.
        </p>
        
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
          <p className="text-orange-800 font-medium mb-2">
            Méthode sélectionnée : {selectedMethod === 'handover' ? '✋ Remise en main propre' : '🚚 Livraison par transporteur'}
          </p>
          <p className="text-orange-700 text-sm">
            Confirmez uniquement si l'animal a été effectivement remis/livré
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setConfirmationStep('select')}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={confirmFinalization}
            className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Confirmer et Libérer les Fonds
          </button>
        </div>
      </div>
    );
  }

  if (confirmationStep === 'processing') {
    return (
      <div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
        </div>
        <h3 className="text-xl font-bold text-black mb-2">Libération des Fonds en Cours</h3>
        <p className="text-gray-600 mb-4">
          Traitement de la libération des fonds du séquestre...
        </p>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            Notification en cours d'envoi à toutes les parties
          </p>
        </div>
      </div>
    );
  }
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
            ✅ Fonds libérés du séquestre vers l'éleveur
          </p>
          <p className="text-green-700 text-sm mt-1">
            Toutes les parties ont été notifiées
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
      <p className="text-gray-600 text-center mb-4">
        Sélectionnez la méthode de confirmation de remise pour libérer les fonds
      </p>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <div className="flex items-center mb-2">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <p className="text-blue-800 font-medium">Fonds Sécurisés en Séquestre</p>
        </div>
        <p className="text-blue-700 text-sm">
          Les fonds ne seront libérés qu'après confirmation de la remise effective de l'animal
        </p>
      </div>

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

      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
        <p className="text-xs text-yellow-700 text-center">
          ⚠️ Attention : La libération des fonds est irréversible. Confirmez uniquement si l'animal a été effectivement remis.
        </p>
      </div>
    </div>
  );
};

export default TransactionFinalization;