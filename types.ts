
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  CHEMIST = 'CHEMIST'
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  stock: number;
  expiryDate: string;
  chemistId: string;
  chemistName: string;
  category: string;
  description: string;
  imageUrl?: string;
  nearExpiryDiscount?: number; // percentage
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface InventoryParsedData {
  name: string;
  dosage: string;
  price: number;
  stock: number;
  expiryDate: string;
  category: string;
}
