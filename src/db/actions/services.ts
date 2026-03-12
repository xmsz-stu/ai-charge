import { db } from '../index';
import { services, skus } from '../schema';
import { eq, desc, min } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { slugify } from '../../lib/utils';
import { type Service } from './types';

/** 获取所有服务（用于首页服务列表） */
export const getServices = createServerFn({ method: "GET" })
  .handler(async (): Promise<Service[]> => {
    const results = await db
      .select({
        service: services,
        minPrice: min(skus.price),
      })
      .from(services)
      .leftJoin(skus, eq(services.id, skus.serviceId))
      .groupBy(services.id)
      .orderBy(desc(services.createdAt));

    return results.map(r => ({
      ...r.service,
      startingPrice: r.minPrice,
    }));
  });

/** 获取推荐服务（取最近的 3 个） */
export const getFeaturedServices = createServerFn({ method: "GET" })
  .handler(async (): Promise<Service[]> => {
    const results = await db
      .select({
        service: services,
        minPrice: min(skus.price),
      })
      .from(services)
      .leftJoin(skus, eq(services.id, skus.serviceId))
      .groupBy(services.id)
      .orderBy(desc(services.createdAt))
      .limit(3);

    return results.map(r => ({
      ...r.service,
      startingPrice: r.minPrice,
    }));
  });

/** 按 ID 获取单个服务 */
export const getServiceById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }: { data: string }): Promise<Service | null> => {
    const result = await db
      .select({
        service: services,
        minPrice: min(skus.price),
      })
      .from(services)
      .leftJoin(skus, eq(services.id, skus.serviceId))
      .where(eq(services.id, id))
      .groupBy(services.id)
      .limit(1);

    if (result.length === 0) return null;
    
    return {
      ...result[0].service,
      startingPrice: result[0].minPrice,
    };
  });

/** 按 Slug 获取单个服务 */
export const getServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }: { data: string }): Promise<Service | null> => {
    const result = await db
      .select({
        service: services,
        minPrice: min(skus.price),
      })
      .from(services)
      .leftJoin(skus, eq(services.id, skus.serviceId))
      .where(eq(services.slug, slug))
      .groupBy(services.id)
      .limit(1);

    if (result.length === 0) return null;
    
    return {
      ...result[0].service,
      startingPrice: result[0].minPrice,
    };
  });

/** 获取所有服务简要信息（用于下拉选择） */
export const getServicesForSelect = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select({ id: services.id, title: services.title }).from(services).orderBy(services.title);
  });

/** 新增或更新服务 (Service) */
export const upsertService = createServerFn({ method: "POST" })
  .inputValidator((service: any) => service)
  .handler(async ({ data }: { data: any }) => {
    const { id, title, category, logoUrl, description } = data;
    
    const serviceData = {
      title,
      slug: slugify(title),
      category,
      logoUrl,
      description,
      updatedAt: new Date(),
    };

    if (id) {
      return db.update(services)
        .set(serviceData)
        .where(eq(services.id, id))
        .returning();
    } else {
      return db.insert(services)
        .values({
          ...serviceData,
          id: undefined,
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
