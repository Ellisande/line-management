export interface Queuer {
  pulledAt?: string; // Admin only
  servicedAt?: string; // Admin only
  skippedAt?: string; // User & Admin
  leftAt?: string; // User & Admin
  userId: string; // Admin?
  number: number; // Admin
}
