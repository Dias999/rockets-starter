import { FC } from "react";
import Divider from "@mui/material/Divider";
import { RadioGroup } from "@concepta/react-material-ui";
import { RadioOptions } from "@concepta/react-material-ui/dist/components/RadioGroup";
import { WidgetProps } from "@rjsf/utils";
import { Text } from "@concepta/react-material-ui";

const CustomRadioWidget: FC<WidgetProps> = (props) => {
  const { id, schema, options, value, required, disabled, label, onChange } =
    props;
  const { enumOptions, breakAfter } = options;

  const _onChange = (_: any, value: any) => {
    onChange(schema.type == "boolean" ? value !== "false" : value);
  };

  const row = options ? options.inline : false;

  return (
    <>
      <Text color="#103265" fontWeight={700} fontSize={22}>
        {label}
        {required && " *"}
      </Text>

      <RadioGroup
        id={id}
        options={enumOptions as RadioOptions[]}
        onChange={_onChange}
        row={row as boolean}
        value={value}
        disabled={disabled}
      />

      {breakAfter && <Divider sx={{ mt: 2 }} />}
    </>
  );
};

export default CustomRadioWidget;
