// Site.
export interface SiteInterface extends ElementInterface {
  author: AuthorInterface;
  links: LinkInterface[];
  contact: ElementInterface;
  filters: ElementInterface;
  events: EventInterface[];
  news: NewsInterface[];
  partners: PartnerInterface[];
  countries: CountryInterface[];
  brands: BrandInterface[];
  settings: SettingsInterface;
}

// Author.
export interface AuthorInterface {
  title: string;
  link: LinkInterface;
}

// Event.
export interface EventInterface extends ElementInterface {
  type: string;
  timeStamp: string;
  timeZone: string;
  duration?: number;
  country: string;
  location: string;
  phone?: string;
  brand?: string;
  number?: string;
  fleet?: string;
  seat?: string;
  links?: LinkInterface[];
}

// News.
export interface NewsInterface {
  timeStampStart: string;
  timeStampEnd: string;
  timeZone?: string;
  city?: string;
  title: string;
  formattedTitle?: string;
}

// Partner.
export interface PartnerInterface extends ElementInterface {
  id: string;
  link: LinkInterface;
}

// Country.
export interface CountryInterface {
  id: string;
  title: string;
}

// Brand.
export interface BrandInterface {
  id: string;
  title: string;
  image: ImageInterface;
}

// Link.
export interface LinkInterface {
  id?: string;
  title: string;
  description?: string[];
  path: string;
  target?: string;
}

// Image.
export interface ImageInterface {
  path: string;
  width: number;
  height: number;
}

// Element.
export interface ElementInterface {
  title: string;
  description: string[];
}

// Settings.
export interface SettingsInterface {
  currentDate: string | null;
  events: string;
  eventNote: string;
  eventTotal: string;
  close: string;
}

// Weather.
export interface WeatherInterface {
  city: string;
  region: string;
  country: string;
  conditionText: string;
  conditionCode: number;
  isDay: boolean;
  celsius: number;
  fahrenheit: number;
}

// Condition.
export interface ConditionInterface {
  code: number;
  day: ConditionInfoInterface;
  night: ConditionInfoInterface;
}

// Condition info.
export interface ConditionInfoInterface {
  fr: string;
  en: string;
  text: string;
}

// Weather API.
export interface WeatherApi {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
}

// Weather API / location.
export interface WeatherApiLocation {
  name: string;
  region: string;
  country: string;
}

// Weather API / current.
export interface WeatherApiCurrent {
  condition: WeatherApiCurrentCondition;
  is_day: number;
  temp_c: number;
  temp_f: number;
}

// Weather API / current / condition.
export interface WeatherApiCurrentCondition {
  text: string;
  code: number;
}
