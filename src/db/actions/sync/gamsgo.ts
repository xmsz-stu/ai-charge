
/**
 * GamsGo 渠道同步逻辑
 */

// 映射 Plan ID 到系统内部的 SKU ID
export const gamsgoMapping: Record<string, string> = {
  "475": "6d6ccf2b-904a-4309-a885-a286bf5b019a", // 1个月
  "478": "708cdb48-f5ff-4f4c-8763-00545480eb46", // 3个月
  "476": "a89ea7ea-ccbb-41d4-afef-b34549f0d48f", // 6个月
};

export async function syncGamsgo(provider: any) {
  const planIds = Object.keys(gamsgoMapping); 
  const results: any[] = [];

  for (const planId of planIds) {
    try {
      const response = await fetch("https://api.gamsgo2.com/payment/calculate", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "referrer": "https://www.gamsgo.com/",
        },
        body: JSON.stringify({
          language: "zh",
          user_coupon_id: null,
          type_promo_code_id: null,
          renew_type: 1,
          type_plan_id: parseInt(planId),
          type: 1
        })
      });

      const json = await response.json();

      if (json.code === 0 && json.data) {
        const data = json.data;
        results.push({
          providerSkuId: planId,
          externalUrl: `https://www.gamsgo.com/`, 
          name: `ChatGPT Plus (${data.month}个月)`, 
          price: data.total_price,
          billingCycle: `${data.month} Month(s)`,
          stock: 999, 
          topUpType: "Proxy",
          currency: data.currency || 'USD',
        });
      }
    } catch (error) {
      console.error(`Failed to sync GamsGo plan ${planId}:`, error);
    }
  }

  return {
    success: true,
    provider: provider?.name || "GamsGo",
    results
  };
}
