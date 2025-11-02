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
            {formData.cover_image ? (
              <div className="flex items-center gap-4 w-full p-4 bg-[#0f0f0f] border-2 border-[#FFD700] rounded-lg">
                <img 
                  src={URL.createObjectURL(formData.cover_image)} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded-lg border-2 border-[#FFD700] shadow-lg shadow-[#FFD700]/30"
                />
                <div className="flex-1">
                  <p className="text-[#FFD700] font-semibold">{formData.cover_image.name}</p>
                  <p className="text-[#FFD700]/60 text-sm">
                    {(formData.cover_image.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#FFD700] hover:text-[#FFA500] hover:bg-[#FFD700]/10"
                >
                  <Icon name="RefreshCw" size={20} />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#0f0f0f] border-2 border-dashed border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-solid h-24 transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon name="Upload" size={32} className="opacity-60" />
                  <span className="text-sm">Нажмите для загрузки обложки</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};