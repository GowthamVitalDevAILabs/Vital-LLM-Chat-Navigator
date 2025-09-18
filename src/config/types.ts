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

// Profile types for user management
export interface UserProfile {
  id: string;
  username: string;
  updated_at?: string;
  avatar_url?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  profile?: UserProfile;
}

// Form types for authentication
export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  username: string;
  password: string;
}

// Re-export everything from a single file
export * from './urls';
export * from './constants';
