export interface ProcessedLink {
  label: string;
  to: string | undefined;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color: 'black' | 'primary' | 'white';
  variant: 'solid' | 'outline' | 'soft' | 'ghost';
  icon: string;
  iconPosition?: 'right' | 'left';
  iconMovementDirection?: 'up' | 'down' | 'right' | 'left';
  isHidden: boolean;
  isDisabled: boolean;
  appearance: 'simple-button' | 'default' | 'special-button';
  id: string;
}

interface LinkItem {
  link: {
    type: string;
    reference?: string;
    url?: string;
    label: string;
    isDisabled: boolean;
    isHidden: boolean;
    appearance: string;
    size: string;
    color: string;
    variant: string;
    icon?: string;
    iconPosition?: string;
    iconMovementDirection?: string;
  };
  id: string;
}

export const useProcessLinks = (links: LinkItem[]): ProcessedLink[] => {
  return links.map((item) => ({
    label: item.link.label,
    to: item.link.type === 'reference' ? item.link.reference : item.link.url,
    size: item.link.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    color: item.link.color as 'black' | 'primary' | 'white',
    variant: item.link.variant as 'solid' | 'outline' | 'soft' | 'ghost',
    icon: item.link.icon || '',
    iconPosition: item.link.iconPosition as 'right' | 'left' | undefined,
    iconMovementDirection: item.link.iconMovementDirection as 'up' | 'down' | 'right' | 'left' | undefined,
    isHidden: item.link.isHidden,
    isDisabled: item.link.isDisabled,
    appearance: item.link.appearance as 'simple-button' | 'default' | 'special-button',
    id: item.id,
  }));
};
