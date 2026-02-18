export interface Spot {
  id: number;
  type: "normal" | "vip";
  status: "available" | "occupied";
  reserved: boolean;
}

export interface Mall {
  id: string;
  image: any;
  name: string;
  icon: string;
  totalSpots: number;
  availableSpots: number;
  vipSpots: number;
}

export interface Reservation {
  id: any;
  mallId: string;
  spotId: number;
  timestamp: string;
  remainingUses: number;
  gateOpen: boolean;
}
