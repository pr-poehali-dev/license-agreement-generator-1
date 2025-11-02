import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { FormData } from '@/components/contract/types';
import { ContractDetailsSection } from '@/components/contract/ContractDetailsSection';
import { PersonalInfoSection } from '@/components/contract/PersonalInfoSection';
import { SongInfoSection } from '@/components/contract/SongInfoSection';
import MatrixRain from '@/components/MatrixRain';

const Index = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    contract_number: '',
    contract_date: '',
    citizenship: '',
    custom_citizenship: '',
    full_name_genitive: '',
    short_name: '',
    nickname: '',
    passport: '',
    inn_swift: '',
    bank_details: '',
    email: '',
    cover_image: null,
    song_name: '',
    performer: '',
    lyrics_author: '',
    music_author: '',
    phonogram_creator: '',
    payment_percentage: ''
  });
  
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);
  
  const minDateStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchNextNumber = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/44c90102-922d-422d-a7ab-ea007b0a1d1a');
        const data = await response.json();
        if (data.next_number) {
          setFormData(prev => ({ ...prev, contract_number: String(data.next_number) }));
        }
      } catch (error) {
        console.error('Failed to fetch next number:', error);
      }
    };
    fetchNextNumber();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'full_name_genitive') {
        const parts = value.trim().split(/\s+/);
        if (parts.length === 3) {
          const shortName = `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
          updated.short_name = shortName;
        } else {
          updated.short_name = '';
        }
      }
      
      return updated;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cover_image: file }));
    }
  };

  const formatDateToRussian = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`;
  };

  const handleGenerate = async () => {
    if (!formData.contract_date || !formData.full_name_genitive || !formData.short_name || 
        !formData.nickname || !formData.passport || !formData.email || 
        !formData.inn_swift || !formData.bank_details || !formData.song_name || 
        !formData.performer || !formData.lyrics_author || !formData.music_author || 
        !formData.phonogram_creator || !formData.payment_percentage) {
      toast({
        title: "Заполните все поля",
        description: "Все поля обязательны для заполнения",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.citizenship) {
      toast({
        title: "Выберите гражданство",
        description: "Поле гражданство обязательно",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.citizenship === 'Другое' && !formData.custom_citizenship) {
      toast({
        title: "Укажите гражданство",
        description: "Введите свое гражданство в поле",
        variant: "destructive"
      });
      return;
    }
    
    const fullNameParts = formData.full_name_genitive.trim().split(/\s+/);
    if (fullNameParts.length !== 3) {
      toast({
        title: "Неверный формат ФИО",
        description: "ФИО должно состоять ровно из 3 слов (Фамилия Имя Отчество)",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      let coverImageBase64 = '';
      if (formData.cover_image) {
        const arrayBuffer = await formData.cover_image.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        coverImageBase64 = btoa(binary);
      }

      const finalCitizenship = formData.citizenship === 'Другое' 
        ? formData.custom_citizenship 
        : formData.citizenship;
      
      const payload = {
        дата_заключения_договора: formatDateToRussian(formData.contract_date),
        graj: finalCitizenship,
        ФИО_ИП_полностью_кого: formData.full_name_genitive,
        ФИО_ИП_кратко: formData.short_name,
        NIK: formData.nickname,
        PAS: formData.passport,
        mail: formData.email,
        ИНН_SWIFT: formData.inn_swift,
        РЕКВИЗИТЫ_БАНК: formData.bank_details,
        cover_image: coverImageBase64,
        cover_image_name: formData.cover_image?.name || '',
        naz: formData.song_name,
        isp: formData.performer,
        avt: formData.lyrics_author,
        avttext: formData.music_author,
        fongr: formData.phonogram_creator,
        procc: formData.payment_percentage
      };

      const response = await fetch('https://functions.poehali.dev/74c4ea92-6ade-4ffd-941c-c83f543fbfe5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error Response:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Contract generation result:', result);

      if (result.success) {
        toast({
          title: "Договор сгенерирован!",
          description: `Договор №${result.contract_number} отправлен в Telegram`,
        });
        
        const nextResponse = await fetch('https://functions.poehali.dev/44c90102-922d-422d-a7ab-ea007b0a1d1a');
        const nextData = await nextResponse.json();
        if (nextData.next_number) {
          setFormData(prev => ({ ...prev, contract_number: String(nextData.next_number) }));
        }
      } else {
        throw new Error(result.error || 'Ошибка генерации');
      }

    } catch (error) {
      toast({
        title: "Ошибка генерации",
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] relative">
      <MatrixRain />
      <header className="bg-black/90 backdrop-blur-sm border-b border-[#333] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-bold gold-text gold-glow">420</h1>
            <h2 className="text-xl text-[#FFD700]">Генератор лицензионных договоров</h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <p className="text-[#FFD700] text-lg">Заполните форму для автоматического создания пакета документов</p>
        </div>

        <Card className="p-8 bg-[#1a1a1a]/95 backdrop-blur-sm border-[#333]">
          <div className="space-y-8">
            <ContractDetailsSection
              formData={formData}
              minDateStr={minDateStr}
              maxDateStr={maxDateStr}
              onInputChange={handleInputChange}
            />

            <PersonalInfoSection
              formData={formData}
              onInputChange={handleInputChange}
            />

            <SongInfoSection
              formData={formData}
              fileInputRef={fileInputRef}
              onInputChange={handleInputChange}
              onFileSelect={handleFileSelect}
            />

            <div className="pt-6">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-black font-bold text-lg py-6 rounded-lg shadow-lg hover:shadow-[#FFD700]/50 transition-all duration-300"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Icon name="Loader2" className="animate-spin" size={24} />
                    Генерация...
                  </span>
                ) : (
                  'СГЕНЕРИРОВАТЬ ДОГОВОР'
                )}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;