import maxBy from 'lodash.maxby';

interface TranslateResponseData {
  translatedText: string;
}

interface DetectResponseData {
  confidence: number;
  language: string
}

interface ILanguage {
  code: string;
  name: string;
}

export default class TranslateApi {
  async translate(text: string, languageFrom: string, languageTo: string): Promise<string> {
    const response = await fetch(
      `https://libretranslate.de/translate?q=${text}&source=${languageFrom}&target=${languageTo}`,
      { method: 'POST' },
    );

    const data: TranslateResponseData = await response.json();

    return data.translatedText;
  }

  async detect(text: string): Promise<string | null> {
    const response = await fetch(
      `https://libretranslate.de/detect?q=${text}`,
      { method: 'POST' },
    );

    const languages: DetectResponseData[] = await response.json();

    const mostLikelyLanguage = maxBy(languages, ({ confidence }) => confidence);

    return mostLikelyLanguage?.language || null;
  }

  async getLanguages() {
    const response = await fetch('https://libretranslate.de/languages');

    const data: ILanguage[] = await response.json();

    return data;
  }
}
