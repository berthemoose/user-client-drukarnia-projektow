import { ref, computed } from "vue";
import type { ProductSpec } from "./Product/useProduct";

interface SelectedModifier {
  specName: string;
  value: string;
}

export const usePriceCalculator = () => {
  const productSpecs = ref<Array<ProductSpec>>([]);
  const basePrice = ref<number>(0);

  const calculatePrice = (
    formValues: Record<string, any>,
    pages: number = 1,
    copies: number = 1
  ) => {
    let price = basePrice.value;
    
    /* Step 1: Apply regular additive modifiers (only if no matching conditional exists) */
    Object.entries(formValues).forEach(([specName, value]) => {
      const spec = productSpecs.value.find((s) => s.specName === specName);
      if (spec) {
        const specValue = spec.specValues.find((v) => v.name === value);
        if (specValue && specValue.priceModifier !== undefined) {
          // Check if there's a matching conditional modifier
          let hasMatchingConditional = false;
          if (specValue.conditionalModifiers && specValue.conditionalModifiers.length > 0) {
            const matchingCondition = specValue.conditionalModifiers.find(
              (condition) => {
                const dependencyValue = formValues[condition.dependsOn];
                return dependencyValue === condition.whenValue;
              }
            );
            if (matchingCondition && matchingCondition.priceModifier !== undefined) {
              hasMatchingConditional = true;
            }
          }
          
          // Only apply regular modifier if no conditional matched
          if (!hasMatchingConditional) {
            price += specValue.priceModifier;
          }
        }
      }
    });

    /* Step 2: Apply regular multipliers (affects base + regular additives only) */
    Object.entries(formValues).forEach(([specName, value]) => {
      const spec = productSpecs.value.find((s) => s.specName === specName);
      if (spec) {
        const specValue = spec.specValues.find((v) => v.name === value);
        if (specValue && specValue.priceMultiplier !== undefined) {
          price *= specValue.priceMultiplier;
        }
      }
    });

    /* Step 3: Apply conditional additive modifiers (AFTER multipliers) */ 
    Object.entries(formValues).forEach(([specName, value]) => {
      const spec = productSpecs.value.find((s) => s.specName === specName);
      if (spec) {
        const specValue = spec.specValues.find((v) => v.name === value);
        if (specValue && specValue.conditionalModifiers && specValue.conditionalModifiers.length > 0) {
          const matchingCondition = specValue.conditionalModifiers.find(
            (condition) => {
              const dependencyValue = formValues[condition.dependsOn];
              return dependencyValue === condition.whenValue;
            }
          );
          
          if (matchingCondition && matchingCondition.priceModifier !== undefined) {
            price += matchingCondition.priceModifier;
          }
        }
      }
    });

    /* Step 4: Apply conditional multipliers (AFTER conditional additives) */
    Object.entries(formValues).forEach(([specName, value]) => {
      const spec = productSpecs.value.find((s) => s.specName === specName);
      if (spec) {
        const specValue = spec.specValues.find((v) => v.name === value);
        if (specValue && specValue.conditionalModifiers && specValue.conditionalModifiers.length > 0) {
          const matchingCondition = specValue.conditionalModifiers.find(
            (condition) => {
              const dependencyValue = formValues[condition.dependsOn];
              return dependencyValue === condition.whenValue;
            }
          );
          
          if (matchingCondition && matchingCondition.priceMultiplier !== undefined) {
            price *= matchingCondition.priceMultiplier;
          }
        }
      }
    });

    price = price * pages * copies;
    return Math.round(price * 100) / 100;
  };

  const initializeProduct = (base: number, specs: Array<ProductSpec>) => {
    basePrice.value = base;
    productSpecs.value = specs;
  };

  return {
    calculatePrice,
    initializeProduct,
    basePrice,
    productSpecs,
  };
};
