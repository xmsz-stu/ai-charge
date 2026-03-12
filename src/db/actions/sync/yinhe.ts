export const yinheMapping: Record<string, string> = {
  "1": "4a43cc8d-5cda-4727-b0cc-179aa9331530",
  "3": "fc76a400-b1da-40e4-bd89-c309c6a5fa74",
  "12": "ffe02a2d-39e3-443f-8112-0bac0b8be67c"
};

/**
 * 银河录像局 (nf.video) 同步逻辑
 */
export async function syncYinhe(provider: any) {
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
