import {
  mockCampaigns,
  mockCreatives,
  mockInventorySlots,
  mockBriefs,
  mockContentItems,
  mockReportData,
} from './data';
import type {
  Campaign,
  Creative,
  InventorySlot,
  Brief,
  ContentItem,
  ReportRow,
  ReportFilters,
  InfluencerSettings,
} from '@/types';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth
export const apiLogin = async (email: string, password: string) => {
  await delay(800);
  return { success: true, user: { id: 'user-1', email, name: email.split('@')[0] } };
};

export const apiRegister = async (email: string, password: string, name: string) => {
  await delay(800);
  return { success: true, user: { id: 'user-' + Date.now(), email, name } };
};

// Campaigns
export const apiListCampaigns = async (): Promise<Campaign[]> => {
  await delay(500);
  return mockCampaigns;
};

export const apiGetCampaign = async (id: string): Promise<Campaign | undefined> => {
  await delay(400);
  return mockCampaigns.find(c => c.id === id);
};

export const apiCreateCampaign = async (campaign: Omit<Campaign, 'id' | 'createdAt'>): Promise<Campaign> => {
  await delay(600);
  const newCampaign: Campaign = {
    ...campaign,
    id: 'camp-' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  mockCampaigns.push(newCampaign);
  return newCampaign;
};

export const apiUpdateCampaign = async (id: string, updates: Partial<Campaign>): Promise<Campaign> => {
  await delay(500);
  const index = mockCampaigns.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCampaigns[index] = { ...mockCampaigns[index], ...updates };
    return mockCampaigns[index];
  }
  throw new Error('Campaign not found');
};

// Creatives
export const apiListCreatives = async (): Promise<Creative[]> => {
  await delay(400);
  return mockCreatives;
};

export const apiUploadCreative = async (creative: Omit<Creative, 'id' | 'createdAt'>): Promise<Creative> => {
  await delay(800);
  const newCreative: Creative = {
    ...creative,
    id: 'cr-' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  mockCreatives.push(newCreative);
  return newCreative;
};

export const apiDeleteCreative = async (id: string): Promise<void> => {
  await delay(300);
  const index = mockCreatives.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCreatives.splice(index, 1);
  }
};

// Inventory
export const apiListInventorySlots = async (): Promise<InventorySlot[]> => {
  await delay(400);
  return mockInventorySlots;
};

// Reports
export const apiListReports = async (filters: ReportFilters): Promise<ReportRow[]> => {
  await delay(600);
  return mockReportData;
};

// Influencer
export const apiGetInfluencerSettings = async (): Promise<InfluencerSettings> => {
  await delay(300);
  return {
    globalOptIn: true,
    categoryAllow: ['Fashion', 'Technology', 'Lifestyle'],
    categoryDeny: ['Gambling', 'Alcohol'],
  };
};

export const apiUpdateInfluencerSettings = async (settings: Partial<InfluencerSettings>): Promise<InfluencerSettings> => {
  await delay(400);
  // In a real app, this would persist to backend
  return {
    globalOptIn: settings.globalOptIn ?? true,
    categoryAllow: settings.categoryAllow ?? [],
    categoryDeny: settings.categoryDeny ?? [],
  };
};

export const apiListMyContent = async (): Promise<ContentItem[]> => {
  await delay(400);
  return mockContentItems;
};

export const apiToggleContentAdOptIn = async (id: string): Promise<void> => {
  await delay(300);
  const item = mockContentItems.find(c => c.id === id);
  if (item) {
    item.adOptIn = !item.adOptIn;
  }
};

export const apiListBriefs = async (): Promise<Brief[]> => {
  await delay(500);
  return mockBriefs;
};

export const apiApplyToBrief = async (briefId: string, message: string): Promise<void> => {
  await delay(600);
  const brief = mockBriefs.find(b => b.id === briefId);
  if (brief) {
    brief.status = 'applied';
  }
};
