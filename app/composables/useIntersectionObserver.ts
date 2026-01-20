import { onMounted, onUnmounted, type Ref } from 'vue';

type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

const callbacks = new WeakMap<Element, IntersectionCallback>();
let observer: IntersectionObserver | null = null;

// Only create the observer if running in the browser and the API exists.
if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const callback = callbacks.get(entry.target);
        if (callback) {
          callback(entry);
        }
      });
    },
    { threshold: 0.1 }
  );
} else {
  // Fallback for server-side or environments without IntersectionObserver
  observer = {
    observe: () => {},
    unobserve: () => {},
    disconnect: () => {},
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => []
  } as unknown as IntersectionObserver;
}

/**
 * Composable that provides intersection observer functionality
 * @param elementRef - A Vue ref to the element to be observed
 * @param callback - A callback function that receives the IntersectionObserverEntry
 */
export function useIntersectionObserver(
  elementRef: Ref<HTMLElement | null | undefined>,
  callback: IntersectionCallback
): void {
  onMounted(() => {
    if (elementRef.value && observer) {
      callbacks.set(elementRef.value, callback);
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (elementRef.value && observer) {
      observer.unobserve(elementRef.value);
      callbacks.delete(elementRef.value);
    }
  });
}
