import './index.css';
import { DragUpload } from '../components/DragUpload';
import { useLanguage } from '../contexts/LanguageContext';

export const MainWindow = () => {
  const { t } = useLanguage();
  

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  return (
    <div className="main-window">
      <div className="content">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <DragUpload onFileSelect={handleFileSelect} />
      </div>
    </div>
  )
}
