import { parse } from 'node-html-parser';

export const ipinpinMapping: Record<string, string> = {
  "22": "a22407a3-6224-4c12-89fa-e2b7a3efe28a",
  "29": "92205d53-c241-4cc6-b2cc-f27bb625d1c0"
};

/** 
 * 爱拼拼 (ipinpin.store) 同步逻辑
 */
export async function syncIpinpin(provider: any) {
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
