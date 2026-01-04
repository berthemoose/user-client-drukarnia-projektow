import type { Badge } from "~/app/types/badge";
import type { Image } from "~/app/types/image";
import type { Link } from "~/app/types/link";
import type { Links } from "~/app/types/links";
import type { PayloadBase } from "~/app/types/payload";

export interface LandingPageData extends PayloadBase {
  landingHero: string;
  landingHeroLinks: Links;
  heroBadge: Badge;
  servicesBadge: Badge;
  servicesCtaBadge: Badge;
  trustedUsBadge: Badge;
  conversionBadge: Badge;
  mapBadge: Badge;
  thesisBadge: Badge;
  trustedUsLinks: Links;
  heroSlider: Array<{
    photo: string;
    podpis: string;
    id: string;
  }>;

  konwersjaMarketingowaText: Array<LandingTitleStandard>;
  mapTexts: Array<LandingTitleStandard>;
  opinionsTexts: Array<LandingTitleStandard>;
  servicesText: Array<LandingTitleStandard>;
  zaufaliNamText: Array<LandingTitleStandard>;
  
  servicesLinks: Links;
  conversionLinks: Links;

  servicesSections: Array<{
    mediaType: string;
    serviceImg: Image;
    iconId: string;
    sectionHeader: string;
    sectionParagraph: string;
    id: string;
    link?: Link;
  }>;


  zaufaliNamLinks: Array<{
    firstLink?: Link;
    secondLink?: Link;
    id: string;
  }>;

  zaufaliNamLogos: Array<{
    logo: Image;
    id: string;
  }>;

  pracaDyplomowaText: Array<ThesisTexts>;
  thesisButtons: Links;

}

export interface ThesisTexts extends LandingTitleStandard {
  specPoints: Array<{
    specPoint: string;
    id: string;
  }>
  productBadge: string;
  bottomSpecs: {
    leftBottomSpec: {
      leftBottomSpecText: string;
      leftBottomSpecIcon: string;
    },
    rightBottomSpec: {
      rightBottomSpecText: string;
      rightBottomSpecIcon: string;
    },
    id? : string;
  }
}

export interface LandingTitleStandard {
  header: string | null;
  paragraph: string | null;
  strong: string | null;
  topLabel: string | null;
  id: string;
  ctaHeader?: string | null;
  ctaParagraph?: string | null;
}

export const useLandingPage = () => {
  const { cmsUrl } = useApi();
  const nuxtApp = useNuxtApp();

  // Use useFetch directly with caching and lazy loading
  const { data, pending, error, refresh } = useFetch<LandingPageData>(
    `${cmsUrl}/globals/landing-page`,
    {
      key: 'landing-page-data', // Unique cache key
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
  };
};
