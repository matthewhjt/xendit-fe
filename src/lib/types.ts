export interface Class {
  id: string;
  title: string;
  description: string;
  tutorName: string;
  tutorTitle: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  subchapters: SubChapter[];
}

export interface SubChapter {
  id: string;
  title: string;
  content: string;
  isFree: boolean;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  description: string;
  isActive: boolean;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  planId: string;
  xenditInvoiceId: string | null;
  xenditExternalId: string;
  paymentUrl: string;
  amount: string;
  paymentMethod: string | null;
  status: "PAID" | "PENDING" | "EXPIRED";
  paidAt: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  subscriptionPlan: {
    id: string;
    name: string;
    durationDays: number;
    price: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  subscription: {
    id: string;
    userId: string;
    startDate: string;
    endDate: string;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface UserProfile {
  id: string;
  email: string;
  fullname?: string;
}
