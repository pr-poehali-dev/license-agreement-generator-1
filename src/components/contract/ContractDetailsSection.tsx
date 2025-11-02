import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormData } from './types';

interface ContractDetailsSectionProps {
  formData: FormData;
  minDateStr: string;
  maxDateStr: string;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const ContractDetailsSection = ({
  formData,
  minDateStr,
  maxDateStr,
  onInputChange
}: ContractDetailsSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#FFD700] mb-6 pb-2 border-b-2 border-[#FFD700]">Реквизиты договора</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">Номер договора</Label>
            <Input
              value={formData.contract_number}
              disabled
              className="bg-[#0f0f0f]/50 border-[#333] text-white/70 cursor-not-allowed"
            />
            <p className="text-xs text-[#FFD700]/60">
              Генерируется автоматически
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">Дата заключения договора *</Label>
            <Input
              type="date"
              min={minDateStr}
              max={maxDateStr}
              value={formData.contract_date}
              onChange={(e) => onInputChange('contract_date', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
            <p className="text-xs text-[#FFD700]/60">
              Выбор доступен на 14 дней вперёд
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
