export interface Queuer {
  pulledAt?: string; // Admin only
  servicedAt?: string; // Admin only
  skippedAt?: string; // User & Admin
  leftAt?: string; // User & Admin
  onTheWayAt?: string;
  userId: string; // Admin?
  number: number; // Admin
}
