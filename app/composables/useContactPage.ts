import { ref, computed } from "vue";

export type ServiceCard = {
  header: string;
  paragraph: string;
  icon: string;
  id?: string;
};

export type TeamMember = {
  name: string;
  position: string;
  description?: string;
  email: string;  
  phoneNumber: string;
  photo: string | { url?: string };
  id?: string;
};

export type ContactPageData = {
  oferta?: {
    title?: string;
    description?: string;
    cards?: ServiceCard[];
  };
  zespol?: {
    title?: string;
    description?: string;
    cards?: TeamMember[];
  };
  cta?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonEmail?: string;
  };
};

export const useContactPage = () => {
  const { cmsUrl } = useApi();
  const nuxtApp = useNuxtApp();

  // Use useFetch directly with caching and lazy loading
  const { data, pending, error, refresh } = useFetch<ContactPageData>(
    `${cmsUrl}/globals/contactPage`,
    {
      key: 'contact-page-data', // Unique cache key
      lazy: true, // Don't block navigation
      server: true, // Enable SSR
      // Cache data for 5 minutes (300000ms)
      getCachedData(key) {
        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        // Return cached data if it exists and is less than 5 minutes old
        if (data && Date.now() - (data as any)._fetchedAt < 300000) {
          return data;
        }
      },
      // Add timestamp for cache validation
      transform: (data) => {
        return {
          ...data,
          _fetchedAt: Date.now(),
        };
      },
    }
  );

  return {
    data,
    pending,
    error,
    refresh,
    // Add helper getters for easier access in components
    oferta: computed(() => data.value?.oferta || { title: "", description: "", cards: [] }),
    zespol: computed(() => data.value?.zespol || { title: "", description: "", cards: [] }),
    cta: computed(() => data.value?.cta || { title: "", description: "", buttonLabel: "", buttonEmail: "" }),
  };
};
