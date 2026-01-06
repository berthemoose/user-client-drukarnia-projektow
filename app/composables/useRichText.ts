import { ref, onMounted } from 'vue';

// Import DOMPurify only on client-side
let DOMPurify: any;

// Configuration for allowed tags and attributes
const DEFAULT_CONFIG = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'b', 'i', 'u', 'em', 'strong', 'sub', 'sup',
    'ul', 'ol', 'li', 'a', 'span', 'div', 'blockquote',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'hr', 'pre', 'code'
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'target', 'rel', 'class', 'style',
    'src', 'alt', 'width', 'height', 'border', 'colspan', 'rowspan'
  ],
  FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style']
};

// Initialize DOMPurify once
const initDOMPurify = async () => {
  if (!process.client) return null;

  try {
    const dompurify = await import('dompurify');
    return dompurify.default;
  } catch (err) {
    console.error('Failed to load DOMPurify:', err);
    return null;
  }
};

// Initialize DOMPurify immediately
const domPurifyPromise = initDOMPurify();

/**
 * Composable for safely rendering HTML content using DOMPurify
 * @param config Optional custom configuration for DOMPurify
 * @returns Object containing sanitize function
 */
export const useRichText = (config = {}) => {
  const isReady = ref(false);
  const error = ref<Error | null>(null);

  // Initialize DOMPurify on client side only
  onMounted(async () => {
    if (process.client) {
      try {
        DOMPurify = await domPurifyPromise;
        isReady.value = true;
      } catch (err) {
        error.value = err as Error;
        console.error('Failed to initialize DOMPurify:', err);
      }
    }
  });

  /**
   * Sanitize HTML string
   * @param dirtyHtml Raw HTML string to sanitize
   * @returns Sanitized HTML string safe for v-html
   */
  const sanitize = (dirtyHtml: string): string => {
    if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';
    if (!isReady.value || !DOMPurify) return dirtyHtml; // Return as is if not ready

    try {
      const sanitized = DOMPurify.sanitize(dirtyHtml, {
        ...DEFAULT_CONFIG,
        ...config,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        RETURN_DOM_IMPORT: false,
        ADD_ATTR: ['target', 'rel'],
        ADD_URI_SAFE_ATTR: ['target', 'rel'],
        WHOLE_DOCUMENT: false,
        SANITIZE_DOM: false,
        KEEP_CONTENT: true
      });

      return sanitized || '';
    } catch (err) {
      console.error('Error sanitizing HTML:', err, dirtyHtml);
      return '';
    }
  };

  return {
    sanitize,
    isReady,
    error
  };
};