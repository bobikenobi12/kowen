declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

interface CSSModulesOptions {
  scopeBehaviour?: "global" | "local";
  globalModulePaths?: RegExp[];
  generateScopedName?:
    | string
    | ((name: string, filename: string, css: string) => string);
  hashPrefix?: string;
  /**
   * default: null
   */
  localsConvention?:
    | "camelCase"
    | "camelCaseOnly"
    | "dashes"
    | "dashesOnly"
    | null;
}
