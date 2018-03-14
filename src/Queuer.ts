export interface Queuer {
  id?: string;
  numberPulledAt: string;
  servicedAt?: string;
  skippedAt?: string;
  userId: string;
  number: number;
}
