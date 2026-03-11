import { db } from './index';
import { services, providers, skus } from './schema';
import { eq, desc } from 'drizzle-orm';

// ——— Type Definitions —————————————————————————————————————

export type Service = typeof services.$inferSelect;
export type Provider = typeof providers.$inferSelect;
export type Sku = typeof skus.$inferSelect;

export type SkuWithProvider = Sku & {
  provider: Provider;
};

export type ServiceWithSkus = Service & {
  skus: SkuWithProvider[];
};

// ——— Query Functions ——————————————————————————————————————

/** 获取所有服务（用于首页服务列表） */
export async function getServices(): Promise<Service[]> {
  return db.select().from(services).orderBy(desc(services.createdAt));
}

/** 获取推荐服务（用于首页推荐卡片，取 rating 最高的 3 个） */
export async function getFeaturedServices(): Promise<Service[]> {
  return db.select().from(services).orderBy(desc(services.rating)).limit(3);
}

/** 按 slug 获取单个服务 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result[0] ?? null;
}

/** 获取某服务下的所有 SKU（含供应商信息，用于详情页供应商表格） */
export async function getSkusByServiceId(serviceId: string): Promise<SkuWithProvider[]> {
  const rows = await db
    .select()
    .from(skus)
    .leftJoin(providers, eq(skus.providerId, providers.id))
    .where(eq(skus.serviceId, serviceId))
    .orderBy(desc(providers.isTopPick));

  return rows.map((row) => ({
    ...row.skus,
    provider: row.providers!,
  }));
}

/** 获取所有 SKU 及关联的服务和供应商信息（用于管理后台表格） */
export async function getAllSkus() {
  const rows = await db
    .select({
      sku: skus,
      service: services,
      provider: providers,
    })
    .from(skus)
    .leftJoin(services, eq(skus.serviceId, services.id))
    .leftJoin(providers, eq(skus.providerId, providers.id))
    .orderBy(desc(skus.updatedAt));

  return rows.map((row) => ({
    ...row.sku,
    service: row.service!,
    provider: row.provider!,
  }));
}

export type AdminSku = Awaited<ReturnType<typeof getAllSkus>>[number];
