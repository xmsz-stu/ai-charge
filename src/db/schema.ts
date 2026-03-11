import { pgTable, text, timestamp, uuid, numeric, integer, boolean } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  region: text("region").default("Global"),
  logoUrl: text("logo_url"),
  promo: boolean("promo").default(false),          // 首页推荐标记
  startingPrice: numeric("starting_price", { precision: 10, scale: 2 }), // 最低价格快照
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0.0"),  // 综合评分
  discountLabel: text("discount_label"),            // 例: "15% MAX"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const providers = pgTable("providers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  logoUrl: text("logo_url"),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  isPartner: boolean("is_partner").default(false),
  isTopPick: boolean("is_top_pick").default(false),  // 推荐供应商标记
  iconType: text("icon_type").default("rocket"),      // "rocket" | "zap"
  paymentMethods: text("payment_methods").array(),    // ["visa", "crypto", "paypal"]
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skus = pgTable("skus", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  providerId: uuid("provider_id").references(() => providers.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  discountLabel: text("discount_label"),
  billingCycle: text("billing_cycle").notNull(),
  features: text("features").array(),
  externalUrl: text("external_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

