import { db } from '../index';
import { providers } from '../schema';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { parse } from 'node-html-parser';

/** 手动触发供应商同步 */
export const triggerProviderSync = createServerFn({ method: "POST" })
  .inputValidator((providerId: string) => providerId)
  .handler(async ({ data: providerId }: { data: string }) => {
    const provider = await db.query.providers.findFirst({
      where: eq(providers.id, providerId)
    });

    if (!provider) throw new Error("Provider not found");

    if (provider.name.includes("爱拼拼") || provider.url.includes("ipinpin.store")) {
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
              results.push({
                skuId: sku.sku_id,
                rechargeItem: sku.sku_type || sku.sku_name,
                subtitle: sku.sku_subtitle,
                label: sku.sku_duration_label,
                price: sku.sku_price,
                currency: 'CNY',
                originalPrice: `¥${sku.sku_price}`
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

    return {
      success: false,
      message: "Sync logic not implemented for this provider."
    };
  });
