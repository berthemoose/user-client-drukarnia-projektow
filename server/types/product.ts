export interface ConditionalModifier {
  dependsOn: string;
  whenValue: string;
  priceModifier?: number;
  priceMultiplier?: number;
}

export interface SpecValue {
  name: string;
  desc: string;
  priceModifier?: number;
  priceMultiplier?: number;
  conditionalModifiers?: Array<ConditionalModifier>;
}

export interface ProductSpec {
  specName: string;
  specValues: SpecValue[];
}
