export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  reputation_score: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  seller_id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  created_at: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  host_id: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  price: number;
  capacity: number;
  category: string;
}