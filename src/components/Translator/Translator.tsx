import { useState } from 'react';
import { FC } from 'react';
import Button from '../Button';
import Textarea from '../Textarea/Textarea';

interface ResponseData {
  translatedText: string;
}

const Translator: FC = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');

  const handleTranslate = async () => {
    const response = await fetch(
      `https://libretranslate.de/translate?q=${fromText}&source=ru&target=en`,
      { method: 'POST' },
    );

    const data: ResponseData = await response.json();

    setToText(data.translatedText);
  };

  return (
    <div>
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
