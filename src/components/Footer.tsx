import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const PawLogo = () => (
    <div className="w-8 h-8 bg-[#A8E6CF] rounded-full flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
        <path d="M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2M21 9C19.9 9 19 9.9 19 11S19.9 13 21 13 23 12.1 23 11 22.1 9 21 9M3 9C1.9 9 1 9.9 1 11S1.9 13 3 13 5 12.1 5 11 4.1 9 3 9M15.5 6C14.4 6 13.5 6.9 13.5 8S14.4 10 15.5 10 17.5 9.1 17.5 8 16.6 6 15.5 6M8.5 6C7.4 6 6.5 6.9 6.5 8S7.4 10 8.5 10 10.5 9.1 10.5 8 9.6 6 8.5 6M12 22C16 20 21 16 21 11.5C21 8.5 18.5 6 15.5 6S10 8.5 10 11.5C10 16 12 20 12 22Z"/>
      </svg>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <PawLogo />
              <span className="text-xl font-bold">CertiPet</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-4 h-4 text-[#A8E6CF]" />
              <span className="text-sm">{t('footer.madeWithLove')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('common.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cgv" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('legal.cgv.title')}
                </Link>
              </li>
              <li>
                <Link to="/charter" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('legal.charter.title')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-[#A8E6CF] transition-colors">
                  {t('legal.privacy.title')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>contact@certipet.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Paris, France</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 CertiPet. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;