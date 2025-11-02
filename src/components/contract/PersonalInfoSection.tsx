import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, COUNTRIES, PAYMENT_PERCENTAGES } from './types';

interface PersonalInfoSectionProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const PersonalInfoSection = ({ formData, onInputChange }: PersonalInfoSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#FFD700] mb-6 pb-2 border-b-2 border-[#FFD700]">Личная информация</h3>
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">Гражданство *</Label>
            {formData.citizenship === 'Другое' ? (
              <div className="space-y-2">
                <Input
                  placeholder="Укажите гражданство"
                  value={formData.custom_citizenship}
                  onChange={(e) => onInputChange('custom_citizenship', e.target.value)}
                  className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onInputChange('citizenship', '');
                    onInputChange('custom_citizenship', '');
                  }}
                  className="text-[#FFD700]/60 hover:text-[#FFD700] text-xs"
                >
                  ← Выбрать из списка
                </Button>
              </div>
            ) : (
              <Select value={formData.citizenship} onValueChange={(value) => onInputChange('citizenship', value)}>
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
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">ФИО полностью (три слова) *</Label>
            <Input
              placeholder="Иванов Иван Иванович"
              value={formData.full_name_genitive}
              onChange={(e) => onInputChange('full_name_genitive', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
            {formData.full_name_genitive && (
              <p className="text-xs text-[#FFD700]/60">
                {formData.full_name_genitive.trim().split(/\s+/).length === 3 
                  ? `✓ ФИО для подписи: ${formData.short_name}`
                  : '⚠ Введите ровно 3 слова'}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">ФИО для подписи (формируется автоматически)</Label>
            <Input
              placeholder="Иванов И.И."
              value={formData.short_name}
              disabled
              className="bg-[#0f0f0f]/50 border-[#333] text-white/70 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">Творческий псевдоним *</Label>
            <Input
              placeholder="EDDI$"
              value={formData.nickname}
              onChange={(e) => onInputChange('nickname', e.target.value)}
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
              onChange={(e) => onInputChange('passport', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">ИНН/SWIFT код *</Label>
            <Input
              placeholder="772987898798"
              value={formData.inn_swift}
              onChange={(e) => onInputChange('inn_swift', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#FFD700]">Банковские реквизиты для выплат *</Label>
          <Input
            placeholder="Банк: Sberbank, IBAN: RU79847239847239847239847, БИК: 1234567890"
            value={formData.bank_details}
            onChange={(e) => onInputChange('bank_details', e.target.value)}
            className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">Email *</Label>
            <Input
              type="email"
              placeholder="mr-frank-eduard@web.de"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">Процент выплаты *</Label>
            <Select value={formData.payment_percentage} onValueChange={(value) => onInputChange('payment_percentage', value)}>
              <SelectTrigger className="bg-[#0f0f0f] border-[#d32f2f] text-white">
                <SelectValue placeholder="Выберите процент" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#333]">
                {PAYMENT_PERCENTAGES.map((percent) => (
                  <SelectItem key={percent.value} value={percent.label} className="text-white focus:bg-[#333] focus:text-[#FFD700]">
                    {percent.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
