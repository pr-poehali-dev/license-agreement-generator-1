import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { FormData } from './types';

interface SongInfoSectionProps {
  formData: FormData;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (field: keyof FormData, value: string) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SongInfoSection = ({ 
  formData, 
  fileInputRef, 
  onInputChange, 
  onFileSelect 
}: SongInfoSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#FFD700] mb-6 pb-2 border-b-2 border-[#FFD700]">Информация о песне</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">Название песни *</Label>
            <Input
              placeholder="Название композиции"
              value={formData.song_name}
              onChange={(e) => onInputChange('song_name', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">Исполнитель *</Label>
            <Input
              placeholder="Имя исполнителя"
              value={formData.performer}
              onChange={(e) => onInputChange('performer', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#FFD700]">Автор слов *</Label>
            <Input
              placeholder="Автор текста песни"
              value={formData.lyrics_author}
              onChange={(e) => onInputChange('lyrics_author', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#FFD700]">Автор музыки *</Label>
            <Input
              placeholder="Композитор"
              value={formData.music_author}
              onChange={(e) => onInputChange('music_author', e.target.value)}
              className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#FFD700]">Создатель фонограммы *</Label>
          <Input
            placeholder="Звукорежиссёр / продюсер"
            value={formData.phonogram_creator}
            onChange={(e) => onInputChange('phonogram_creator', e.target.value)}
            className="bg-[#0f0f0f] border-[#d32f2f] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#FFD700]">Обложка трека (будет вставлена 150x150)</Label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0f0f0f] border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
            >
              <Icon name="Upload" className="mr-2" size={20} />
              Выбрать изображение
            </Button>
            {formData.cover_image && (
              <span className="text-[#FFD700] text-sm">{formData.cover_image.name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
