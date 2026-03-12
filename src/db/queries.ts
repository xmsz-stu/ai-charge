import { db } from './index';
import { services, providers, skus } from './schema';
import { eq, desc } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';

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
export const getServices = createServerFn({ method: "GET" })
  .handler(async (): Promise<Service[]> => {
    return db.select().from(services).orderBy(desc(services.createdAt));
  });

/** 获取推荐服务（取最近的 3 个） */
export const getFeaturedServices = createServerFn({ method: "GET" })
  .handler(async (): Promise<Service[]> => {
    return db.select().from(services).orderBy(desc(services.createdAt)).limit(3);
  });

/** 按 ID 获取单个服务 */
export const getServiceById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }: { data: string }): Promise<Service | null> => {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0] ?? null;
  });

/** 获取某服务下的所有 SKU（含供应商信息，用于详情页供应商表格） */
export const getSkusByServiceId = createServerFn({ method: "GET" })
  .inputValidator((serviceId: string) => serviceId)
  .handler(async ({ data: serviceId }: { data: string }): Promise<SkuWithProvider[]> => {
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
  });

/** 获取所有 SKU 及关联的服务和供应商信息（用于管理后台表格） */
export const getAllSkus = createServerFn({ method: "GET" })
  .handler(async () => {
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
  });

export type AdminSku = Awaited<ReturnType<typeof getAllSkus>>[number];

/** 获取所有服务简要信息（用于下拉选择） */
export const getServicesForSelect = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select({ id: services.id, title: services.title }).from(services).orderBy(services.title);
  });

/** 获取所有供应商简要信息（用于下拉选择） */
export const getProvidersForSelect = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select({ id: providers.id, name: providers.name }).from(providers).orderBy(providers.name);
  });

/** 新增或更新 SKU */
export const upsertSku = createServerFn({ method: "POST" })
  .inputValidator((sku: any) => sku)
  .handler(async ({ data }: { data: any }) => {
    const { id, serviceId, providerId, topUpType, version, billingCycle, basePrice, currency, processingFee, discount, autoSync } = data;
    
    // 构造 SKU 数据
    const skuData = {
      serviceId,
      providerId,
      name: `${version} / ${topUpType}`, // 暂时合成一个名称
      price: basePrice.toString(),
      billingCycle,
      topUpType,
      version,
      processingFee: processingFee.toString(),
      discount: discount.toString(),
      autoSync,
      currency,
      updatedAt: new Date(),
    };

    if (id) {
      // 更新
      return db.update(skus)
        .set(skuData)
        .where(eq(skus.id, id))
        .returning();
    } else {
      // 新增
      return db.insert(skus)
        .values({
          ...skuData,
          id: undefined, // 让数据库生成 UUID
        })
        .returning();
    }
  });

/** 新增或更新服务 (Service) */
export const upsertService = createServerFn({ method: "POST" })
  .inputValidator((service: any) => service)
  .handler(async ({ data }: { data: any }) => {
    const { id, title, category, logoUrl, description } = data;
    
    const serviceData = {
      title,
      category,
      logoUrl,
      description,
      updatedAt: new Date(),
    };

    if (id) {
      // 更新
      return db.update(services)
        .set(serviceData)
        .where(eq(services.id, id))
        .returning();
    } else {
      // 新增
      return db.insert(services)
        .values({
          ...serviceData,
          id: undefined, // 让数据库生成 UUID
        })
        .returning();
    }
  });

/** 删除服务 (Service) */
export const deleteService = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }: { data: string }) => {
    return db.delete(services).where(eq(services.id, id)).returning();
  });
