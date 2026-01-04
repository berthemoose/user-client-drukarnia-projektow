export interface Link {
  label?: string;
  // Backend fields
  type?: "reference" | "custom";
  reference?: string; // Used when type is "reference" - page slug
  url?: string; // Used when type is "custom" - external URL
  // Legacy field for backward compatibility
  to?: string;
  // Button styling
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "black" | "primary" | "white";
  variant?: "solid" | "outline" | "soft" | "ghost";
  icon?: string;
  iconPosition?: "right" | "left";
  iconMovementDirection?: "up" | "down" | "right" | "left";
  isHidden?: boolean;
  isDisabled?: boolean;
  appearance?: "simple-button" | "default" | "special-button";
}