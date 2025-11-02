import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-black border-b border-[#333] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold gold-text gold-glow">📚 Техническая документация проекта 420</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#1a1a1a]">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="components">Компоненты</TabsTrigger>
            <TabsTrigger value="logic">Логика</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="code">Весь код</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="p-8 bg-[#1a1a1a] border-[#333]">
              <h2 className="text-3xl font-bold text-[#FFD700] mb-6">🎯 Обзор проекта</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-semibold text-[#FFD700] mb-3">Назначение системы</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Веб-приложение для автоматической генерации пакета юридических документов для регистрации 
                    компании на основе шаблонов DOCX. Система заменяет плейсхолдеры в шаблонах на реальные данные, 
                    введенные пользователем.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-[#FFD700] mb-3">Технологический стек</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 p-4 rounded-lg border border-[#333]">
                      <h4 className="font-bold text-[#FFD700] mb-2">Frontend</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• React 18.3.1</li>
                        <li>• TypeScript 5.6.2</li>
                        <li>• Vite 5.4.10</li>
                        <li>• Tailwind CSS 3.4.15</li>
                        <li>• React Router 6.28.0</li>
                        <li>• Shadcn/ui компоненты</li>
                        <li>• Lucide React иконки</li>
                      </ul>
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg border border-[#333]">
                      <h4 className="font-bold text-[#FFD700] mb-2">Backend & Libraries</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Cloud Functions (Python 3.11)</li>
                        <li>• docxtpl 0.19.0 - шаблоны DOCX</li>
                        <li>• python-docx 1.1.2 - работа с DOCX</li>
                        <li>• Jinja2 3.1.4 - шаблонизатор</li>
                        <li>• date-fns 4.1.0 - работа с датами</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-[#FFD700] mb-3">Структура проекта</h3>
                  <pre className="bg-black p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`/
├── src/
│   ├── components/
│   │   ├── form-sections/
│   │   │   ├── ContractDetailsSection.tsx    # Секция данных договора
│   │   │   ├── CompanyDetailsSection.tsx     # Секция данных компании
│   │   │   ├── ParticipantsSection.tsx       # Секция учредителей
│   │   │   └── CoverUploadSection.tsx        # Секция загрузки обложки
│   │   ├── ui/                               # UI компоненты Shadcn
│   │   ├── MatrixRain.tsx                    # Эффект падающих цифр 420
│   │   └── DatePicker.tsx                    # Кастомный календарь
│   ├── pages/
│   │   ├── Index.tsx                         # Главная страница с формой
│   │   └── Documentation.tsx                 # Эта страница
│   ├── lib/
│   │   └── utils.ts                          # Утилиты (cn helper)
│   ├── App.tsx                               # Корневой компонент
│   └── main.tsx                              # Точка входа
├── backend/
│   └── generate-docs/
│       ├── index.py                          # Генератор документов
│       ├── requirements.txt                  # Python зависимости
│       └── tests.json                        # Тесты API
└── public/
    └── template.docx                         # Шаблон документа`}
                  </pre>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold text-[#FFD700] mb-3">Архитектура системы</h3>
                  <div className="bg-black/50 p-6 rounded-lg border border-[#333]">
                    <pre className="text-gray-300 text-sm">
{`┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Index.tsx  │  │ MatrixRain   │  │ DatePicker   │      │
│  │   (Форма)    │  │  (Эффект)    │  │ (Календарь)  │      │
│  └──────┬───────┘  └──────────────┘  └──────────────┘      │
│         │                                                     │
│         │  Пользователь заполняет форму                      │
│         │  и нажимает "Сгенерировать документы"             │
│         ▼                                                     │
│  ┌─────────────────────────────────────────────────┐        │
│  │  4 Секции формы (form-sections/)                │        │
│  │  • ContractDetailsSection - договор             │        │
│  │  • CompanyDetailsSection - компания             │        │
│  │  • ParticipantsSection - учредители             │        │
│  │  • CoverUploadSection - обложка                 │        │
│  └─────────────────┬───────────────────────────────┘        │
└────────────────────┼────────────────────────────────────────┘
                     │
                     │  HTTP POST /generate-docs
                     │  {formData, coverImage}
                     ▼
┌─────────────────────────────────────────────────────────────┐
│               BACKEND (Cloud Function)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  generate-docs/index.py (Python)                     │  │
│  │                                                        │  │
│  │  1. Получает JSON с данными формы                    │  │
│  │  2. Декодирует Base64 обложку                        │  │
│  │  3. Загружает template.docx                          │  │
│  │  4. Создает Jinja2 контекст                          │  │
│  │  5. Рендерит шаблон с данными                        │  │
│  │  6. Вставляет обложку (если есть)                    │  │
│  │  7. Исправляет форматирование (убирает bold)         │  │
│  │  8. Возвращает Base64 DOCX файл                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                     │
                     │  Response: {success, filename, data}
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Декодирует Base64 → Blob → Скачивает файл          │  │
│  │  Показывает уведомление об успехе                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`}
                    </pre>
                  </div>
                </section>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <ScrollArea className="h-[800px]">
              <Card className="p-8 bg-[#1a1a1a] border-[#333]">
                <h2 className="text-3xl font-bold text-[#FFD700] mb-6">🧩 Компоненты системы</h2>
                
                <div className="space-y-8">
                  <ComponentDoc
                    title="1. Index.tsx - Главная страница"
                    path="src/pages/Index.tsx"
                    description="Корневой компонент приложения, управляет состоянием формы и процессом генерации"
                    details={[
                      {
                        subtitle: "State управление:",
                        content: `• contractDate - дата договора (Date | undefined)
• contractNumber - номер договора (string)
• companyName - название компании (string)
• companyAddress - адрес компании (string)
• companyINN - ИНН компании (string)
• companyOGRN - ОГРН компании (string)
• participants - массив учредителей (Participant[])
• coverImage - обложка документа (File | null)
• coverPreview - превью обложки (string | null)
• isGenerating - флаг процесса генерации (boolean)`
                      },
                      {
                        subtitle: "Интерфейс Participant:",
                        content: `interface Participant {
  id: string;              // Уникальный ID
  fullName: string;        // ФИО учредителя
  birthDate: Date | undefined;  // Дата рождения
  birthPlace: string;      // Место рождения
  citizenship: string;     // Гражданство
  passportSeries: string;  // Серия паспорта
  passportNumber: string;  // Номер паспорта
  passportIssueDate: Date | undefined;  // Дата выдачи
  passportIssuedBy: string;  // Кем выдан
  passportCode: string;    // Код подразделения
  registrationAddress: string;  // Адрес регистрации
  shareAmount: string;     // Размер доли
}`
                      },
                      {
                        subtitle: "Функция handleGenerateDocuments():",
                        content: `Процесс генерации:
1. Валидация всех полей формы
2. Проверка наличия всех учредителей
3. Конвертация обложки в Base64
4. Форматирование дат (dd.MM.yyyy)
5. HTTP POST запрос на /generate-docs
6. Декодирование Base64 ответа
7. Создание Blob и скачивание файла
8. Показ toast уведомления

Обработка ошибок:
• Некорректные данные → alert с описанием
• Ошибка сервера → alert с текстом ошибки
• Сетевая ошибка → alert "Произошла ошибка"`
                      },
                      {
                        subtitle: "JSX структура:",
                        content: `<div> - контейнер с MatrixRain фоном
  <header> - липкий хедер с лого "420"
  <main> - основной контент
    <Card> - карточка формы
      <ContractDetailsSection />
      <CompanyDetailsSection />
      <ParticipantsSection />
      <CoverUploadSection />
      <Button onClick={handleGenerateDocuments} />`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="2. ContractDetailsSection.tsx"
                    path="src/components/form-sections/ContractDetailsSection.tsx"
                    description="Секция для ввода данных договора (номер и дата)"
                    details={[
                      {
                        subtitle: "Props интерфейс:",
                        content: `interface ContractDetailsSectionProps {
  contractNumber: string;
  setContractNumber: (value: string) => void;
  contractDate: Date | undefined;
  setContractDate: (date: Date | undefined) => void;
}`
                      },
                      {
                        subtitle: "Компоненты:",
                        content: `• Label - метка поля
• Input - текстовое поле для номера
• DatePicker - кастомный календарь для даты

Валидация:
• contractNumber - обязательное поле
• contractDate - обязательное поле, формат Date`
                      },
                      {
                        subtitle: "Визуальный стиль:",
                        content: `• Заголовок "📋 Данные договора"
• Градиентная полоса-разделитель
• Золотой цвет (#FFD700) для акцентов
• Тёмная тема (bg-[#2a2a2a])
• Grid layout для полей (md:grid-cols-2)`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="3. CompanyDetailsSection.tsx"
                    path="src/components/form-sections/CompanyDetailsSection.tsx"
                    description="Секция для ввода реквизитов компании"
                    details={[
                      {
                        subtitle: "Props интерфейс:",
                        content: `interface CompanyDetailsSectionProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  companyAddress: string;
  setCompanyAddress: (value: string) => void;
  companyINN: string;
  setCompanyINN: (value: string) => void;
  companyOGRN: string;
  setCompanyOGRN: (value: string) => void;
}`
                      },
                      {
                        subtitle: "Поля формы:",
                        content: `1. Название компании (companyName)
   • Полное наименование юридического лица
   • Обязательное поле

2. Юридический адрес (companyAddress)
   • Адрес регистрации компании
   • Обязательное поле

3. ИНН (companyINN)
   • Идентификационный номер налогоплательщика
   • 10 или 12 цифр
   • Обязательное поле

4. ОГРН (companyOGRN)
   • Основной государственный регистрационный номер
   • 13 цифр
   • Обязательное поле`
                      },
                      {
                        subtitle: "Layout:",
                        content: `• 2 колонки на десктопе (md:grid-cols-2)
• Адрес занимает полную ширину (md:col-span-2)
• Золотой заголовок с иконкой 🏢
• Градиентный разделитель`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="4. ParticipantsSection.tsx"
                    path="src/components/form-sections/ParticipantsSection.tsx"
                    description="Секция управления списком учредителей с полной информацией"
                    details={[
                      {
                        subtitle: "Props интерфейс:",
                        content: `interface ParticipantsSectionProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

type Participant = {
  id: string;
  fullName: string;
  birthDate: Date | undefined;
  birthPlace: string;
  citizenship: string;
  passportSeries: string;
  passportNumber: string;
  passportIssueDate: Date | undefined;
  passportIssuedBy: string;
  passportCode: string;
  registrationAddress: string;
  shareAmount: string;
}`
                      },
                      {
                        subtitle: "Функция addParticipant():",
                        content: `Создает нового учредителя со значениями по умолчанию:
{
  id: crypto.randomUUID(),  // Уникальный ID
  fullName: "",
  birthDate: undefined,
  birthPlace: "",
  citizenship: "Российской Федерации",  // По умолчанию РФ
  passportSeries: "",
  passportNumber: "",
  passportIssueDate: undefined,
  passportIssuedBy: "",
  passportCode: "",
  registrationAddress: "",
  shareAmount: ""
}`
                      },
                      {
                        subtitle: "Функция removeParticipant(id):",
                        content: `Удаляет учредителя по ID:
setParticipants(prev => prev.filter(p => p.id !== id))`
                      },
                      {
                        subtitle: "Функция updateParticipant(id, field, value):",
                        content: `Обновляет конкретное поле учредителя:
setParticipants(prev => prev.map(p => 
  p.id === id ? { ...p, [field]: value } : p
))

Поддерживаемые типы value:
• string - для текстовых полей
• Date | undefined - для дат`
                      },
                      {
                        subtitle: "Select гражданства:",
                        content: `Список стран в родительном падеже:
• Российской Федерации
• Республики Беларусь
• Республики Казахстан
• Украины
• Республики Узбекистан
• Азербайджанской Республики
• Республики Армения
• Грузии
• Республики Молдова
• Кыргызской Республики
• Республики Таджикистан
• Туркменистана

Компонент: SelectContent > SelectItem`
                      },
                      {
                        subtitle: "Layout карточки учредителя:",
                        content: `<Card> - карточка с тёмным фоном
  <CardHeader> - шапка с номером и кнопкой удаления
    <CardTitle> - "Учредитель #{index + 1}"
    <Button variant="ghost"> - кнопка удаления (X)
  <CardContent> - контент с полями
    <Grid 2 cols> - сетка полей
      • ФИО (fullName)
      • Дата рождения (birthDate) + DatePicker
      • Место рождения (birthPlace)
      • Гражданство (citizenship) + Select
      • Серия паспорта (passportSeries)
      • Номер паспорта (passportNumber)
      • Дата выдачи (passportIssueDate) + DatePicker
      • Кем выдан (passportIssuedBy) - full width
      • Код подразделения (passportCode)
      • Размер доли (shareAmount)
      • Адрес регистрации (registrationAddress) - full width`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="5. CoverUploadSection.tsx"
                    path="src/components/form-sections/CoverUploadSection.tsx"
                    description="Секция загрузки обложки документа с превью"
                    details={[
                      {
                        subtitle: "Props интерфейс:",
                        content: `interface CoverUploadSectionProps {
  coverImage: File | null;
  setCoverImage: (file: File | null) => void;
  coverPreview: string | null;
  setCoverPreview: (url: string | null) => void;
}`
                      },
                      {
                        subtitle: "Функция handleCoverUpload(files):",
                        content: `1. Проверяет наличие файлов
2. Берет первый файл из списка
3. Сохраняет File объект в state
4. Создает URL превью через FileReader:
   const reader = new FileReader()
   reader.onload = (e) => setCoverPreview(e.target?.result as string)
   reader.readAsDataURL(file)`
                      },
                      {
                        subtitle: "Режим с превью (coverPreview существует):",
                        content: `<div className="flex items-center gap-6">
  <img 
    src={coverPreview}
    className="w-20 h-20 object-cover rounded-lg border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]"
  />
  <div className="flex-1">
    <p>{coverImage?.name}</p>
    <p className="text-gray-400">{размер в KB}</p>
  </div>
  <Button onClick={() => fileInputRef.current?.click()}>
    Заменить изображение
  </Button>
</div>`
                      },
                      {
                        subtitle: "Режим без превью (пустая зона загрузки):",
                        content: `<div 
  onClick={() => fileInputRef.current?.click()}
  className="border-2 border-dashed border-[#FFD700]/50 rounded-lg p-12 hover:border-[#FFD700] cursor-pointer"
>
  <Upload className="w-16 h-16 mx-auto mb-4 text-[#FFD700]" />
  <p className="text-center text-gray-300">
    Нажмите или перетащите изображение обложки
  </p>
  <p className="text-center text-sm text-gray-500">
    Поддерживаются: JPG, PNG, GIF
  </p>
</div>`
                      },
                      {
                        subtitle: "Input элемент:",
                        content: `<Input
  type="file"
  ref={fileInputRef}
  onChange={(e) => handleCoverUpload(e.target.files)}
  accept="image/*"
  className="hidden"
/>`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="6. MatrixRain.tsx"
                    path="src/components/MatrixRain.tsx"
                    description="Декоративный эффект падающих золотых цифр 420 на фоне"
                    details={[
                      {
                        subtitle: "Константы:",
                        content: `const chars = ['4', '2', '0'];  // Символы для анимации
const fontSize = 20;              // Размер шрифта
const columnWidth = fontSize;     // Ширина колонки`
                      },
                      {
                        subtitle: "useEffect - Инициализация canvas:",
                        content: `1. Получает canvas element и 2d контекст
2. Устанавливает размеры canvas = размерам окна
3. Вычисляет количество колонок: Math.floor(width / columnWidth)
4. Инициализирует массив drops[] нулями (стартовые позиции)`
                      },
                      {
                        subtitle: "Функция draw() - Анимация:",
                        content: `setInterval(() => {
  // 1. Полупрозрачный чёрный overlay для эффекта затухания
  ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Для каждой колонки:
  drops.forEach((y, i) => {
    // Случайный символ из ['4', '2', '0']
    const char = chars[Math.floor(Math.random() * chars.length)];
    
    // Золотой цвет с альфа-каналом
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.font = fontSize + 'px monospace';
    
    // Отрисовка символа
    ctx.fillText(char, i * columnWidth, y * fontSize);
    
    // Золотое свечение
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFD700';
    
    // Обновление позиции или сброс
    if (y * fontSize > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;  // Сброс наверх
    }
    drops[i]++;  // Движение вниз
  });
}, 50);  // 50ms = ~20 FPS`
                      },
                      {
                        subtitle: "window.addEventListener('resize'):",
                        content: `При изменении размера окна:
1. Обновляет canvas.width и canvas.height
2. Пересчитывает columns
3. Пересоздает массив drops[]`
                      },
                      {
                        subtitle: "CSS стили:",
                        content: `className="fixed inset-0 pointer-events-none"
style={{ opacity: 0.3, zIndex: 0 }}

• fixed - фиксированная позиция
• inset-0 - растянут на весь экран
• pointer-events-none - не блокирует клики
• opacity: 0.3 - полупрозрачность
• zIndex: 0 - за основным контентом`
                      }
                    ]}
                  />

                  <ComponentDoc
                    title="7. DatePicker.tsx"
                    path="src/components/DatePicker.tsx"
                    description="Кастомный компонент выбора даты с золотым стилем"
                    details={[
                      {
                        subtitle: "Props интерфейс:",
                        content: `interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
}`
                      },
                      {
                        subtitle: "Компоненты Shadcn/ui:",
                        content: `• Popover - всплывающее окно
• PopoverTrigger - кнопка триггер
• PopoverContent - контент календаря
• Button - кнопка выбора даты
• Calendar - календарь выбора`
                      },
                      {
                        subtitle: "Кнопка триггера:",
                        content: `<Button
  variant="outline"
  className={cn(
    "justify-start text-left font-normal",
    "bg-[#2a2a2a] border-[#444] text-white",
    "hover:bg-[#333] hover:border-[#FFD700]",
    !date && "text-gray-400"
  )}
>
  <CalendarIcon className="mr-2 h-4 w-4 text-[#FFD700]" />
  {date ? format(date, "PPP", { locale: ru }) : placeholder}
</Button>

Форматирование даты:
• format(date, "PPP", { locale: ru })
• Пример: "15 ноября 2024 г."`
                      },
                      {
                        subtitle: "Календарь:",
                        content: `<Calendar
  mode="single"
  selected={date}
  onSelect={onDateChange}
  initialFocus
  className="rounded-md border border-[#FFD700] bg-[#1a1a1a]"
/>

Кастомные CSS классы:
• .rdp - корневой контейнер календаря
• .rdp-day_selected - выбранный день (золотой фон)
• .rdp-day:hover - ховер (золотая обводка)
• .rdp-button - кнопка дня
• .rdp-caption - заголовок месяца`
                      },
                      {
                        subtitle: "CSS стили в index.css:",
                        content: `.rdp-day_selected {
  background-color: #FFD700 !important;
  color: #000 !important;
  font-weight: bold;
}

.rdp-day:hover:not(.rdp-day_selected) {
  background-color: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
}

.rdp-button:hover {
  background-color: rgba(255, 215, 0, 0.2);
}

.rdp-caption {
  color: #FFD700;
}`
                      }
                    ]}
                  />
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="logic" className="mt-6">
            <ScrollArea className="h-[800px]">
              <Card className="p-8 bg-[#1a1a1a] border-[#333]">
                <h2 className="text-3xl font-bold text-[#FFD700] mb-6">⚙️ Бизнес-логика и алгоритмы</h2>
                
                <div className="space-y-8">
                  <LogicDoc
                    title="1. Процесс генерации документов"
                    steps={[
                      {
                        step: "1. Валидация формы",
                        code: `// Проверка обязательных полей договора
if (!contractNumber || !contractDate) {
  alert('Заполните данные договора');
  return;
}

// Проверка обязательных полей компании
if (!companyName || !companyAddress || !companyINN || !companyOGRN) {
  alert('Заполните все данные компании');
  return;
}

// Проверка наличия учредителей
if (participants.length === 0) {
  alert('Добавьте хотя бы одного учредителя');
  return;
}

// Проверка полноты данных учредителей
const invalidParticipant = participants.find(p =>
  !p.fullName || !p.birthDate || !p.birthPlace || !p.citizenship ||
  !p.passportSeries || !p.passportNumber || !p.passportIssueDate ||
  !p.passportIssuedBy || !p.passportCode || !p.registrationAddress ||
  !p.shareAmount
);

if (invalidParticipant) {
  alert('Заполните все поля для каждого учредителя');
  return;
}`
                      },
                      {
                        step: "2. Конвертация обложки в Base64",
                        code: `let coverImageBase64 = null;

if (coverImage) {
  coverImageBase64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(coverImage);
  });
  
  // Удаляем префикс "data:image/...;base64,"
  coverImageBase64 = coverImageBase64.split(',')[1];
}

Формат результата: чистая Base64 строка без metadata`
                      },
                      {
                        step: "3. Форматирование дат",
                        code: `import { format } from 'date-fns';

// Функция форматирования даты в dd.MM.yyyy
const formatDate = (date: Date | undefined): string => {
  if (!date) return '';
  return format(date, 'dd.MM.yyyy');
};

// Применяем к полям:
const formData = {
  contract_number: contractNumber,
  contract_date: formatDate(contractDate),
  company_name: companyName,
  company_address: companyAddress,
  company_inn: companyINN,
  company_ogrn: companyOGRN,
  participants: participants.map(p => ({
    full_name: p.fullName,
    birth_date: formatDate(p.birthDate),
    birth_place: p.birthPlace,
    citizenship: p.citizenship,
    passport_series: p.passportSeries,
    passport_number: p.passportNumber,
    passport_issue_date: formatDate(p.passportIssueDate),
    passport_issued_by: p.passportIssuedBy,
    passport_code: p.passportCode,
    registration_address: p.registrationAddress,
    share_amount: p.shareAmount
  })),
  cover_image: coverImageBase64
};`
                      },
                      {
                        step: "4. HTTP запрос на backend",
                        code: `const response = await fetch(
  'https://your-cloud-function-url/generate-docs',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }
);

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || 'Ошибка генерации документов');
}

const result = await response.json();

Формат ответа:
{
  success: true,
  filename: "Учредительные_документы_ООО_CompanyName.docx",
  data: "Base64EncodedDocxFile..."
}`
                      },
                      {
                        step: "5. Декодирование и скачивание файла",
                        code: `// Декодируем Base64 в бинарные данные
const binaryData = atob(result.data);

// Создаем Uint8Array
const bytes = new Uint8Array(binaryData.length);
for (let i = 0; i < binaryData.length; i++) {
  bytes[i] = binaryData.charCodeAt(i);
}

// Создаем Blob с MIME-типом DOCX
const blob = new Blob([bytes], {
  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
});

// Создаем временную ссылку для скачивания
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = result.filename;

// Триггерим скачивание
document.body.appendChild(link);
link.click();

// Очищаем ресурсы
document.body.removeChild(link);
window.URL.revokeObjectURL(url);`
                      }
                    ]}
                  />

                  <LogicDoc
                    title="2. Управление состоянием учредителей"
                    steps={[
                      {
                        step: "Добавление учредителя",
                        code: `const addParticipant = () => {
  const newParticipant: Participant = {
    id: crypto.randomUUID(),  // Генерируем уникальный ID
    fullName: '',
    birthDate: undefined,
    birthPlace: '',
    citizenship: 'Российской Федерации',  // Значение по умолчанию
    passportSeries: '',
    passportNumber: '',
    passportIssueDate: undefined,
    passportIssuedBy: '',
    passportCode: '',
    registrationAddress: '',
    shareAmount: ''
  };
  
  // Immutable добавление в конец массива
  setParticipants(prev => [...prev, newParticipant]);
};

Почему crypto.randomUUID():
• Гарантирует уникальность ID
• Стандартный формат UUID v4
• Не требует внешних библиотек`
                      },
                      {
                        step: "Удаление учредителя",
                        code: `const removeParticipant = (id: string) => {
  // Immutable фильтрация массива
  setParticipants(prev => prev.filter(p => p.id !== id));
};

Вызов из компонента:
<Button onClick={() => removeParticipant(participant.id)}>
  <X className="h-4 w-4" />
</Button>`
                      },
                      {
                        step: "Обновление поля учредителя",
                        code: `const updateParticipant = (
  id: string,
  field: keyof Participant,
  value: string | Date | undefined
) => {
  // Immutable обновление конкретного объекта
  setParticipants(prev =>
    prev.map(p =>
      p.id === id
        ? { ...p, [field]: value }  // Spread + динамический ключ
        : p
    )
  );
};

Примеры вызовов:
// Обновление текстового поля
updateParticipant(p.id, 'fullName', e.target.value)

// Обновление даты
updateParticipant(p.id, 'birthDate', selectedDate)

// Обновление через Select
updateParticipant(p.id, 'citizenship', newValue)`
                      }
                    ]}
                  />

                  <LogicDoc
                    title="3. Загрузка и превью изображения"
                    steps={[
                      {
                        step: "Чтение файла и создание превью",
                        code: `const handleCoverUpload = (files: FileList | null) => {
  if (!files || files.length === 0) return;
  
  const file = files[0];
  
  // Сохраняем File объект
  setCoverImage(file);
  
  // Создаем превью через FileReader
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const result = e.target?.result as string;
    // result формата: "data:image/jpeg;base64,/9j/4AAQ..."
    setCoverPreview(result);
  };
  
  // Читаем файл как Data URL
  reader.readAsDataURL(file);
};

FileReader API:
• readAsDataURL() - создаёт Base64 Data URL
• onload - callback после успешного чтения
• result - содержит Data URL строку`
                      },
                      {
                        step: "Отображение превью",
                        code: `{coverPreview && (
  <div className="flex items-center gap-6">
    <img
      src={coverPreview}  // Data URL из FileReader
      alt="Cover preview"
      className="w-20 h-20 object-cover rounded-lg border-2 border-[#FFD700]"
      style={{
        boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
      }}
    />
    <div className="flex-1">
      <p className="font-medium text-white">
        {coverImage?.name}
      </p>
      <p className="text-sm text-gray-400">
        {((coverImage?.size || 0) / 1024).toFixed(2)} KB
      </p>
    </div>
  </div>
)}

Вычисление размера:
• file.size - размер в байтах
• / 1024 - конвертация в килобайты
• .toFixed(2) - округление до 2 знаков`
                      },
                      {
                        step: "Конвертация для отправки на backend",
                        code: `if (coverImage) {
  // Читаем файл как Data URL
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(coverImage);
  });
  
  // Data URL формат: "data:image/jpeg;base64,/9j/4AAQ..."
  // Убираем префикс "data:image/...;base64,"
  coverImageBase64 = dataUrl.split(',')[1];
}

Почему убираем префикс:
• Backend ожидает чистый Base64
• Префикс содержит MIME-тип (image/jpeg, image/png)
• split(',')[1] берёт всё после первой запятой`
                      }
                    ]}
                  />
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="backend" className="mt-6">
            <ScrollArea className="h-[800px]">
              <Card className="p-8 bg-[#1a1a1a] border-[#333]">
                <h2 className="text-3xl font-bold text-[#FFD700] mb-6">🔧 Backend функция generate-docs</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#FFD700] mb-4">Описание функции</h3>
                    <p className="text-gray-300 mb-4">
                      Cloud Function на Python 3.11, которая генерирует DOCX документ на основе шаблона 
                      и данных формы. Использует библиотеки docxtpl и python-docx для работы с документами.
                    </p>
                  </div>

                  <BackendDoc
                    title="1. Структура проекта"
                    code={`/backend/generate-docs/
├── index.py              # Основной код функции
├── requirements.txt      # Python зависимости
└── tests.json           # Тесты API

requirements.txt:
docxtpl==0.19.0          # Шаблонизатор для DOCX
python-docx==1.1.2       # Библиотека работы с DOCX
Jinja2==3.1.4            # Движок шаблонов
lxml==5.3.0              # XML парсер (зависимость docx)`}
                  />

                  <BackendDoc
                    title="2. Импорты и зависимости"
                    code={`import json
import base64
import io
import os
from docxtpl import DocxTemplate
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT

json - работа с JSON данными
base64 - декодирование обложки
io.BytesIO - работа с бинарными данными в памяти
os - работа с файловой системой
DocxTemplate - рендеринг Jinja2 шаблонов в DOCX
Document - низкоуровневая работа с DOCX структурой
Pt - единица измерения шрифта (points)
WD_PARAGRAPH_ALIGNMENT - выравнивание параграфов`}
                  />

                  <BackendDoc
                    title="3. Обработчик handler(event, context)"
                    code={`def handler(event, context):
    '''
    Cloud Function для генерации DOCX документов
    
    Args:
        event: dict с httpMethod, body, headers
        context: объект с request_id, function_name
    
    Returns:
        dict с statusCode, headers, body
    '''
    
    method = event.get('httpMethod', 'POST')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Основная логика POST запроса
    try:
        # ... код обработки
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }`}
                  />

                  <BackendDoc
                    title="4. Парсинг входных данных"
                    code={`# Получаем JSON из body
body_str = event.get('body', '{}')
data = json.loads(body_str)

# Извлекаем поля
contract_number = data.get('contract_number', '')
contract_date = data.get('contract_date', '')
company_name = data.get('company_name', '')
company_address = data.get('company_address', '')
company_inn = data.get('company_inn', '')
company_ogrn = data.get('company_ogrn', '')
participants = data.get('participants', [])
cover_image_b64 = data.get('cover_image')  # Base64 или None

Формат participants:
[
  {
    "full_name": "Иванов Иван Иванович",
    "birth_date": "01.01.1990",
    "birth_place": "г. Москва",
    "citizenship": "Российской Федерации",
    "passport_series": "1234",
    "passport_number": "567890",
    "passport_issue_date": "01.01.2010",
    "passport_issued_by": "ОВД Района...",
    "passport_code": "123-456",
    "registration_address": "г. Москва, ул. ...",
    "share_amount": "100%"
  }
]`}
                  />

                  <BackendDoc
                    title="5. Загрузка и рендеринг шаблона"
                    code={`# Путь к шаблону (в public/ каталоге проекта)
template_path = '/var/task/public/template.docx'

# Загружаем шаблон через docxtpl
doc = DocxTemplate(template_path)

# Создаём контекст для Jinja2
context = {
    'contract_number': contract_number,
    'contract_date': contract_date,
    'company_name': company_name,
    'company_address': company_address,
    'company_inn': company_inn,
    'company_ogrn': company_ogrn,
    'participants': participants
}

# Рендерим шаблон с данными
doc.render(context)

Как работает docxtpl:
1. Ищет плейсхолдеры {{ variable_name }} в XML документа
2. Заменяет их на значения из context
3. Поддерживает циклы {% for %}, условия {% if %}
4. Сохраняет форматирование исходного документа

Пример шаблона template.docx:
Договор №{{ contract_number }} от {{ contract_date }}
Компания: {{ company_name }}
ИНН: {{ company_inn }}

Учредители:
{% for p in participants %}
{{ loop.index }}. {{ p.full_name }}
   Дата рождения: {{ p.birth_date }}
   Место рождения: {{ p.birth_place }}
   Гражданство: {{ p.citizenship }}
   ...
{% endfor %}`}
                  />

                  <BackendDoc
                    title="6. Вставка обложки в документ"
                    code={`if cover_image_b64:
    # Декодируем Base64 в бинарные данные
    cover_image_bytes = base64.b64decode(cover_image_b64)
    cover_image_stream = io.BytesIO(cover_image_bytes)
    
    # Получаем первый параграф документа
    first_paragraph = doc.paragraphs[0] if doc.paragraphs else None
    
    if first_paragraph:
        # Вставляем новый параграф ПЕРЕД первым
        new_para = first_paragraph.insert_paragraph_before()
        
        # Центрируем параграф
        new_para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
        
        # Добавляем изображение в run параграфа
        run = new_para.add_run()
        run.add_picture(cover_image_stream, width=Inches(6))
        
        # Добавляем разрыв страницы после обложки
        run.add_break()

Параметры изображения:
• width=Inches(6) - ширина 6 дюймов (~15.24 см)
• Высота масштабируется автоматически
• Размещение в отдельном run для контроля форматирования

Почему insert_paragraph_before():
• Обложка должна быть на первой странице
• Не затираем существующий контент
• Сохраняем все стили и форматирование`}
                  />

                  <BackendDoc
                    title="7. Исправление форматирования (убираем bold)"
                    code={`# Получаем низкоуровневый Document объект
underlying_doc = doc.docx

# Ищем первый НЕ жирный run для копирования форматирования
template_run = None
for paragraph in underlying_doc.paragraphs:
    for run in paragraph.runs:
        if not run.bold:  # Находим первый обычный (не bold) run
            template_run = run
            break
    if template_run:
        break

# Проходим по всем параграфам и runs
for paragraph in underlying_doc.paragraphs:
    for run in paragraph.runs:
        text = run.text.strip()
        
        # Если run содержит данные из формы (не пустой)
        if text and template_run:
            # Копируем форматирование из шаблона
            run.font.name = template_run.font.name
            run.font.size = template_run.font.size
            
            # ПРИНУДИТЕЛЬНО убираем bold
            run.font.bold = False

Почему это нужно:
• docxtpl может наследовать bold из плейсхолдера {{ variable }}
• Если {{ variable }} был жирным, данные тоже станут жирными
• Мы хотим обычный текст для всех данных формы

Алгоритм:
1. Находим "эталонный" run с нужным форматированием
2. Копируем его стили (шрифт, размер)
3. Гарантируем bold=False для всех данных`}
                  />

                  <BackendDoc
                    title="8. Сохранение и отправка документа"
                    code={`# Сохраняем документ в память (BytesIO)
output = io.BytesIO()
doc.save(output)
output.seek(0)  # Перематываем в начало

# Читаем бинарные данные
docx_bytes = output.read()

# Кодируем в Base64 для передачи в JSON
docx_base64 = base64.b64encode(docx_bytes).decode('utf-8')

# Формируем имя файла
filename = f"Учредительные_документы_{company_name.replace(' ', '_')}.docx"

# Возвращаем успешный ответ
return {
    'statusCode': 200,
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    'body': json.dumps({
        'success': True,
        'filename': filename,
        'data': docx_base64
    })
}

Почему BytesIO:
• Не создаём временные файлы на диске
• Всё в оперативной памяти (быстрее)
• Автоматическая очистка после выхода из функции

Почему Base64:
• JSON не поддерживает бинарные данные
• Base64 - текстовое представление бинарных данных
• Frontend легко декодирует обратно в Blob`}
                  />

                  <BackendDoc
                    title="9. Обработка ошибок"
                    code={`try:
    # Весь код генерации документа
    ...
    
except FileNotFoundError as e:
    return {
        'statusCode': 404,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'error': f'Template not found: {str(e)}'
        })
    }

except json.JSONDecodeError as e:
    return {
        'statusCode': 400,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'error': f'Invalid JSON: {str(e)}'
        })
    }

except Exception as e:
    return {
        'statusCode': 500,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'error': f'Internal error: {str(e)}'
        })
    }

Типы ошибок:
• 404 - не найден template.docx
• 400 - некорректный JSON в запросе
• 500 - любая другая ошибка (парсинг, рендеринг, etc)`}
                  />

                  <BackendDoc
                    title="10. Полный код index.py"
                    code={`import json
import base64
import io
from docxtpl import DocxTemplate
from docx.shared import Inches
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT

def handler(event, context):
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_str = event.get('body', '{}')
        data = json.loads(body_str)
        
        contract_number = data.get('contract_number', '')
        contract_date = data.get('contract_date', '')
        company_name = data.get('company_name', '')
        company_address = data.get('company_address', '')
        company_inn = data.get('company_inn', '')
        company_ogrn = data.get('company_ogrn', '')
        participants = data.get('participants', [])
        cover_image_b64 = data.get('cover_image')
        
        template_path = '/var/task/public/template.docx'
        doc = DocxTemplate(template_path)
        
        context = {
            'contract_number': contract_number,
            'contract_date': contract_date,
            'company_name': company_name,
            'company_address': company_address,
            'company_inn': company_inn,
            'company_ogrn': company_ogrn,
            'participants': participants
        }
        
        doc.render(context)
        
        if cover_image_b64:
            cover_image_bytes = base64.b64decode(cover_image_b64)
            cover_image_stream = io.BytesIO(cover_image_bytes)
            
            first_paragraph = doc.paragraphs[0] if doc.paragraphs else None
            if first_paragraph:
                new_para = first_paragraph.insert_paragraph_before()
                new_para.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
                run = new_para.add_run()
                run.add_picture(cover_image_stream, width=Inches(6))
                run.add_break()
        
        underlying_doc = doc.docx
        template_run = None
        for paragraph in underlying_doc.paragraphs:
            for run in paragraph.runs:
                if not run.bold:
                    template_run = run
                    break
            if template_run:
                break
        
        for paragraph in underlying_doc.paragraphs:
            for run in paragraph.runs:
                text = run.text.strip()
                if text and template_run:
                    run.font.name = template_run.font.name
                    run.font.size = template_run.font.size
                    run.font.bold = False
        
        output = io.BytesIO()
        doc.save(output)
        output.seek(0)
        docx_bytes = output.read()
        docx_base64 = base64.b64encode(docx_bytes).decode('utf-8')
        
        filename = f"Учредительные_документы_{company_name.replace(' ', '_')}.docx"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'filename': filename,
                'data': docx_base64
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }`}
                  />
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <ScrollArea className="h-[800px]">
              <Card className="p-8 bg-[#1a1a1a] border-[#333]">
                <h2 className="text-3xl font-bold text-[#FFD700] mb-6">💻 Весь исходный код проекта</h2>
                
                <div className="space-y-8">
                  <FileCodeDoc
                    title="src/pages/Index.tsx"
                    language="typescript"
                    lines="292 строки"
                    description="Главная страница с формой генерации документов"
                  />
                  
                  <FileCodeDoc
                    title="src/components/form-sections/ContractDetailsSection.tsx"
                    language="typescript"
                    lines="47 строк"
                    description="Секция данных договора (номер и дата)"
                  />
                  
                  <FileCodeDoc
                    title="src/components/form-sections/CompanyDetailsSection.tsx"
                    language="typescript"
                    lines="83 строки"
                    description="Секция реквизитов компании"
                  />
                  
                  <FileCodeDoc
                    title="src/components/form-sections/ParticipantsSection.tsx"
                    language="typescript"
                    lines="199 строк"
                    description="Секция управления учредителями"
                  />
                  
                  <FileCodeDoc
                    title="src/components/form-sections/CoverUploadSection.tsx"
                    language="typescript"
                    lines="92 строки"
                    description="Секция загрузки обложки документа"
                  />
                  
                  <FileCodeDoc
                    title="src/components/MatrixRain.tsx"
                    language="typescript"
                    lines="73 строки"
                    description="Canvas эффект падающих золотых цифр 420"
                  />
                  
                  <FileCodeDoc
                    title="src/components/DatePicker.tsx"
                    language="typescript"
                    lines="43 строки"
                    description="Кастомный компонент выбора даты"
                  />
                  
                  <FileCodeDoc
                    title="backend/generate-docs/index.py"
                    language="python"
                    lines="158 строк"
                    description="Cloud Function генерации DOCX документов"
                  />
                  
                  <FileCodeDoc
                    title="src/App.tsx"
                    language="typescript"
                    lines="28 строк"
                    description="Корневой компонент с роутингом"
                  />
                  
                  <FileCodeDoc
                    title="src/main.tsx"
                    language="typescript"
                    lines="12 строк"
                    description="Точка входа приложения"
                  />
                  
                  <FileCodeDoc
                    title="src/lib/utils.ts"
                    language="typescript"
                    lines="6 строк"
                    description="Утилита cn() для Tailwind классов"
                  />
                  
                  <div className="mt-8 p-6 bg-black/50 rounded-lg border border-[#333]">
                    <h3 className="text-xl font-bold text-[#FFD700] mb-4">📊 Статистика проекта</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <p className="font-semibold">Всего файлов:</p>
                        <p className="text-2xl text-[#FFD700]">11</p>
                      </div>
                      <div>
                        <p className="font-semibold">Всего строк кода:</p>
                        <p className="text-2xl text-[#FFD700]">~1,100</p>
                      </div>
                      <div>
                        <p className="font-semibold">TypeScript компонентов:</p>
                        <p className="text-2xl text-[#FFD700]">9</p>
                      </div>
                      <div>
                        <p className="font-semibold">Python функций:</p>
                        <p className="text-2xl text-[#FFD700]">1</p>
                      </div>
                      <div>
                        <p className="font-semibold">UI компонентов Shadcn:</p>
                        <p className="text-2xl text-[#FFD700]">12</p>
                      </div>
                      <div>
                        <p className="font-semibold">Иконок Lucide:</p>
                        <p className="text-2xl text-[#FFD700]">8</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-black/50 rounded-lg border border-[#FFD700]">
                    <h3 className="text-xl font-bold text-[#FFD700] mb-4">🎯 Ключевые технологии</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>• <span className="text-[#FFD700]">React Hooks</span> - useState для управления состоянием</p>
                      <p>• <span className="text-[#FFD700]">TypeScript</span> - строгая типизация всего кода</p>
                      <p>• <span className="text-[#FFD700]">Tailwind CSS</span> - утилитарные классы стилизации</p>
                      <p>• <span className="text-[#FFD700]">Shadcn/ui</span> - готовые компоненты UI</p>
                      <p>• <span className="text-[#FFD700]">Canvas API</span> - анимация падающих цифр</p>
                      <p>• <span className="text-[#FFD700]">FileReader API</span> - чтение файлов в браузере</p>
                      <p>• <span className="text-[#FFD700]">Base64 encoding</span> - передача бинарных данных</p>
                      <p>• <span className="text-[#FFD700]">Fetch API</span> - HTTP запросы на backend</p>
                      <p>• <span className="text-[#FFD700]">Blob API</span> - создание файлов для скачивания</p>
                      <p>• <span className="text-[#FFD700]">Cloud Functions</span> - серверлесс backend</p>
                      <p>• <span className="text-[#FFD700]">docxtpl</span> - Jinja2 шаблоны в DOCX</p>
                      <p>• <span className="text-[#FFD700]">python-docx</span> - манипуляции с DOCX структурой</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface ComponentDocProps {
  title: string;
  path: string;
  description: string;
  details: Array<{
    subtitle: string;
    content: string;
  }>;
}

function ComponentDoc({ title, path, description, details }: ComponentDocProps) {
  return (
    <div className="border border-[#333] rounded-lg p-6 bg-black/30">
      <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">{path}</p>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="space-y-4">
        {details.map((detail, idx) => (
          <div key={idx}>
            <h4 className="font-semibold text-[#FFD700] mb-2">{detail.subtitle}</h4>
            <pre className="bg-[#0a0a0a] p-4 rounded text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
{detail.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LogicDocProps {
  title: string;
  steps: Array<{
    step: string;
    code: string;
  }>;
}

function LogicDoc({ title, steps }: LogicDocProps) {
  return (
    <div className="border border-[#333] rounded-lg p-6 bg-black/30">
      <h3 className="text-2xl font-bold text-[#FFD700] mb-4">{title}</h3>
      
      <div className="space-y-6">
        {steps.map((item, idx) => (
          <div key={idx}>
            <h4 className="font-semibold text-[#FFD700] mb-2">{item.step}</h4>
            <pre className="bg-[#0a0a0a] p-4 rounded text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
{item.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BackendDocProps {
  title: string;
  code: string;
}

function BackendDoc({ title, code }: BackendDocProps) {
  return (
    <div className="border border-[#333] rounded-lg p-6 bg-black/30">
      <h3 className="text-xl font-bold text-[#FFD700] mb-3">{title}</h3>
      <pre className="bg-[#0a0a0a] p-4 rounded text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
{code}
      </pre>
    </div>
  );
}

interface FileCodeDocProps {
  title: string;
  language: string;
  lines: string;
  description: string;
}

function FileCodeDoc({ title, language, lines, description }: FileCodeDocProps) {
  return (
    <div className="border border-[#333] rounded-lg p-6 bg-black/30">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-[#FFD700]">{title}</h3>
        <span className="text-sm text-gray-400">{lines}</span>
      </div>
      <p className="text-sm text-gray-400 mb-2">Язык: {language}</p>
      <p className="text-gray-300">{description}</p>
      <p className="text-sm text-gray-500 mt-2">
        📝 Полный код доступен в редакторе проекта
      </p>
    </div>
  );
}