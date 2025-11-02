export interface FormData {
  contract_number: string;
  contract_date: string;
  citizenship: string;
  custom_citizenship: string;
  full_name_genitive: string;
  short_name: string;
  nickname: string;
  passport: string;
  inn_swift: string;
  bank_details: string;
  email: string;
  cover_image: File | null;
  song_name: string;
  performer: string;
  lyrics_author: string;
  music_author: string;
  phonogram_creator: string;
  payment_percentage: string;
}

export const COUNTRIES = [
  { label: 'Российская Федерация', genitive: 'Российской Федерации' },
  { label: 'Азербайджанская Республика', genitive: 'Азербайджанской Республики' },
  { label: 'Республика Армения', genitive: 'Республики Армения' },
  { label: 'Республика Беларусь', genitive: 'Республики Беларусь' },
  { label: 'Республика Казахстан', genitive: 'Республики Казахстан' },
  { label: 'Кыргызская Республика', genitive: 'Кыргызской Республики' },
  { label: 'Республика Молдова', genitive: 'Республики Молдова' },
  { label: 'Республика Таджикистан', genitive: 'Республики Таджикистан' },
  { label: 'Туркменистан', genitive: 'Туркменистана' },
  { label: 'Республика Узбекистан', genitive: 'Республики Узбекистан' },
  { label: 'Другое', genitive: '' }
];

export const PAYMENT_PERCENTAGES = [
  { value: '50', label: '50% (Пятьдесят процентов)' },
  { value: '60', label: '60% (Шестьдесят процентов)' },
  { value: '70', label: '70% (Семьдесят процентов)' },
  { value: '80', label: '80% (Восемьдесят процентов)' }
];