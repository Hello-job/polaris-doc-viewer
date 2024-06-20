import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { I18nextProvider } from 'react-i18next'
import zh_view from '../locales/zh/view.json';
import en_view from '../locales/en/view.json'
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    zh: {
      view: {
        ...zh_view,
      }
    },
    en: {
      view: {
        ...en_view,
      }
    }
  },
  react: { 
    useSuspense: false //   <---- this will do the magic
  },
  ns: ['view'],
})
export  { i18n, I18nextProvider  }