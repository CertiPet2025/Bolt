import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

interface LegalConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  className?: string;
}

const LegalConsent: React.FC<LegalConsentProps> = ({
  checked,
  onChange,
  required = true,
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="legalConsent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="h-4 w-4 text-[#A8E6CF] focus:ring-[#A8E6CF] border-gray-300 rounded mt-1"
        />
        <label htmlFor="legalConsent" className="text-sm text-gray-700 leading-relaxed">
          {t('legal.consent.text')}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      
      <div className="ml-7 space-y-2">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            to="/cgv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#70C1B3] hover:text-[#A8E6CF] transition-colors flex items-center"
          >
            {t('legal.cgv.title')}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
          <Link
            to="/charter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#70C1B3] hover:text-[#A8E6CF] transition-colors flex items-center"
          >
            {t('legal.charter.title')}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
          <Link
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#70C1B3] hover:text-[#A8E6CF] transition-colors flex items-center"
          >
            {t('legal.privacy.title')}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </div>
        
        <p className="text-xs text-gray-500">
          {t('legal.consent.timestamp')}
        </p>
      </div>
    </div>
  );
};

export default LegalConsent;