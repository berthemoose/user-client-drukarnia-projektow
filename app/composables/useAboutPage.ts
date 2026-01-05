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

  // State for persistent data across navigations
  const aboutPageData = useState<AboutPageData | null>('about-page-persistent-state', () => null);

  const { data: fetchedData, pending, error, refresh } = useFetch<AboutPageData>(
    `${cmsUrl}/globals/aboutPage?depth=1`,
    {
      key: 'about-page-data',
      server: true, // Crucial for SSR
    }
  );

  // Sync fetched data to persistent state
  if (fetchedData.value) {
    aboutPageData.value = fetchedData.value;
  }

  watch(fetchedData, (newVal) => {
    if (newVal) {
      aboutPageData.value = newVal;
    }
  });

  // Transform timeline items using the persistent state
  const transformedTimelineItems = computed(() => {
    if (!aboutPageData.value?.timelineSection?.items) return [];
    return aboutPageData.value.timelineSection.items.map((item, index) => {
      const { image, ...rest } = item;
      return {
        ...rest,
        imageUrl: image?.url || '',
        alignRight: index % 2 === 0
      };
    });
  });

  // Expose computed properties from the persistent state
  const ctaSection = computed(() => aboutPageData.value?.ctaSection);
  const topSection = computed(() => aboutPageData.value?.topSection);
  const timelineSection = computed(() => aboutPageData.value?.timelineSection);

  return {
    data: aboutPageData, // Expose persistent data as 'data'
    pending,
    error,
    transformedTimelineItems,
    ctaSection,
    topSection,
    timelineSection,
    refresh
  };
};
