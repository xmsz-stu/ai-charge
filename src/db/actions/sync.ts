import { db } from '../index';
import { providers, skus } from '../schema';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { parse } from 'node-html-parser';

/** 
 * 爱拼拼 (ipinpin.store) 同步逻辑
 */
async function syncIpinpin(provider: any) {
  const targetUrl = "https://ipinpin.store/product/topup-chatgpt-plus/v2/";
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await response.text();
  const root = parse(html);
  
  const container = root.querySelector(".product-card-container");
  const results: any[] = [];

  if (container) {
    const productInfoRaw = container.getAttribute('data-product-info');
    if (productInfoRaw) {
      try {
        const productInfo = JSON.parse(productInfoRaw);
        const skusList = productInfo.skus || [];
        
          skusList.forEach((sku: any) => {
            const productId = productInfo.product_id;
            const checkoutUrl = `https://ipinpin.store/checkout/?product_id=${productId}&sku_id=${sku.sku_id}&v2=1&step=2`;
            
            results.push({
              providerSkuId: sku.sku_id,
              externalUrl: checkoutUrl,
              name: sku.sku_recharge_item || sku.sku_type || sku.sku_name,
              price: sku.sku_price,
              billingCycle: sku.sku_duration || `${sku.sku_months} Month(s)`,
              features: sku.sku_attrs ? sku.sku_attrs.map((attr: any) => attr.value) : [],
              description: sku.sku_detail_html || sku.sku_v2_detail,
              stock: parseInt(sku.sku_stock) || 0,
              topUpType: sku.sku_type.includes("代充") ? "Proxy" : "Direct",
              currency: 'CNY',

            });
          });
      } catch (e) {
        console.error('Failed to parse data-product-info:', e);
      }
    }
  }

  return {
    success: true,
    provider: provider.name,
    results
  };
}

/** 手动触发供应商同步 */
export const triggerProviderSync = createServerFn({ method: "POST" })
  .inputValidator((providerId: string) => providerId)
  .handler(async ({ data: providerId }: { data: string }) => {
    const provider = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    });

    if (!provider) throw new Error("Provider not found");

    // 根据提供商分发同步逻辑
    if (provider.name.includes("爱拼拼") || provider.url.includes("ipinpin.store")) {
      const syncData = await syncIpinpin(provider);
      
      if (syncData.success && syncData.results) {
        // 对照表：外部 ID -> 系统 SKU ID
        const skuMapping: Record<string, string> = {
          "22": "a22407a3-6224-4c12-89fa-e2b7a3efe28a",
          "29": "92205d53-c241-4cc6-b2cc-f27bb625d1c0"
        };

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
      }

      return syncData;
    }

    return {
      success: false,
      message: "Sync logic not implemented for this provider."
    };
  });
