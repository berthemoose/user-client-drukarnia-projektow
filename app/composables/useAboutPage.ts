import { ref, computed } from 'vue';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  alignRight?: boolean;
  image?: {
    url: string;
    alt?: string;
  };
}

export interface CtaButton {
  label: string;
  url: string;
}

export interface CtaSection {
  header?: string;
  paragraph?: string;
  content?: string;
  primaryButton?: {
    label: string;
    url: string;
  };
  secondaryButton?: {
    label: string;
    url: string;
  };
  phoneNumber?: string;
}

export interface TopSection {
  header?: string;
  paragraph?: string;
  subHeader?: string;
  subParagraph?: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
}

export interface AboutPageData {
  topSection?: TopSection;
  timelineSection?: {
    items: TimelineItem[];
  };
  ctaSection?: CtaSection;
}

export const useAboutPage = () => {
  const { cmsUrl } = useApi();
  const nuxtApp = useNuxtApp();

  // Use useFetch directly
  const { data, pending, error, refresh } = useFetch<AboutPageData>(
    `${cmsUrl}/globals/aboutPage?depth=1`,
    {
      key: 'about-page-data', // Unique cache key
      server: true, // Enable SSR
    }
  );


  // Transform timeline items to match the TimelineComponent's expected format
  const transformedTimelineItems = computed(() => {
    if (!data.value?.timelineSection?.items) return [];
    return data.value.timelineSection.items.map((item, index) => {
      // Create a new object with only the properties we want to keep
      const { image, ...rest } = item;
      return {
        ...rest,
        imageUrl: image?.url || '',
        alignRight: index % 2 === 0
      };
    });
  });

  // Expose computed properties for easier access
  const ctaSection = computed(() => data.value?.ctaSection);
  const topSection = computed(() => data.value?.topSection);
  const timelineSection = computed(() => data.value?.timelineSection);

  return {
    data,
    pending,
    error,
    transformedTimelineItems,
    ctaSection,
    topSection,
    timelineSection,
    refresh
  };
};
