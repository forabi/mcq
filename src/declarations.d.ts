declare module 'raw-loader!*' {
  const d: string;
  export = d;
}

declare module '*.svg' {
  type Symbol = { symbol: string; viewBox: string; content: string };
  const symbol: Symbol;
  export = symbol;
}
