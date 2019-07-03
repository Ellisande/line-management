/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import {
  GroupPreference,
  SkipPreference,
  CallPreference,
  DurationPreference,
  CapacityPreference
} from "../../Line";
import { ButtonGroup } from "./ButtonGroup";
import { OptOutInput } from "./OptOutInput";

const styleBuilder = ({ colors: { text, button }, buttons }: Theme) => ({
  layout: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: "5rem"
  }
});

interface Props {}

const mockPreferences = {
  groupPreference: GroupPreference.ONE,
  skipPrefence: SkipPreference.REMOVE,
  callPreference: CallPreference.ORDERED,
  maxDuration: DurationPreference.NO_MAXIMUM_DURATION,
  maximumCapacity: CapacityPreference.NO_MAXIMUM_CAPACITY
};

export const Preferences: React.SFC<Props> = () => {
  const styles = useStyle(styleBuilder);
  const {
    groupPreference,
    skipPrefence,
    callPreference,
    maxDuration,
    maximumCapacity
  } = mockPreferences;
  return (
    <div css={styles.layout}>
      <ButtonGroup
        label={"How many people are called at a time?"}
        name={"groupPreference"}
        options={[GroupPreference.ONE]}
        proOptions={[
          GroupPreference.TWO,
          GroupPreference.THREE,
          GroupPreference.FOUR,
          GroupPreference.FIVE
        ]}
        value={groupPreference}
      />
      <ButtonGroup
        label="What should happen to people who are skipped?"
        name="skipPreference"
        options={[SkipPreference.REMOVE]}
        proOptions={[SkipPreference.NEXT, SkipPreference.LOW_PRIORITY]}
        value={skipPrefence}
      />
      <ButtonGroup
        label="How do you want to call numbers?"
        name="callPreference"
        options={[CallPreference.ORDERED]}
        proOptions={[CallPreference.PICK_NUMBERS]}
        value={callPreference}
      />
      <OptOutInput
        value={CapacityPreference.NO_MAXIMUM_CAPACITY}
        noneLabel="No limit"
        noneValue={CapacityPreference.NO_MAXIMUM_CAPACITY}
        label="Maximum number of people in line"
        onChange={a => {
          console.log(a);
        }}
      />
      <OptOutInput
        value={DurationPreference.NO_MAXIMUM_DURATION}
        noneLabel="No limit"
        noneValue={DurationPreference.NO_MAXIMUM_DURATION}
        label="Maximum wait time in minutes"
        onChange={a => {
          console.log(a);
        }}
      />
    </div>
  );
};
