import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  contract_number: string;
  contract_date: string;
  citizenship: string;
  full_name_genitive: string;
  short_name: string;
  nickname: string;
  passport: string;
  email: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    contract_number: '',
    contract_date: '',
    citizenship: '',
    full_name_genitive: '',
    short_name: '',
    nickname: '',
    passport: '',
    email: ''
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
      'email'
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
        mail: formData.email
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Icon name="FileText" size={28} className="text-primary" />
            <h1 className="text-2xl font-semibold text-slate-900">Генератор лицензионных договоров</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Icon name="Edit" size={16} />
              <span className="hidden sm:inline">Форма</span>
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Инструкция</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              <span className="hidden sm:inline">Примеры</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <Icon name="HelpCircle" size={16} />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Icon name="Shield" size={16} />
              <span className="hidden sm:inline">Защита данных</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Лицензионный договор</h2>
                <p className="text-slate-600 text-sm">Заполните все поля для генерации договора</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contract_number" className="text-slate-700">Номер договора</Label>
                    <Input
                      id="contract_number"
                      placeholder="1"
                      value={formData.contract_number}
                      disabled
                      className="transition-all bg-slate-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500">Номер присваивается автоматически</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contract_date" className="text-slate-700">Дата заключения договора</Label>
                    <Input
                      id="contract_date"
                      type="date"
                      value={formData.contract_date}
                      onChange={(e) => handleInputChange('contract_date', e.target.value)}
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    {formData.contract_date && (
                      <p className="text-xs text-slate-500 mt-1">
                        Будет использовано: {formatDateToRussian(formData.contract_date)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Данные лицензиара</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="citizenship" className="text-slate-700">Гражданство</Label>
                      <Input
                        id="citizenship"
                        placeholder="Германии"
                        value={formData.citizenship}
                        onChange={(e) => handleInputChange('citizenship', e.target.value)}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                      <p className="text-xs text-slate-500">В родительном падеже (кого? чего?)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_name_genitive" className="text-slate-700">ФИО полностью (в родительном падеже)</Label>
                      <Input
                        id="full_name_genitive"
                        placeholder="EDUARD FRANK IOSIFOVIC"
                        value={formData.full_name_genitive}
                        onChange={(e) => handleInputChange('full_name_genitive', e.target.value)}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                      <p className="text-xs text-slate-500">Кого? (например: Иванова Ивана Ивановича)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="short_name" className="text-slate-700">ФИО кратко (для подписи)</Label>
                        <Input
                          id="short_name"
                          placeholder="EDUARD F.I."
                          value={formData.short_name}
                          onChange={(e) => handleInputChange('short_name', e.target.value)}
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nickname" className="text-slate-700">Творческий псевдоним</Label>
                        <Input
                          id="nickname"
                          placeholder="EDDI$"
                          value={formData.nickname}
                          onChange={(e) => handleInputChange('nickname', e.target.value)}
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passport" className="text-slate-700">Паспортные данные</Label>
                      <Input
                        id="passport"
                        placeholder="GER: L8V2RCZ80"
                        value={formData.passport}
                        onChange={(e) => handleInputChange('passport', e.target.value)}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Адрес электронной почты</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mr-frank-eduard@web.de"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Генерация документа...
                      </>
                    ) : (
                      <>
                        <Icon name="FileCheck" size={20} className="mr-2" />
                        Сгенерировать договор
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    Готовый документ будет отправлен в Telegram
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Инструкция по использованию</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Заполните форму</h3>
                    <p className="text-slate-600">Внесите все необходимые данные в поля формы. Все поля обязательны для заполнения.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Проверьте данные</h3>
                    <p className="text-slate-600">Убедитесь, что все данные введены корректно, особенно ФИО и паспортные данные.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Сгенерируйте договор</h3>
                    <p className="text-slate-600">Нажмите кнопку "Сгенерировать договор". Готовый документ будет отправлен в Telegram.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Получите документ</h3>
                    <p className="text-slate-600">Проверьте Telegram и скачайте готовый договор в формате DOCX.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Примеры заполнения полей</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">Номер договора</p>
                  <p className="text-slate-600 text-sm mb-1">Примеры: <code className="bg-white px-2 py-1 rounded">25/10/2025</code>, <code className="bg-white px-2 py-1 rounded">001-2025</code></p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">Гражданство</p>
                  <p className="text-slate-600 text-sm mb-1">В родительном падеже: <code className="bg-white px-2 py-1 rounded">Германии</code>, <code className="bg-white px-2 py-1 rounded">России</code>, <code className="bg-white px-2 py-1 rounded">Франции</code></p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">ФИО полностью (в родительном падеже)</p>
                  <p className="text-slate-600 text-sm mb-1">Кого?: <code className="bg-white px-2 py-1 rounded">EDUARD FRANK IOSIFOVIC</code></p>
                  <p className="text-slate-600 text-sm">или: <code className="bg-white px-2 py-1 rounded">Иванова Ивана Ивановича</code></p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">ФИО кратко</p>
                  <p className="text-slate-600 text-sm">Примеры: <code className="bg-white px-2 py-1 rounded">EDUARD F.I.</code>, <code className="bg-white px-2 py-1 rounded">Иванов И.И.</code></p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">Паспортные данные</p>
                  <p className="text-slate-600 text-sm">Примеры: <code className="bg-white px-2 py-1 rounded">GER: L8V2RCZ80</code>, <code className="bg-white px-2 py-1 rounded">РФ: 4509 123456</code></p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Часто задаваемые вопросы</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Какой формат документа я получу?</AccordionTrigger>
                  <AccordionContent>
                    Вы получите готовый договор в формате DOCX, который можно открыть в Microsoft Word, Google Docs или любом другом текстовом редакторе.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Сколько времени занимает генерация?</AccordionTrigger>
                  <AccordionContent>
                    Генерация документа занимает от 5 до 30 секунд. Готовый договор сразу отправляется вам в Telegram.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Можно ли изменить данные после генерации?</AccordionTrigger>
                  <AccordionContent>
                    Да, вы можете редактировать полученный документ в любом текстовом редакторе. Также вы можете сгенерировать новый договор с исправленными данными.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Имеет ли договор юридическую силу?</AccordionTrigger>
                  <AccordionContent>
                    Да, сгенерированный договор является юридически значимым документом при условии правильного заполнения всех данных и подписания сторонами.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Что делать, если не получил документ в Telegram?</AccordionTrigger>
                  <AccordionContent>
                    Проверьте папку "Сохраненные сообщения" или чаты с ботом. Если документ не пришел в течение минуты, попробуйте сгенерировать заново.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="animate-fade-in">
            <Card className="p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <Icon name="Shield" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Защита данных и конфиденциальность</h2>
                  <p className="text-slate-600">Ваша безопасность - наш приоритет</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Данные не сохраняются</h3>
                      <p className="text-green-700 text-sm">Все введенные данные обрабатываются в режиме реального времени и не сохраняются на сервере после генерации документа.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Lock" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Защищенное соединение</h3>
                      <p className="text-green-700 text-sm">Все данные передаются по защищенному HTTPS соединению с шифрованием.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Eye" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Конфиденциальность</h3>
                      <p className="text-green-700 text-sm">Мы не передаем ваши персональные данные третьим лицам и не используем их в коммерческих целях.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="FileCheck" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">Юридическая чистота</h3>
                      <p className="text-green-700 text-sm">Генерация производится точно по шаблону без изменения структуры и формулировок документа.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Документ отправляется напрямую в ваш Telegram и удаляется с сервера сразу после отправки.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-16 py-8 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© 2025 Генератор лицензионных договоров. Все данные обрабатываются конфиденциально.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;