import { db } from '../index';
import { providers, skus } from '../schema';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { syncIpinpin, ipinpinMapping } from './sync/ipinpin';
import { syncNaifei, naifeiMapping } from './sync/naifei';
import { syncYinhe, yinheMapping } from './sync/yinhe';
import { syncGamsgo, gamsgoMapping } from './sync/gamsgo';

/** 手动触发供应商同步 */
export const triggerProviderSync = createServerFn({ method: "POST" })
  .inputValidator((providerId: string) => providerId)
  .handler(async ({ data: providerId }: { data: string }) => {
    const provider = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    });

    if (!provider) throw new Error("Provider not found");

    // 根据提供商分发同步逻辑
    let syncData: any = null;
    let skuMapping: Record<string, string> = {};

    if (provider.name.includes("爱拼拼") || provider.url.includes("ipinpin.store")) {
      syncData = await syncIpinpin(provider);
      skuMapping = ipinpinMapping;
    } else if (provider.name.toLowerCase().includes("gamsgo") || provider.url.includes("gamsgo.com")) {
      syncData = await syncGamsgo(provider);
      skuMapping = gamsgoMapping;
    } else if (provider.name.includes("星际放映厅") || provider.url.includes("naifeistation.com")) {
      syncData = await syncNaifei(provider);
      skuMapping = naifeiMapping;
    } else if (provider.name.includes("银河录像局") || provider.url.includes("nf.video")) {
      syncData = await syncYinhe(provider);
      skuMapping = yinheMapping;
    }

    if (syncData && syncData.success && syncData.results) {
      for (const item of syncData.results) {
        const targetId = skuMapping[item.providerSkuId];
        if (targetId) {
          await db.update(skus)
            .set({
              name: item.name,
              price: item.price,
              features: item.features,
              description: item.description,
              stock: item.stock,
              externalUrl: item.externalUrl,
              topUpType: item.topUpType,
              currency: item.currency,
              updatedAt: new Date()
            })
            .where(eq(skus.id, targetId));
        }
      }
      return syncData;
    }

    return {
      success: false,
      message: "Sync logic not implemented for this provider."
    };
  });
