export interface Queuer {
  numberPulledAt?: string;
  servicedAt?: string;
  skippedAt?: string;
  leftAt?: string;
  userId: string;
  number: number;
}
