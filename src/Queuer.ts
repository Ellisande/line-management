export interface Queuer {
  numberPulledAt: string;
  servicedAt?: string;
  skippedAt?: string;
  userId: string;
  number: number;
}
