import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Star, Euro, Calendar, Shield } from 'lucide-react';
import SalesContract from '../components/SalesContract';
import PaymentAgreement from '../components/PaymentAgreement';
import PaymentSystem from '../components/PaymentSystem';
import TransactionFinalization from '../components/TransactionFinalization';

const AnimalReservation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [contractGenerated, setContractGenerated] = useState(false);
  const [agreementSent, setAgreementSent] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [transactionFinalized, setTransactionFinalized] = useState(false);
  const [escrowStatus, setEscrowStatus] = useState<'pending' | 'held' | 'released'>('pending');

  // Mock animal data
  const animal = {
    id: parseInt(id || '1'),
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '8 weeks',
    price: 1200,
    location: 'Paris, France',
    breeder: 'Sunshine Kennels',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    description: 'Luna est une adorable Golden Retriever de 8 semaines, très sociable et joueuse. Elle a été élevée avec amour dans notre élevage familial.',
    birthDate: '2024-01-15',
    vaccinated: true,
    healthCertificate: true,
    microchipped: true,
  };

  const breeder = {
    name: 'Marie Dubois',
    email: 'marie@sunshine-kennels.fr',
    siretNumber: '12345678901234',
    address: '123 Rue de la Paix, 75001 Paris, France',
  };

  const buyer = {
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    address: '456 Avenue des Champs, 75008 Paris, France',
  };

  const handleReserve = () => {
    setContractGenerated(true);
    setCurrentStep(2);
  };

  const handleSendForSignature = () => {
    alert('Contrat envoyé pour signature !');
    setCurrentStep(3);
  };

  const handleSendAgreement = () => {
    setAgreementSent(true);
  };

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setEscrowStatus('held');
    setCurrentStep(4);
  };

  const handleTransactionFinalize = (method: 'handover' | 'delivery') => {
    setTransactionFinalized(true);
    setEscrowStatus('released');
    alert(`Transaction finalisée via ${method === 'handover' ? 'remise en main propre' : 'livraison'} !`);
  };

  const steps = [
    { number: 1, title: 'Réservation', completed: currentStep > 1 },
    { number: 2, title: 'Contrat', completed: currentStep > 2 },
    { number: 3, title: 'Paiement', completed: currentStep > 3 },
    { number: 4, title: 'Finalisation', completed: transactionFinalized },
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#70C1B3] hover:text-[#A8E6CF] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à la recherche
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.number 
                      ? 'bg-[#A8E6CF] text-black' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? '✓' : step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.number ? 'text-black' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Animal Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm overflow-hidden sticky top-8">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-black">{animal.name}</h2>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{animal.breed} • {animal.age}</p>
                
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {animal.location}
                </div>
                
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">{animal.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({animal.breeder})</span>
                </div>

                <div className="space-y-2 text-sm mb-6">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">Vacciné</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">Certificat de santé</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">Puce électronique</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Euro className="w-5 h-5 text-[#70C1B3]" />
                    <span className="text-2xl font-bold text-[#70C1B3]">{animal.price.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4">{animal.description}</p>
              </div>
            </div>
          </div>

          {/* Reservation Process */}
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 1 && (
              <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm text-center">
                <h3 className="text-2xl font-bold text-black mb-4">Réserver {animal.name}</h3>
                <p className="text-gray-600 mb-6">
                  Cliquez sur "Réserver" pour commencer le processus de réservation sécurisé.
                  Un contrat de vente sera automatiquement généré.
                </p>
                <button
                  onClick={handleReserve}
                  className="bg-[#A8E6CF] text-black px-8 py-4 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium text-lg"
                >
                  Réserver maintenant
                </button>
              </div>
            )}

            {currentStep === 2 && contractGenerated && (
              <SalesContract
                animal={animal}
                breeder={breeder}
                buyer={buyer}
                onSendForSignature={handleSendForSignature}
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <PaymentAgreement
                  onSendAgreement={handleSendAgreement}
                  agreementSent={agreementSent}
                />
                {agreementSent && (
                  <PaymentSystem
                    amount={animal.price}
                    onPaymentComplete={handlePaymentComplete}
                  />
                )}
              </div>
            )}

            {currentStep === 4 && paymentComplete && (
              <TransactionFinalization
                onFinalize={handleTransactionFinalize}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalReservation;