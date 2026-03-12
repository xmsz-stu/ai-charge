import { db } from '../index';
import { providers } from '../schema';
import { eq, desc } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { type Provider } from './types';

/** 获取所有供应商详细信息（用于管理后台列表） */
export const getAllProviders = createServerFn({ method: "GET" })
  .handler(async (): Promise<Provider[]> => {
    return db.select().from(providers).orderBy(desc(providers.createdAt));
  });

/** 获取所有供应商简要信息（用于下拉选择） */
export const getProvidersForSelect = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select({ id: providers.id, name: providers.name }).from(providers).orderBy(providers.name);
  });

/** 新增或更新供应商 (Provider) */
export const upsertProvider = createServerFn({ method: "POST" })
  .inputValidator((provider: any) => provider)
  .handler(async ({ data }: { data: any }) => {
    const { id, name, url, logoUrl, rating, reviewCount, isPartner, isTopPick, iconType, paymentMethods } = data;
    
    const providerData = {
      name,
      url,
      logoUrl,
      rating: (rating || 0).toString(),
      reviewCount: parseInt(reviewCount) || 0,
      isPartner: isPartner ?? false,
      isTopPick: isTopPick ?? false,
      iconType: iconType || "rocket",
      paymentMethods: paymentMethods || [],
    };

    if (id) {
      return db.update(providers)
        .set(providerData)
        .where(eq(providers.id, id))
        .returning();
    } else {
      return db.insert(providers)
        .values({
          ...providerData,
          id: undefined,
        })
        .returning();
    }
  });

/** 删除供应商 (Provider) */
export const deleteProvider = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }: { data: string }) => {
    return db.delete(providers).where(eq(providers.id, id)).returning();
  });
