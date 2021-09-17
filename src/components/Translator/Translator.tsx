import { useEffect, useState } from 'react';
import { FC } from 'react';
import TranslateApi from '../../services/TranslateApi';
import Button from '../Button';
import Textarea from '../Textarea/Textarea';
import Select, { IOption } from '../Select/Select';

const DETECT_LANGUAGE_OPTION: IOption = {
  id: 'DETECT_LANGUAGE_OPTION',
  title: 'Detect language',
};

const Translator: FC = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [language, setLanguage] = useState<string | null>(null);
  const [options, setOptions] = useState<IOption[]>([]);
  const [languageFrom, setLanguageFrom] = useState<IOption | null>(null);
  const [languageTo, setLanguageTo] = useState<IOption | null>(null);

  const detectLanguage = async () => {
    const api = new TranslateApi();

    const detectedLanguage = await api.detect(fromText);
    setLanguage(detectedLanguage);

    return detectedLanguage;
  };

  const handleTranslate = async () => {
    const api = new TranslateApi();

    if (languageFrom!.id === DETECT_LANGUAGE_OPTION.id) {
      const detectedLanguage = await detectLanguage();

      const translatedText = await api.translate(fromText, detectedLanguage!, languageTo!.id);

      setToText(translatedText);
    } else {
      const translatedText = await api.translate(fromText, languageFrom!.id, languageTo!.id);

      setToText(translatedText);
    }
  };

  const loadLanguages = async () => {
    const api = new TranslateApi();

    const languages = await api.getLanguages();

    setOptions(languages.map((language) => {
      return {
        id: language.code,
        title: language.name,
      };
    }));
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  return (
    <div>
      detected language: {language || 'not detected'}
      <div>
        <div>
          <Select
            options={[DETECT_LANGUAGE_OPTION, ...options]}
            value={languageFrom}
            onChange={setLanguageFrom}
          />
        </div>
        <Textarea
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
        />
      </div>
      <Button onClick={handleTranslate} disabled={!languageFrom || !languageTo}>
        Translate
      </Button>
      <div>
        <div>
          <Select
            options={options}
            value={languageTo}
            onChange={setLanguageTo}
          />
        </div>
        <Textarea
          value={toText}
          onChange={(e) => setToText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Translator;
