// User & Auth
export type UserRole = 'advertiser' | 'creator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Organization {
  id: string;
  name: string;
}

// Campaign
export type CampaignObjective = 'product' | 'general';
export type Surface = 'shop_search' | 'social_feed' | 'news_article' | 'product_page';
export type KPI = 'impressions' | 'clicks' | 'conversions';
export type BidStrategy = 'CPC' | 'CPM' | 'CPA';
export type Pacing = 'smooth' | 'asap';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  objective: CampaignObjective;
  surfaces: Surface[];
  kpis: KPI[];
  status: CampaignStatus;
  budget: Budget;
  targeting: Targeting;
  creatives: string[]; // creative IDs
  createdAt: string;
  startDate?: string;
  endDate?: string;
  stats?: CampaignStats;
}

export interface Budget {
  type: 'daily' | 'lifetime';
  amount: number;
  bidStrategy: BidStrategy;
  bidAmount: number;
  pacing: Pacing;
}

export interface Targeting {
  keywords: string[];
  categories: string[];
  hashtags: string[];
  newsTopics: string[];
  geo: { countries: string[]; cities: string[] };
  devices: ('mobile' | 'desktop')[];
  brandSafety: 'standard' | 'strict';
  frequencyCap: number;
}

export interface CampaignStats {
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  spend: number;
  conversions: number;
  roas: number;
}

// Creative
export type CreativeType = 'image' | 'banner' | 'video' | 'product' | 'native';
export type CreativeStatus = 'draft' | 'active' | 'archived';

export interface Creative {
  id: string;
  type: CreativeType;
  name: string;
  status: CreativeStatus;
  thumbnail?: string;
  url?: string;
  product?: ProductSnapshot;
  native?: NativeContent;
  lastUsed?: string;
  createdAt: string;
}

export interface ProductSnapshot {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface NativeContent {
  headline: string;
  description: string;
  thumbnail?: string;
}

// Ad Set
export interface AdSet {
  id: string;
  campaignId: string;
  name: string;
  targeting: Targeting;
  budget: Budget;
  status: CampaignStatus;
}

// Inventory
export type PlacementPosition = 'top' | 'mid' | 'bottom' | 'before' | 'after' | 'inline' | 'pre' | 'post';

export interface InventorySlot {
  id: string;
  name: string;
  surface: Surface;
  position: PlacementPosition;
  dimensions: { width: number; height: number };
  allowedFormats: CreativeType[];
  description: string;
  examplePreview?: string;
}

// Reports
export interface ReportRow {
  date: string;
  surface?: Surface;
  placement?: string;
  creative?: string;
  keyword?: string;
  geo?: string;
  device?: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  spend: number;
  conversions: number;
  roas: number;
}

export interface ReportFilters {
  startDate: string;
  endDate: string;
  breakdown: 'date' | 'surface' | 'placement' | 'creative' | 'keyword' | 'geo' | 'device';
}

// Influencer/Creator
export interface InfluencerSettings {
  globalOptIn: boolean;
  categoryAllow: string[];
  categoryDeny: string[];
}

export interface ContentItem {
  id: string;
  type: 'post' | 'video' | 'article';
  title: string;
  thumbnail?: string;
  adOptIn: boolean;
  eligibleFormats: CreativeType[];
  createdAt: string;
}

export type PayoutModel = 'flat' | 'CPM' | 'CPC';

export interface Brief {
  id: string;
  title: string;
  description: string;
  advertiserName: string;
  payoutModel: PayoutModel;
  payoutAmount: number;
  deliverables: string[];
  deadline: string;
  status: 'open' | 'applied' | 'accepted' | 'completed';
  createdAt: string;
}

export interface BriefApplication {
  briefId: string;
  message: string;
  proposedRate?: number;
}
