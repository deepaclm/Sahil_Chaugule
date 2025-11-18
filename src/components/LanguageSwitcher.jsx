import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language; 

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
    { code: 'mr', label: 'म' },
  ];

  return (
    <div className="flex gap-2 text-sm md:text-base items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-full font-semibold transition-all duration-200
            ${
              currentLang === lang.code
                ? 'bg-orange-400 text-white shadow-md scale-105'
                : 'bg-transparent text-gray-700 hover:bg-blue-100'
            }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
