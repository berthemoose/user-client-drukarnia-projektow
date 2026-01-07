// Extend Window interface for grecaptcha types
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

// Extend NuxtApp interface to add $recaptcha type
declare module '#app' {
  interface NuxtApp {
    $recaptcha: (action: string) => Promise<string>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $recaptcha: (action: string) => Promise<string>
  }
}

// 
// FIX FIX FIX FIX !!!!!!!!!!!!!!!!!!!!!
// SECURITY WARNING: siteKey is exposed here!
// JUST FOR DEBUGGING!!!
// 

import type { RuntimeConfig } from "~/app/types/api"

export default defineNuxtPlugin(() => {
  // Get runtime config inside plugin context
  const config = useRuntimeConfig() as RuntimeConfig;
  
  
  /* TEMPORARILY EXPOSED!!! FIX!!! JUST FOR DEBUGGING!!! */
  const siteKey = "6LfN9NorAAAAACgvk4xQTBRWhb8JH7kuuPeTiG8a";

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;

  // Handle script load errors
  script.onerror = () => {
    console.error('Failed to load reCAPTCHA script. It may be blocked by an ad blocker or network issue.');
  };

  document.head.appendChild(script);

  // Inject helper
  return {
    provide: {
      recaptcha: (action: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          if (!window.grecaptcha) {
            return reject(
              new Error('reCAPTCHA not loaded. Please check your network connection or disable ad blockers.')
            );
          }

          try {
            window.grecaptcha.ready(() => {
              window.grecaptcha!.execute(siteKey, { action })
                .then(token => resolve(token))
                .catch(err => {
                  console.error('reCAPTCHA execution failed:', err);
                  reject(new Error(`reCAPTCHA execution failed: ${err.message || err}`));
                });
            });
          } catch (err) {
            console.error('reCAPTCHA error:', err);
            reject(new Error(`reCAPTCHA error: ${err instanceof Error ? err.message : String(err)}`));
          }
        });
      }
    }
  };
});