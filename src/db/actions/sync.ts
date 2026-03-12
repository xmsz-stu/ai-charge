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

/**
 * 星际放映厅 (naifeistation.com) 同步逻辑
 */
async function syncNaifei(provider: any) {
  const targetUrl = "https://www.naifeistation.com/index/getGoods?id=241";
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const json = await response.json();
  const results: any[] = [];

  if (json.code === 1 && json.data && json.data.specification) {
    const goodsId = json.data.id;
    json.data.specification.forEach((spec: any) => {
      results.push({
        providerSkuId: spec.time.toString(),
        externalUrl: `https://www.naifeistation.com/index/buy?id=${goodsId}`,
        name: spec.notify || spec.name,
        price: spec.price,
        billingCycle: `${spec.time} Month(s)`,
        features: spec.remark ? [spec.remark] : [],
        description: json.data.content,
        stock: 999,
        topUpType: "Proxy",
        currency: 'CNY',
      });
    });
  }

  return {
    success: true,
    provider: provider.name,
    results
  };
}

/**
 * 银河录像局 (nf.video) 同步逻辑
 */
async function syncYinhe(provider: any) {
  const targetUrl = "https://nf.video/8081/api/applets/goods/get/40?isLogin=false&dsCode=";
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const json = await response.json();
  const results: any[] = [];

  if (json.code === 10000 && json.data && json.data.skuList) {
    const goodsId = json.data.id;
    json.data.skuList.forEach((sku: any) => {
      // 价格单位是分，需要转换为元
      const price = (parseInt(sku.price) / 100).toFixed(2);
      
      results.push({
        providerSkuId: sku.months.toString(),
        externalUrl: `https://nf.video/8081/web/product/${goodsId}`,
        name: sku.subTitle || sku.specVal,
        price,
        billingCycle: `${sku.months} Month(s)`,
        features: sku.smallMsg ? [sku.smallMsg] : [],
        description: json.data.buyDesc,
        stock: sku.status ? 999 : 0,
        topUpType: "Proxy",
        currency: 'CNY',
      });
    });
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
    let syncData: any = null;
    let skuMapping: Record<string, string> = {};

    if (provider.name.includes("爱拼拼") || provider.url.includes("ipinpin.store")) {
      syncData = await syncIpinpin(provider);
      skuMapping = {
        "22": "a22407a3-6224-4c12-89fa-e2b7a3efe28a",
        "29": "92205d53-c241-4cc6-b2cc-f27bb625d1c0"
      };
    } else if (provider.name.includes("星际放映厅") || provider.url.includes("naifeistation.com")) {
      syncData = await syncNaifei(provider);
      skuMapping = {
        "1": "4fc9aeff-eb8b-4b9b-95be-6a390e42c975",
        "3": "73f77fed-c450-483e-b2a7-16efe85bdff1",
        "12": "fceb9116-821b-4371-9018-0bfa28f022ba"
      };
    } else if (provider.name.includes("银河录像局") || provider.url.includes("nf.video")) {
      syncData = await syncYinhe(provider);
      skuMapping = {
        "1": "4a43cc8d-5cda-4727-b0cc-179aa9331530",
        "3": "fc76a400-b1da-40e4-bd89-c309c6a5fa74",
        "12": "ffe02a2d-39e3-443f-8112-0bac0b8be67c"
      };
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
