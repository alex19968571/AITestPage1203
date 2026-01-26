
export interface Flight {
  date: string;
  dep: string;
  arr: string;
  from: string;
  to: string;
  flightNo: string;
}

export interface Accommodation {
  id: number;
  name: string;
  engName: string;
  thaiName?: string;
  nights: string;
  checkInTime: string;
  checkOutTime: string;
  address: string;
  thaiAddress?: string;
  note?: string;
  url: string;
  status: string;
  tags: string[];
  roomConfig: string;
}

export interface ItineraryEvent {
  time: string;
  travelTime?: string;
  title: string;
  sub?: string;
  thai?: string;
  icon: string;
  desc: string;
  url?: string | null;
}

export interface ItineraryDay {
  day: string;
  date: string;
  title: string;
  events: ItineraryEvent[];
}

export interface SpotItem {
  name: string;
  area?: string;
  url: string;
  desc: string;
}

export interface SpotCategory {
  category: string;
  note?: string;
  items: SpotItem[];
}

export interface Expense {
  id: number;
  amount: number;
  note: string;
  category: string;
  paymentMethod: 'cash' | 'card';
  date: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface TDACStep {
  step: number;
  title: string;
  content: string;
  icon: string;
}

export interface AppInfo {
  name: string;
  image: string;
  desc: string;
  url: string;
}

export interface AppCategory {
  title: string;
  apps: AppInfo[];
}
