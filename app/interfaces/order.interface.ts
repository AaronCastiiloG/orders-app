export interface Order {
  id: string;
  identifier: string;
  personName: string;
  personNumber: string;
  status?: string;
  notDeliveredReason?: string;
  totalPrice: number;
};
