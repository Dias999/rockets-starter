import React, { FC } from "react";
import Divider from "@mui/material/Divider";
import CheckboxWithInfoAndValue from "../Components/CheckboxWithInfoAndValue";
import { WidgetProps } from "@rjsf/utils";
import { Text } from "@concepta/react-material-ui";

interface Option {
  label: string;
  value: string;
}

const CustomCheckboxesWidget: FC<WidgetProps> = (props) => {
  const {
    label,
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    required,
    onChange,
  } = props;
  const { enumOptions, enumDisabled, info, breakAfter } = options;

  const selectValue = (value: any, selected: any, all: any) => {
    const at = all.indexOf(value);
    const updated = selected.slice(0, at).concat(value, selected.slice(at));

    return updated.sort((a: any, b: any) => all.indexOf(a) > all.indexOf(b));
  };

  const deselectValue = (value: any, selected: any) => {
    return selected.filter((v: any) => v !== value);
  };

  const _onChange =
    (option: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      const all = (enumOptions as any).map(({ value }: any) => value);

      if (checked) {
        onChange(selectValue(option.value, value, all));
      } else {
        onChange(deselectValue(option.value, value));
      }
    };

  return (
    <>
      <Text color="#103265" fontWeight={700} fontSize={22}>
        {label}
        {required && " *"}
      </Text>

      {(enumOptions as any).map((option: Option, index: number) => {
        const checked = value.indexOf(option.value) !== -1;

        const itemDisabled =
          enumDisabled && (enumDisabled as any).indexOf(option.value) != -1;

        return (
          <CheckboxWithInfoAndValue
            id={`${id}_${index}`}
            checked={checked}
            disabled={disabled || itemDisabled || readonly}
            autoFocus={autofocus && index === 0}
            onChange={_onChange(option)}
            key={index}
            label={option.label}
            required={required}
            // @ts-expect-error: TODO: Check type later
            info={info?.[option.value]}
          />
        );
      })}

      {breakAfter && <Divider sx={{ mt: 2 }} />}
    </>
  );
};

export default CustomCheckboxesWidget;
