// src/app/types/index.d.ts

/// <reference types="vite/client" />

// 🏗️ Environment variables available at build time
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_DEFAULT_THEME?: "light" | "dark";
  // Add any other env variables used in your app
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 🧩 Global interfaces (common to many features)
declare namespace App {
  type ID = string | number;

  interface BaseEntity {
    id: ID;
    createdAt?: string;
    updatedAt?: string;
  }

  interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
  }
}
