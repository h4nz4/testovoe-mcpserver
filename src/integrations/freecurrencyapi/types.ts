export interface FreeCurrencyApiRatesResponseMeta {
  last_updated_at: Date;
}
export interface FreeCurrencyApiRatesResponseData {
  // Основные мировые валюты
  USD: number; // Доллар США
  EUR: number; // Евро
  JPY: number; // Японская иена
  GBP: number; // Британский фунт стерлингов
  AUD: number; // Австралийский доллар
  CAD: number; // Канадский доллар
  CHF: number; // Швейцарский франк
  CNY: number; // Китайский юань
  HKD: number; // Гонконгский доллар
  NZD: number; // Новозеландский доллар

  // Другие основные валюты
  SGD: number; // Сингапурский доллар
  SEK: number; // Шведская крона
  NOK: number; // Норвежская крона
  MXN: number; // Мексиканское песо
  INR: number; // Индийская рупия
  BRL: number; // Бразильский реал
  ZAR: number; // Южноафриканский рэнд
  RUB: number; // Российский рубль
  TRY: number; // Турецкая лира

  // Валюты Ближнего Востока
  AED: number; // Дирхам ОАЭ
  SAR: number; // Саудовский риял

  // Азиатские валюты
  KRW: number; // Южнокорейская вона
  THB: number; // Тайский бат
  MYR: number; // Малайзийский ринггит
  IDR: number; // Индонезийская рупия
  PHP: number; // Филиппинское песо
  TWD: number; // Новый тайваньский доллар

}
export interface FreeCurrencyApiRatesResponse {
  data: FreeCurrencyApiRatesResponseData;
  meta: FreeCurrencyApiRatesResponseMeta;
}