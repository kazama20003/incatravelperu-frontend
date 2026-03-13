export type PlausibleOptions = {
  props?: Record<string, string>
}

export type PlausibleFn = {
  (eventName?: string, options?: PlausibleOptions): void
  q?: IArguments[]
  o?: Record<string, unknown>
  init?: (options?: Record<string, unknown>) => void
}

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

export {}
