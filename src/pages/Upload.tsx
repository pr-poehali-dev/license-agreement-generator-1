import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name === 'template.docx' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
      } else {
        toast({
          title: "Неверный формат",
          description: "Загрузите файл template.docx",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Файл не выбран",
        description: "Выберите файл template.docx",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const response = await fetch('https://functions.poehali.dev/cbc1d24a-1165-4535-ba22-270c4cf061f5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        body: bytes
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Файл загружен!",
          description: "Шаблон успешно загружен на сервер",
        });
        setFile(null);
      } else {
        throw new Error(result.error || 'Ошибка загрузки');
      }

    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <Icon name="Upload" size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Загрузка шаблона</h1>
          <p className="text-slate-600 text-sm">Загрузите файл template.docx для генерации договоров</p>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <input
              type="file"
              id="file-upload"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Icon name="FileText" size={32} className="text-slate-400 mx-auto mb-3" />
              <p className="text-slate-700 font-medium mb-1">
                {file ? file.name : 'Нажмите для выбора файла'}
              </p>
              <p className="text-slate-500 text-sm">или перетащите файл сюда</p>
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-900 font-medium text-sm">{file.name}</p>
                <p className="text-green-700 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            {isUploading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name="Upload" size={20} className="mr-2" />
                Загрузить шаблон
              </>
            )}
          </Button>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
              <p>Эта страница используется один раз для загрузки шаблона договора. После успешной загрузки страница больше не понадобится.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;