import type { Badge } from "../../types/badge";
import type { Image } from "../../types/image";
import type { Link } from "../../types/link";
import type { Links } from "../../types/links";
import type { PayloadBase } from "../../types/payload";

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
    id?: string;
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
  const landingPageData = useState<LandingPageData | null>('landing-page-persistent-state', () => null);

  const {data: fetchedData, pending, error, refresh} = useFetch<LandingPageData>(
    `${cmsUrl}/globals/landing-page`,
    {
      key: 'landing-page-data',
    }
  );

  if (fetchedData.value) {
    landingPageData.value = fetchedData.value;
  }

  watch(fetchedData, (newVal) => {
    if (newVal) {
      landingPageData.value = newVal;
    }
  });
  
  return {
    data: landingPageData,
    pending,
    error,
    refresh,
  };
};

