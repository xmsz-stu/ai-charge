import { pgTable, text, timestamp, uuid, numeric, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category").notNull(),
  logoUrl: text("logo_url"),
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
  promoCodes: jsonb("promo_codes").$type<{ code: string; description: string }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skus = pgTable("skus", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  providerId: uuid("provider_id").references(() => providers.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  discountLabel: text("discount_label"),
  billingCycle: text("billing_cycle").notNull(),
  features: text("features").array(),
  description: text("description"),
  stock: integer("stock").default(0),
  externalUrl: text("external_url"),
  
  // UI Fields
  topUpType: text("top_up_type").notNull().default("Proxy"),
  version: text("version").notNull().default("Plus"),
  processingFee: numeric("processing_fee", { precision: 5, scale: 2 }).default("0.00"),
  discount: numeric("discount", { precision: 5, scale: 2 }).default("0.00"),
  autoSync: boolean("auto_sync").default(true),
  currency: text("currency").default("USD"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

