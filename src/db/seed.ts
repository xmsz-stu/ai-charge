import 'dotenv/config';
import { db } from './index';
import { services, providers, skus } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data (order matters: skus ref providers & services)
  await db.delete(skus);
  await db.delete(providers);
  await db.delete(services);

  // 2. Insert Services
  const insertedServices = await db.insert(services).values([
    {
      title: 'ChatGPT Plus',
      category: 'Artificial Intelligence',
      description: 'Advanced AI capabilities with GPT-4 access, faster response times, and early access to new features.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvY70SIXTcsqY9y1AT8I9-TvqMWB4md80ZrxEAKdR6PbvwGZPMzwcJtlmwlriwL_R-gg7UMdw5UM3iXHaV96x9_hYJcy1yqBOlboPzvPOl_v0VCv9sL7OPSBqFC0xOhoDVnQzaHZ0iWVt8s38t8Bmgr-x3YYDAoqZ9gqRqUgakey9RzeB9uap3ea1RfaLwPM7hoW-S0ZxBu8jg-V_CssDjX1U6Hz1heVKiiBVLLq8PfPSRECtWGQKyf6gA854J62ZcNJvxrrdyRV8',
    },
    {
      title: 'Midjourney',
      category: 'Artificial Intelligence',
      description: 'State-of-the-art generative AI for high-fidelity images and digital art.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcnifs9Byr04EPLr4woi7TrEPZ57nHBop-eXjIIlC43bDZ1Irpvro0uOme8lrbQxoKX1dVDjq9f1R_6fLWQUEerzXKOnOysq1qnN-GgWyzz6anIrlYD603_c3jG8E4Eux9cTdRESYOawAKv585bbBIjqRgKTbAI-Av6kZXsdeyIAFA7LaI8hrUhKxe_9-FL2ZnGrHEkDPGPjf-hwOrb2J4AA1EOGcTfVzSWfOyOkTVv4H-MwKtOQMugGXAUIlshlUz-1eIeRJYVhk',
    },
    {
      title: 'Netflix Premium',
      category: 'Streaming Services',
      description: 'Ultra HD streaming on multiple screens with spatial audio support.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNnFsKnB2TA8nUR9SZzgo0vQGo0aPlAhk0hSsMJpDqpP9oUfRNwxPN6f3dgV8u-dlALb5OvKD1w2E8_7bjsRMiC_UnT-BFlMNz1U_dh1YtE6riwg8tIRYdYZLT5HeVlQM-YwaT0lM03hSXRAl0yZe0waIbHiaqlbPnDJRr4yZOqmsBqeNDPVz3ZZEpK4-HSmmLkkvvNr9cHVthyX9EHco4ysGqjc0fQsDaqK_Ptvh1hOoRhEHWTMAiUfIxWpYWOCY4_3C9v4crAiE',
    },
    {
      title: 'YouTube Premium Family',
      category: 'Streaming Services',
      description: 'Ad-free YouTube and Music for up to 5 family members. Includes background play and offline downloads.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACdqhUpf_uRUO7U1__Om4OSVuxy6YdPwnsNggaKNBIy_aE7mpJjzxqZtf3d5VO8h7rAf7guewpJxkwKjFFsgaN5aqSQhF5XCE-YT-An27q3PmIi8e8m9lX8CFcpd-t3Psu6J22TkfolMj5w8XGRel_X4nlK6oVAvPRm0PjrTZRQm8xpxKJJIU-NOYxEM2Nk1IkQO50g486xehmCtPHZibV-E1UAEWNHl1EzujPMjy-JnKbwo8M1KgPtksIQn1T8Z7-JyK5hhpkPJg',
    },
    {
      title: 'GitHub Copilot Individual',
      category: 'Developer Tools',
      description: 'Your AI pair programmer. Suggests code in real-time right from your editor.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKGTHMz9lJfMBSfoVLE3xBPfNjQEw9KeLxKa4Gtu3HEv5X5O65cLvRh5Q_jpMn-2mf415snc8aEZ64lCd9jTwixbA1pBJ_NQ8hrVXwiN6hbKNWaoYmdXFAPwBBUOd4v4tN5I6lw9nJQ-RVetGfgCiTA0My91Zlxyv6MMGT1Z-F_JebgeSEyxo2XpQSwQj46R6sGFwuvy4emp_4A1FyiNjh25SDF-BlHjR2lU33Zo5rikAjhM5Luuq3mCeO0Y8K26Xw-K2GI_y2Ktc',
    },
    {
      title: 'Adobe Creative Cloud',
      category: 'Creative',
      description: 'Full suite of 20+ creative desktop and mobile apps including Photoshop, Illustrator, and Premiere Pro.',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZIXWVNbX_jZRPxO9BymUhd9MmLHGzMkdazZF5ZGtPm_miLE6C1mvFP3ft23e8posQbBQfQIa8oqQIiHarmIOHTD_VPVQz8plyaO_SRfCn8D9BgRucWk2JPYcpLgthk-SQuCgmE7fQ7YwYTXRu49TGCggdH6UZj7un-Y59WRVaVGyDH0wzrK__3uwc8nN73BjinTOPNWYP3kKadncwy4zWm-L3Lw2SpgOJvGAAWWI95j6cWT6Z2oQmufLuwnCadnyIHWXxbNRH_No',
    },
  ]).returning();

  const [chatgpt, midjourney, netflix, youtube, copilot, adobe] = insertedServices;

  // 3. Insert Providers
  const insertedProviders = await db.insert(providers).values([
    {
      name: 'FastFill Digital',
      url: 'https://fastfill.io',
      rating: '4.9',
      reviewCount: 2400,
      isPartner: true,
      isTopPick: false,
      iconType: 'rocket',
      paymentMethods: ['visa', 'crypto', 'paypal'],
    },
    {
      name: 'InstantGPT',
      url: 'https://instantgpt.io',
      rating: '5.0',
      reviewCount: 450,
      isPartner: true,
      isTopPick: true,
      iconType: 'zap',
      paymentMethods: ['visa', 'star'],
    },
    {
      name: 'GamsGo',
      url: 'https://www.gamsgo.com',
      rating: '4.8',
      reviewCount: 1250,
      isPartner: true,
      isTopPick: false,
      iconType: 'rocket',
      paymentMethods: ['visa', 'paypal'],
    },
    {
      name: 'NetflixPals',
      url: 'https://netflixpals.com',
      rating: '4.5',
      reviewCount: 850,
      isPartner: false,
      isTopPick: false,
      iconType: 'zap',
      paymentMethods: ['visa', 'crypto'],
    },
  ]).returning();

  const [fastfill, instantgpt, gamsgo, netflixpals] = insertedProviders;

  // 4. Insert SKUs
  await db.insert(skus).values([
    // ChatGPT Plus SKUs
    {
      serviceId: chatgpt.id,
      providerId: fastfill.id,
      name: 'ChatGPT Plus 1 Month',
      price: '18.99',
      originalPrice: '20.00',
      discountLabel: 'Save 12%',
      billingCycle: 'Monthly',
      features: ['Auto-renewal', 'Instant Delivery'],
      externalUrl: 'https://fastfill.io/chatgpt',
    },
    {
      serviceId: chatgpt.id,
      providerId: instantgpt.id,
      name: 'ChatGPT Plus 1 Month',
      price: '18.50',
      originalPrice: '20.00',
      discountLabel: 'Save 15%',
      billingCycle: 'Monthly',
      features: ['Instant Delivery', '24/7 Support'],
      externalUrl: 'https://instantgpt.io/chatgpt',
    },
    // Midjourney SKUs
    {
      serviceId: midjourney.id,
      providerId: gamsgo.id,
      name: 'Midjourney Standard 1 Month',
      price: '9.00',
      billingCycle: 'Monthly',
      features: ['Standard Plan', 'Fast GPU'],
      externalUrl: 'https://gamsgo.com/midjourney',
    },
    // Netflix SKUs
    {
      serviceId: netflix.id,
      providerId: netflixpals.id,
      name: 'Netflix Premium 1 Month',
      price: '15.50',
      originalPrice: '22.99',
      discountLabel: '-32% OFF',
      billingCycle: 'Monthly',
      features: ['4K UHD', '4 Screens'],
      externalUrl: 'https://netflixpals.com/netflix',
    },
    // YouTube Premium SKUs
    {
      serviceId: youtube.id,
      providerId: gamsgo.id,
      name: 'YouTube Premium Family 12 Months',
      price: '17.50',
      originalPrice: '19.99',
      discountLabel: '-12% OFF',
      billingCycle: 'Yearly',
      features: ['Instant Activation', 'Family Plan'],
      externalUrl: 'https://gamsgo.com/youtube',
    },
    // GitHub Copilot SKUs
    {
      serviceId: copilot.id,
      providerId: fastfill.id,
      name: 'GitHub Copilot 1 Month',
      price: '10.00',
      billingCycle: 'Monthly',
      features: ['Personal Account', 'Manual Top-up'],
      externalUrl: 'https://fastfill.io/copilot',
    },
    // Adobe SKUs
    {
      serviceId: adobe.id,
      providerId: instantgpt.id,
      name: 'Adobe Creative Cloud Annual',
      price: '35.75',
      originalPrice: '54.99',
      discountLabel: '-35% OFF',
      billingCycle: 'Yearly',
      features: ['Annual Only', 'Priority Support'],
      externalUrl: 'https://instantgpt.io/adobe',
    },
  ]);

  console.log('✅ Seeding completed!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
