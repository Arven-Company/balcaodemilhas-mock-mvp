export type Page = 
  | 'emissions' 
  | 'counter' 
  | 'promotions' 
  | 'account' 
  | 'flight-detail' 
  | 'contract' 
  | 'chat'
  | 'sale-onboarding'
  | 'sale-confirmation'
  | 'plans'
  | 'plan-success'
  | 'filters'
  | 'settings'
  | 'edit-profile'
  | 'my-sales'
  | 'make-offer'
  | 'create-purchase-offer'
  | 'sale-detail'
  | 'promotion-detail'
  | 'purchase-onboarding'
  | 'purchase-confirmation'
  | 'dispute-reason'
  | 'dispute-status'
  | 'admin-panel'
  | 'admin-add-emission'
  | 'admin-select-dates'
  | 'admin-add-promotion'
  | 'admin-add-success'
  | 'create-ad'
  | 'select-ad-plan'
  | 'ad-success';

export interface User {
  name: string;
  avatarUrl: string;
  rating: number;
  reviews: number;
}

export interface FlightDeal {
  id: string;
  from: string;
  to: string;
  priceMiles?: number;
  priceBRL?: number;
  airline: string;
  airlineLogoUrl: string;
  imageUrl: string;
  duration?: string;
  sponsored?: boolean;
  sponsor?: {
    name: string;
    rating: number;
  };
}

export interface MarketOffer {
  id: string;
  user: User;
  airline: string;
  airlineLogoUrl: string;
  miles: number;
  pricePerThousand?: number;
  totalPrice?: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

// --- Promotion Types ---
interface TextItem {
  type: 'text';
  content: string;
  isNote?: boolean;
}
interface ListItem {
  type: 'list';
  items: string[];
  listType: 'ordered' | 'unordered';
}
interface CouponItem {
    type: 'coupon';
    code: string;
    description: string;
    expiry?: string;
    link?: string;
}

export type PromotionContentItem = TextItem | ListItem | CouponItem;

export interface PromotionSection {
  title: string;
  content: PromotionContentItem[];
}

export interface Promotion {
  id: string;
  title: string;
  category: string;
  expiryDate: string;
  imageUrl: string;
  sections: PromotionSection[];
}