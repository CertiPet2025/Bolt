import React, { useState } from 'react';
import { HelpCircle, X, MessageCircle } from 'lucide-react';

const HelpBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const predefinedAnswers = [
    {
      question: "Comment vérifier un éleveur ?",
      answer: "Tous nos éleveurs sont vérifiés avec numéro SIRET, certificat ACACED et documents officiels."
    },
    {
      question: "Comment fonctionne le paiement sécurisé ?",
      answer: "Les fonds sont bloqués en séquestre jusqu'à la remise de l'animal, garantissant la sécurité."
    },
    {
      question: "Que faire si j'ai un problème ?",
      answer: "Contactez notre support via la page Contact ou utilisez la messagerie intégrée."
    },
    {
      question: "Comment modifier mon annonce ?",
      answer: "Rendez-vous dans 'Mes Annonces' depuis votre tableau de bord éleveur."
    },
    {
      question: "Puis-je annuler une réservation ?",
      answer: "Les conditions d'annulation sont définies dans le contrat de vente généré."
    }
  ];

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
                <h3 className="text-lg font-bold text-black">Besoin d'Aide ?</h3>
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
                Voici les réponses aux questions les plus fréquentes :
              </p>
              
              <div className="space-y-3">
                {predefinedAnswers.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-[#A8E6CF] transition-colors">
                    <h4 className="font-medium text-black text-sm mb-2">
                      {item.question}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-[#A8E6CF] bg-opacity-20 rounded-lg">
                <p className="text-sm text-black">
                  <strong>Besoin d'aide personnalisée ?</strong><br />
                  Contactez notre équipe via la page Contact.
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