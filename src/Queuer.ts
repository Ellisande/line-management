export interface Queuer {
  pulledAt?: string;
  servicedAt?: string;
  skippedAt?: string;
  leftAt?: string;
  userId: string;
  number: number;
}
