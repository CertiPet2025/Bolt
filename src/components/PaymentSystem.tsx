import React, { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Shield, Clock, CheckCircle } from 'lucide-react';

interface PaymentSystemProps {
  amount: number;
  onPaymentComplete: () => void;
}

const PaymentSystem: React.FC<PaymentSystemProps> = ({ amount, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [escrowStatus, setEscrowStatus] = useState<'pending' | 'held' | 'released'>('pending');
  const [transactionId, setTransactionId] = useState<string>('');

  const adminCommission = Math.round(amount * 0.05);
  const breederAmount = amount - adminCommission;
  const paymentMethods = [
    { id: 'card', name: 'Carte Bancaire', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'applepay', name: 'Apple Pay', icon: Smartphone, description: 'Paiement rapide et sécurisé' },
    { id: 'paypal', name: 'PayPal', icon: DollarSign, description: 'Compte PayPal' },
    { id: 'klarna', name: 'Klarna', icon: CreditCard, description: 'Paiement différé' },
    { id: 'alma', name: 'Alma', icon: CreditCard, description: 'Paiement en plusieurs fois' },
    { id: 'scalapay', name: 'Scalapay', icon: CreditCard, description: 'Achetez maintenant, payez plus tard' },
  ];

  const installmentAmount = Math.round(amount / 4);

  const handlePayment = async () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing and escrow setup
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
      setEscrowStatus('held');
      setTransactionId(`TXN-${Date.now()}`);
      
      // Notify all parties about payment held in escrow
      console.log('Payment held in escrow - notifications sent to:', {
        buyer: 'Payment secured in escrow',
        breeder: `Payment received and held pending delivery - Net amount: ${breederAmount.toLocaleString()} €`,
        admin: `Transaction ${transactionId} - Payment held in escrow - Commission: ${adminCommission.toLocaleString()} €`
      });
      
      onPaymentComplete();
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Paiement Sécurisé en Séquestre</h3>
        <p className="text-gray-600 mb-4">
          Votre paiement est sécurisé et sera libéré uniquement après confirmation de la remise de l'animal
        </p>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <p className="text-blue-800 font-medium mb-2">
            💰 {amount.toLocaleString()} € sécurisés en séquestre
          </p>
          <p className="text-blue-700 text-sm mb-1">
            Commission CertiPet (5%): {adminCommission.toLocaleString()} €
          </p>
          <p className="text-blue-700 text-sm mb-2">
            Montant net à l'éleveur: {breederAmount.toLocaleString()} €
          </p>
          <p className="text-blue-700 text-sm">
            Transaction ID: {transactionId}
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Conditions de libération des fonds :</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>• ✋ Confirmation de remise en main propre par l'acheteur</p>
            <p>• 🚚 OU confirmation de livraison par le transporteur</p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>Les fonds sont protégés jusqu'à la confirmation de réception</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-black mb-2">Paiement en 4 fois</h3>
        <p className="text-gray-600">
          {installmentAmount.toLocaleString()} € × 4 versements = {amount.toLocaleString()} € total
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? 'border-[#A8E6CF] bg-[#A8E6CF] bg-opacity-10'
                : 'border-gray-200 hover:border-[#A8E6CF]'
            }`}
          >
            <div className="flex items-center space-x-4">
              <method.icon className="w-6 h-6 text-[#70C1B3]" />
              <div>
                <h4 className="font-medium text-black">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-blue-800 mb-2">Calendrier de paiement:</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <p>• 1er versement: {installmentAmount.toLocaleString()} € - Aujourd'hui</p>
          <p>• 2ème versement: {installmentAmount.toLocaleString()} € - Dans 30 jours</p>
          <p>• 3ème versement: {installmentAmount.toLocaleString()} € - Dans 60 jours</p>
          <p>• 4ème versement: {installmentAmount.toLocaleString()} € - Dans 90 jours</p>
        </div>
        <div className="mt-3 pt-2 border-t border-blue-300">
          <p className="text-xs text-blue-600">
            Commission CertiPet (5%): {adminCommission.toLocaleString()} € • Net à l'éleveur: {breederAmount.toLocaleString()} €
          </p>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedMethod || paymentProcessing}
        className="w-full bg-[#A8E6CF] text-black py-3 px-4 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paymentProcessing ? 'Traitement en cours...' : `Payer ${installmentAmount.toLocaleString()} € maintenant`}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Paiement sécurisé - Vos données sont protégées
      </p>
    </div>
  );
};

export default PaymentSystem;