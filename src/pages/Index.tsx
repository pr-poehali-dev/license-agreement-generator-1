import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface FormData {
  contract_number: string;
  contract_date: string;
  citizenship: string;
  full_name_genitive: string;
  short_name: string;
  nickname: string;
  passport: string;
  inn_swift: string;
  bank_details: string;
  email: string;
  cover_image: File | null;
}

const COUNTRIES = [
  'Выберите гражданство',
  'Российская Федерация',
  'Азербайджанская Республика',
  'Республика Армения',
  'Республика Беларусь',
  'Республика Казахстан',
  'Кыргызская Республика',
  'Республика Молдова',
  'Республика Таджикистан',
  'Туркменистан',
  'Республика Узбекистан',
  'Другое (укажите)'
];

const Index = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    contract_number: '',
    contract_date: '',
    citizenship: '',
    full_name_genitive: '',
    short_name: '',
    nickname: '',
    passport: '',
    inn_swift: '',
    bank_details: '',
    email: '',
    cover_image: null
  });

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
    setFormData(prev => ({ ...prev, [field]: value }));
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
    const requiredFields: (keyof FormData)[] = [
      'contract_date', 
      'citizenship', 
      'full_name_genitive', 
      'short_name', 
      'nickname', 
      'passport', 
      'email',
      'inn_swift',
      'bank_details'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Заполните все поля",
        description: "Все поля обязательны для заполнения",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        дата_заключения_договора: formatDateToRussian(formData.contract_date),
        graj: formData.citizenship,
        ФИО_ИП_полностью_кого: formData.full_name_genitive,
        ФИО_ИП_кратко: formData.short_name,
        NIK: formData.nickname,
        PAS: formData.passport,
        mail: formData.email,
        ИНН_SWIFT: formData.inn_swift,
        РЕКВИЗИТЫ_БАНК: formData.bank_details
      };

      const response = await fetch('https://functions.poehali.dev/74c4ea92-6ade-4ffd-941c-c83f543fbfe5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

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
    <div className="min-h-screen bg-[#121212]">
      <header className="bg-black border-b border-[#333] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-bold gold-text gold-glow">420</h1>
            <h2 className="text-xl text-[#FFD700]">Генератор лицензионных договоров</h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-[#FFD700] text-lg">Заполните форму для автоматического создания пакета документов</p>
        </div>

        <Card className="p-8 bg-[#1a1a1a] border-[#333]">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[#FFD700] mb-6 pb-2 border-b-2 border-[#FFD700]">Реквизиты договора</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#FFD700]">Номер договора</Label>
                  <div className="text-white text-lg font-medium px-4 py-2 bg-[#0f0f0f] rounded-md border border-[#333]">
                    № {formData.contract_number}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#FFD700]">Дата заключения договора *</Label>
                  <Input
                    type="date"
                    value={formData.contract_date}
                    onChange={(e) => handleInputChange('contract_date', e.target.value)}
                    className="bg-[#0f0f0f] border-[#d32f2f] text-white focus:border-[#FFD700] focus:ring-[#FFD700]"
                  />
                  {formData.contract_date && (
                    <p className="text-xs text-[#FFD700]/60">
                      Будет: {formatDateToRussian(formData.contract_date)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#FFD700] mb-6 pb-2 border-b-2 border-[#FFD700]">Данные артиста (Лицензиар)</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">Гражданство *</Label>
                    <Select value={formData.citizenship} onValueChange={(value) => handleInputChange('citizenship', value)}>
                      <SelectTrigger className="bg-[#0f0f0f] border-[#d32f2f] text-white">
                        <SelectValue placeholder="Выберите гражданство" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#333]">
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country} className="text-white focus:bg-[#333] focus:text-[#FFD700]">
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">ФИО полностью (три слова) *</Label>
                    <Input
                      placeholder="Иванов Иван Иванович"
                      value={formData.full_name_genitive}
                      onChange={(e) => handleInputChange('full_name_genitive', e.target.value)}
                      className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">ФИО для подписи *</Label>
                    <Input
                      placeholder="Костырев В.Н."
                      value={formData.short_name}
                      onChange={(e) => handleInputChange('short_name', e.target.value)}
                      className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">Творческий псевдоним *</Label>
                    <Input
                      placeholder="EDDI$"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">Паспортные данные *</Label>
                    <Input
                      placeholder="GER: L8V2RCZ80"
                      value={formData.passport}
                      onChange={(e) => handleInputChange('passport', e.target.value)}
                      className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#FFD700]">ИНН/SWIFT код *</Label>
                    <Input
                      placeholder="DE8937040044053201300"
                      value={formData.inn_swift}
                      onChange={(e) => handleInputChange('inn_swift', e.target.value)}
                      className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#FFD700]">Банковские реквизиты *</Label>
                  <Textarea
                    placeholder="Bank: Deutsche Bank, Account: 123456789"
                    value={formData.bank_details}
                    onChange={(e) => handleInputChange('bank_details', e.target.value)}
                    className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700] min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#FFD700]">Email *</Label>
                  <Input
                    type="email"
                    placeholder="mr-frank-eduard@web.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#FFD700]">Изображение (будет вставлено вместо )</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#0f0f0f] border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                    >
                      Выберите файл
                    </Button>
                    <span className="text-sm text-gray-400">
                      {formData.cover_image ? formData.cover_image.name : 'Файл не выбран'}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFD700]/60">
                    Изображение будет автоматически уменьшено до 150x150 пикселей
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

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
