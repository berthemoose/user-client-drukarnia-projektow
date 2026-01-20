import * as yup from "yup";
import type { Specs } from "./index.vue";
type YupFields = Record<string, yup.StringSchema | yup.NumberSchema> & {
  copies: yup.NumberSchema;
  comments: yup.StringSchema;
};

export const getValidationSchema = (specs: Specs) => {
  const fields: YupFields = {
    copies: yup
      .number()
      .typeError("Nakład musi być numerem")
      .required("Proszę wprowadzić ilość kopii"),
    pages: yup
      .number()
      .typeError("Ilość stron musi być numerem")
      .required("Proszę wprowadzić ilość stron w jednej kopii dokumentu"),
    comments: yup.string().max(256, "Przekroczono dozwoloną ilość znaków"),
  };

  specs.value.forEach((spec) => {
    fields[spec.specName] = yup
      .string()
      .required(`${spec.specDisplayName} jest wymaganym polem.`);
  });

  return yup.object(fields);
};
