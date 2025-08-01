import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(t('contact.messageSent'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">{t('contact.getInTouch')}</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{t('contact.email')}</h3>
                    <p className="text-gray-600">support@certipet.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{t('contact.phone')}</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{t('contact.address')}</h3>
                    <p className="text-gray-600">{t('contact.addressDetails')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#A8E6CF] bg-opacity-20 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-3">{t('contact.businessHours')}</h3>
              <div className="space-y-2 text-gray-700">
                <p>{t('contact.mondayFriday')}</p>
                <p>{t('contact.saturday')}</p>
                <p>{t('contact.sunday')}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border-2 border-[#A8E6CF] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">{t('contact.sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('contact.yourName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('contact.yourEmail')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('contact.subject')} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('contact.whatAbout')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('contact.howCanHelp')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#A8E6CF] hover:bg-[#70C1B3] text-black py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.sendMessageBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;