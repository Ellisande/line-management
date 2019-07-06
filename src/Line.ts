import * as moment from "moment";

export enum GroupPreference {
  ONE = "One",
  TWO = "Two",
  THREE = "Three",
  FOUR = "Four",
  FIVE = "Five"
}

export const groupPreferenceMap: { [key: string]: GroupPreference } = {
  "One": GroupPreference.ONE,
  "Two": GroupPreference.TWO,
  "Three": GroupPreference.THREE,
  "Four": GroupPreference.FOUR,
  "Five": GroupPreference.FIVE,
}


export enum SkipPreference {
  REMOVE = "Remove",
  NEXT = "Next",
  LOW_PRIORITY = "Low Priority"
}

export const skipPreferenceMap: { [key: string]: SkipPreference } = {
  "Remove": SkipPreference.REMOVE,
  "Next": SkipPreference.NEXT,
  "Low Priority": SkipPreference.LOW_PRIORITY
}

export enum CallPreference {
  ORDERED = "Ordered",
  PICK_NUMBERS = "Pick Numbers"
}

export const callPreferenceMap: { [key: string]: CallPreference } = {
  "Ordered": CallPreference.ORDERED,
  "Pick Numbers": CallPreference.PICK_NUMBERS
}

export enum DurationPreference {
  NO_MAXIMUM_DURATION = "No Maximum Duration"
}

export const durationPreferenceMap: { [key: string]: DurationPreference } = {
  "No Maximum Duration": DurationPreference.NO_MAXIMUM_DURATION
}

export enum CapacityPreference {
  NO_MAXIMUM_CAPACITY = "No Maximum Capacity"
}

export const capacityPreferenceMap: { [key: string]: CapacityPreference } = {
  "No Maximum Capacity": CapacityPreference.NO_MAXIMUM_CAPACITY
}

export interface Preferences {
  groupPreference: GroupPreference;
  skipPreference: SkipPreference;
  callPreference: CallPreference;
  maxDuration: moment.Duration | DurationPreference;
  maximumCapacity: number | CapacityPreference;
}

export const defaultLinePreferences = {
  groupPreference: GroupPreference.ONE,
  skipPreference: SkipPreference.REMOVE,
  callPreference: CallPreference.PICK_NUMBERS,
  maxDuration: DurationPreference.NO_MAXIMUM_DURATION,
  maximumCapacity: CapacityPreference.NO_MAXIMUM_CAPACITY
}

export interface Line extends Preferences {
  current: string;
  startedAcceptingAt: string;
  stoppedAcceptingAt: string;
}
