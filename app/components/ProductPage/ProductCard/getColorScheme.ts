export type ColorSchemeVariant = "base" | "thesis" 

export const getColorScheme = (variant: ColorSchemeVariant) => 
    variant === "base" ? { background: 'linear-gradient(45deg,#ffffff 0%,#ffffff 100%)' } :
    variant === "thesis" ? { background: 'linear-gradient(135deg, #152845 0%, #2f4d7a 50%, #152845 100%)' } :
    undefined;