import { useState } from 'react';
import { FC } from 'react';
import TranslateApi from '../../services/TranslateApi';
import Button from '../Button';
import Textarea from '../Textarea/Textarea';

const Translator: FC = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [language, setLanguage] = useState<string | null>(null);

  const handleTranslate = async () => {
    const api = new TranslateApi();

    const detectedLanguage = await api.detect(fromText);
    setLanguage(detectedLanguage);

    if (!detectedLanguage) {
      return;
    }

    const translatedText = await api.translate(fromText, detectedLanguage);

    setToText(translatedText);
  };

  return (
    <div>
      detected language: {language || 'not detected'}
      <Textarea
        value={fromText}
        onChange={(e) => setFromText(e.target.value)}
      />
      <Button onClick={handleTranslate}>
        Translate
      </Button>
      <Textarea
        value={toText}
        onChange={(e) => setToText(e.target.value)}
      />
    </div>
  );
};

export default Translator;
