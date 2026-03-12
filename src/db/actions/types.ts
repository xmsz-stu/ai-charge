import { services, providers, skus, intels } from '../schema';

export type Service = typeof services.$inferSelect & {
  startingPrice?: string | null;
  startingCurrency?: string | null;
};
export type Provider = typeof providers.$inferSelect;
export type Sku = typeof skus.$inferSelect;
export type Intel = typeof intels.$inferSelect;

export type SkuWithProvider = Sku & {
  provider: Provider;
};

export type ServiceWithSkus = Service & {
  skus: SkuWithProvider[];
};
