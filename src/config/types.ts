export type NotionUrls = typeof import('./urls').NOTION_URLS;
export type ApiUrls = typeof import('./urls').API_URLS;
export type AppConfig = typeof import('./constants').APP_CONFIG;
export type Categories = typeof import('./constants').CATEGORIES;
export type FormFields = typeof import('./constants').FORM_FIELDS;

export interface FormFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
}

// Re-export everything from a single file
export * from './urls';
export * from './constants';
