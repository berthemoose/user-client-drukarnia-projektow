import type { Meta } from "./meta";

export interface PayloadBase {
  globalType: string;
  createdAt: string;
  updatedAt: string;
  meta: Meta;
  id:string;
  _status: string;
  slug: string;
}