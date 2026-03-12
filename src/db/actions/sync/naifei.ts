export const naifeiMapping: Record<string, string> = {
  "1": "4fc9aeff-eb8b-4b9b-95be-6a390e42c975",
  "3": "73f77fed-c450-483e-b2a7-16efe85bdff1",
  "12": "fceb9116-821b-4371-9018-0bfa28f022ba"
};

/**
 * 星际放映厅 (naifeistation.com) 同步逻辑
 */
export async function syncNaifei(provider: any) {
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
