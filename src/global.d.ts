// type global for structuredClone for both web and node
declare function structuredClone<T = any>(value: T, options?: { transfer?: any[] }): T;
