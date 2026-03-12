import { db } from '../index';
import { services, providers, skus } from '../schema';
import { eq, desc } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { type SkuWithProvider } from './types';

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

/** 新增或更新 SKU */
export const upsertSku = createServerFn({ method: "POST" })
  .inputValidator((sku: any) => sku)
  .handler(async ({ data }: { data: any }) => {
    const { id, serviceId, providerId, topUpType, version, billingCycle, basePrice, currency, processingFee, discount, autoSync } = data;
    
    // 构造 SKU 数据
    const skuData = {
      serviceId,
      providerId,
      name: `${version} / ${topUpType}`,
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
      return db.update(skus)
        .set(skuData)
        .where(eq(skus.id, id))
        .returning();
    } else {
      return db.insert(skus)
        .values({
          ...skuData,
          id: undefined,
        })
        .returning();
    }
  });
