declare module 'js-cookie' {
    const cookies: {
      get: (name: string) => string | undefined;
      set: (name: string, value: string, options?: any) => void;
      remove: (name: string, options?: any) => void;
    };
  
    export = cookies;
  }