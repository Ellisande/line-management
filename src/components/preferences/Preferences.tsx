/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useStyle } from "../../theme/useStyle";
import { Theme } from "../../theme/theme";
import {
  GroupPreference,
  SkipPreference,
  CallPreference,
  DurationPreference,
  CapacityPreference,
  groupPreferenceMap,
  callPreferenceMap,
  skipPreferenceMap,
  durationPreferenceMap,
  capacityPreferenceMap
} from "../../Line";
import { ButtonGroup } from "./ButtonGroup";
import { OptOutInput } from "./OptOutInput";
import { useLineData } from "../../hooks/useLineData";
import { useGroupPreferenceUpdater, useCallPreferenceUpdater, useSkipPreferenceUpdater, useDurationPreferenceUpdater, useCapacityPreferenceUpdater } from "../../hooks/useLineDataUpdater";
import { Authenticated } from "../Authenticated";
import { Link } from "react-router-dom";


const styleBuilder = ({ colors, buttons, font }: Theme) => ({
  layout: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: "5rem",
  },
  manageButton: {
    ...buttons.borderOptions,
    ...buttons.paddingOptions,
    cursor: "pointer",
    fontSize: font.size.large,
    backgroundColor: colors.button.primary,
    color: colors.text.primary,
    marginTop: '4rem',
    borderWidth: '3px',
    borderColor: colors.text.primary,
    paddingTop: '1rem',
    paddingBottom: "1rem",
    textDecoration: "none"
  }
});

interface Props { }

const toDurationValue = (value: string | number) => durationPreferenceMap[value] || value;
const toCapacityValue = (value: string | number) => capacityPreferenceMap[value] || value;

export const Preferences: React.FunctionComponent<Props> = () => {
  const styles = useStyle(styleBuilder);

  const groupPreference = groupPreferenceMap[useLineData('groupPreference')];
  const groupPrefenceUpdater = useGroupPreferenceUpdater();

  const callPreference = callPreferenceMap[useLineData('callPreference')];
  const callPreferenceUpdater = useCallPreferenceUpdater();

  const skipPreference = skipPreferenceMap[useLineData('skipPreference')];
  const skipPreferenceUpdater = useSkipPreferenceUpdater();

  const maxDuration = toDurationValue(useLineData('maxDuration'));
  const maxDurationUpdater = useDurationPreferenceUpdater();

  const maximumCapacity = toCapacityValue(useLineData('maximumCapacity'));
  const maximumCapacityUpdater = useCapacityPreferenceUpdater();

  return (
    <Authenticated>
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
          onChange={groupPrefenceUpdater}
          pro
        />
        <ButtonGroup
          label="What should happen to people who are skipped?"
          name="skipPreference"
          options={[SkipPreference.REMOVE]}
          proOptions={[SkipPreference.NEXT, SkipPreference.LOW_PRIORITY]}
          value={skipPreference}
          onChange={skipPreferenceUpdater}
          pro
        />
        <ButtonGroup
          label="How do you want to call numbers?"
          name="callPreference"
          options={[CallPreference.ORDERED]}
          proOptions={[CallPreference.PICK_NUMBERS]}
          value={callPreference}
          onChange={callPreferenceUpdater}
          pro
        />
        <OptOutInput
          value={maximumCapacity}
          noneLabel="No limit"
          noneValue={CapacityPreference.NO_MAXIMUM_CAPACITY}
          label="Maximum number of people in line"
          onChange={maximumCapacityUpdater}
          pro
        />
        <OptOutInput
          value={maxDuration}
          noneLabel="No limit"
          noneValue={DurationPreference.NO_MAXIMUM_DURATION}
          label="Maximum wait time in minutes"
          onChange={maxDurationUpdater}
          pro
        />
        <Link css={styles.manageButton} to="manage">ManageLine</Link>
      </div>
    </Authenticated>
  );
};
