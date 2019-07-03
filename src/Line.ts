import * as moment from "moment";

export enum GroupPreference {
  ONE = "One",
  TWO = "Two",
  THREE = "Three",
  FOUR = "Four",
  FIVE = "Five"
}

export enum SkipPreference {
  REMOVE = "Remove",
  NEXT = "Next",
  LOW_PRIORITY = "Low Priority"
}

export enum CallPreference {
  ORDERED = "Ordered",
  PICK_NUMBERS = "Pick Numbers"
}

export enum DurationPreference {
  NO_MAXIMUM_DURATION = "No Maximum Duration"
}
export enum CapacityPreference {
  NO_MAXIMUM_CAPACITY = "No Maximum Capacity"
}

export interface Preferences {
  groupPreference: GroupPreference;
  skipPrefences: SkipPreference;
  callPreference: CallPreference;
  maxDuration: moment.Duration | DurationPreference;
  maximumCapacity: number | CapacityPreference;
}

export interface Line extends Preferences {
  current: string;
  startedAcceptingAt: string;
  stoppedAcceptingAt: string;
}
