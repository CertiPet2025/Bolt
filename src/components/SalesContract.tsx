import React from 'react';
import { FileText, Send, Calendar, User, Heart } from 'lucide-react';

interface Animal {
  id: number;
  name: string;
  breed: string;
  age: string;
  price: number;
  birthDate?: string;
}

interface Breeder {
  name: string;
  email: string;
  siretNumber: string;
  address: string;
}

interface Buyer {
  name: string;
  email: string;
  address: string;
}

interface SalesContractProps {
  animal: Animal;
  breeder: Breeder;
  buyer: Buyer;
  onSendForSignature: () => void;
}

const SalesContract: React.FC<SalesContractProps> = ({
  animal,
  breeder,
  buyer,
  onSendForSignature
}) => {
  const currentDate = new Date().toLocaleDateString('fr-FR');
  const plannedSaleDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');

  return (
    <div className="bg-white p-8 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
      <div className="flex items-center mb-6">
        <FileText className="w-8 h-8 text-[#70C1B3] mr-3" />
        <h2 className="text-2xl font-bold text-black">Contrat de Vente - Draft</h2>
      </div>

      <div className="space-y-6 text-sm text-black">
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold">CONTRAT DE VENTE D'ANIMAL DE COMPAGNIE</h3>
          <p className="text-gray-600 mt-2">Document généré automatiquement - {currentDate}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-[#70C1B3] flex items-center">
              <User className="w-4 h-4 mr-2" />
              VENDEUR (Éleveur)
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Nom:</strong> {breeder.name}</p>
              <p><strong>Email:</strong> {breeder.email}</p>
              <p><strong>SIRET:</strong> {breeder.siretNumber}</p>
              <p><strong>Adresse:</strong> {breeder.address}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[#70C1B3] flex items-center">
              <User className="w-4 h-4 mr-2" />
              ACHETEUR
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Nom:</strong> {buyer.name}</p>
              <p><strong>Email:</strong> {buyer.email}</p>
              <p><strong>Adresse:</strong> {buyer.address}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#70C1B3] flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            ANIMAL CONCERNÉ
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Nom:</strong> {animal.name}</p>
            <p><strong>Race:</strong> {animal.breed}</p>
            <p><strong>Âge:</strong> {animal.age}</p>
            <p><strong>Date de naissance:</strong> {animal.birthDate || 'À préciser'}</p>
            <p><strong>Prix de vente:</strong> {animal.price.toLocaleString()} €</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-[#70C1B3] flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            CONDITIONS DE VENTE
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Date de vente prévue:</strong> {plannedSaleDate}</p>
            <p><strong>Mode de paiement:</strong> Paiement en 4 fois via CertiPet</p>
            <p><strong>Garanties:</strong> Certificat de santé, vaccinations à jour, puce électronique</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Ce contrat est un projet généré automatiquement. 
            Le contenu légal complet sera ajouté ultérieurement.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onSendForSignature}
          className="bg-[#A8E6CF] text-black px-8 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium flex items-center mx-auto"
        >
          <Send className="w-5 h-5 mr-2" />
          Envoyer pour Signature
        </button>
      </div>
    </div>
  );
};

export default SalesContract;