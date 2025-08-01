import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Upload, Save, X } from 'lucide-react';

const PostAnimal: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [animalType, setAnimalType] = useState<'cat' | 'dog'>('dog');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    description: '',
    catteryKennelName: '',
    city: '',
    country: '',
    siretNumber: '',
    microchipNumber: '',
    price: '',
    healthCertificate: false,
    vaccinated: false,
  });

  const [files, setFiles] = useState({
    photo: null as File | null,
    acacedCertificate: null as File | null,
    loofCertificate: null as File | null,
    icadCertificate: null as File | null,
    healthCertificate: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving the animal listing
    console.log('Animal listing submitted:', { formData, files, animalType });
    alert(t('postAnimal.successMessage'));
    navigate('/breeder/listings');
  };

  const FileUploadField = ({ 
    label, 
    fileType, 
    required = false, 
    accept = "*" 
  }: { 
    label: string; 
    fileType: keyof typeof files; 
    required?: boolean; 
    accept?: string; 
  }) => (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        {t(label)} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#A8E6CF] transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e, fileType)}
          className="hidden"
          id={fileType}
          required={required}
        />
        <label htmlFor={fileType} className="cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {files[fileType] ? files[fileType]!.name : t('postAnimal.clickUpload')}
          </p>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{t('postAnimal.title')}</h1>
          <p className="text-gray-600">{t('postAnimal.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Animal Type Toggle */}
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-4">{t('postAnimal.animalType')}</h2>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setAnimalType('dog')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  animalType === 'dog'
                    ? 'bg-[#A8E6CF] text-black'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('postAnimal.dog')}
              </button>
              <button
                type="button"
                onClick={() => setAnimalType('cat')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  animalType === 'cat'
                    ? 'bg-[#A8E6CF] text-black'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('postAnimal.cat')}
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-6">{t('postAnimal.basicInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('postAnimal.animalName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterAnimalName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.age')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterAge')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.breed')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterBreed')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {animalType === 'cat' ? t('postAnimal.catteryName') : t('postAnimal.kennelName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="catteryKennelName"
                  value={formData.catteryKennelName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={animalType === 'cat' ? t('postAnimal.enterCatteryName') : t('postAnimal.enterKennelName')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.city')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterCity')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('common.country')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterCountry')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('postAnimal.priceEuro')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterPrice')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('postAnimal.microchipNumber')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="microchipNumber"
                  value={formData.microchipNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterMicrochip')}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-black mb-2">
                {t('common.description')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                placeholder={t('postAnimal.descriptionPlaceholder')}
              />
            </div>
          </div>

          {/* Legal Information */}
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-6">{t('postAnimal.legalInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('postAnimal.siretNumber')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="siretNumber"
                  value={formData.siretNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder={t('postAnimal.enterSiret')}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="healthCertificate"
                      checked={formData.healthCertificate}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#A8E6CF] focus:ring-[#A8E6CF] border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-black">{t('postAnimal.healthCertificate')}</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="vaccinated"
                      checked={formData.vaccinated}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#A8E6CF] focus:ring-[#A8E6CF] border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-black">{t('postAnimal.vaccinated')}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <h2 className="text-xl font-semibold text-black mb-6">{t('postAnimal.requiredDocuments')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField
                label="postAnimal.animalPhoto"
                fileType="photo"
                required
                accept="image/jpeg,image/jpg"
              />
              <FileUploadField
                label="postAnimal.acacedCertificate"
                fileType="acacedCertificate"
                required
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <FileUploadField
                label="postAnimal.loofCertificate"
                fileType="loofCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <FileUploadField
                label="postAnimal.icadCertificate"
                fileType="icadCertificate"
                required
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <FileUploadField
                label="postAnimal.healthCertificateDoc"
                fileType="healthCertificate"
                required
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <X className="w-5 h-5 mr-2" />
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#A8E6CF] text-black rounded-lg hover:bg-[#70C1B3] transition-colors flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {t('postAnimal.createListing')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAnimal;