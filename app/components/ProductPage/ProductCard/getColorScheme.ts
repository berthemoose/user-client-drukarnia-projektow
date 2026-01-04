export type ColorSchemeVariant = "base" | "thesis" 

export const getColorScheme = (variant: ColorSchemeVariant) => 
    variant === "base" ? { background: 'linear-gradient(45deg,#ffffff 0%,#ffffff 100%)' } :
    variant === "thesis" ? { background: 'linear-gradient(135deg, #6b1f3a 0%, #8b2f4a 50%, #6b1f3a 100%)' } :
    undefined;