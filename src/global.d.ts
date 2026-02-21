// type global for structuredClone for both web and node
declare function structuredClone<T = any>(value: T, options?: { transfer?: any[] }): T;
interface Console {
  log(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
}

declare var console: Console;
