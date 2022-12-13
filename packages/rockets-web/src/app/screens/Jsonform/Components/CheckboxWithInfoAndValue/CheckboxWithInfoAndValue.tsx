import { FC } from "react";
import Box from "@mui/material/Box";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  label?: string;
  // info?: {
  //   image: string;
  //   price: string;
  // };
  info?: any;
};

const CheckboxWithInfoAndValue: FC<CheckboxProps & Props> = (props) => {
  const { label, checked, info, disabled } = props;

  return (
    <Box display="flex" maxWidth={301}>
      <Box display="flex" flex={1} alignItems="center">
        <MuiCheckbox
          {...props}
          sx={{ ...props.sx }}
          checked={checked}
          disabled={disabled}
        />
        <Box display="flex" alignItems="center">
          {label}{" "}
          {info?.image && (
            <InfoIcon
              sx={{
                marginLeft: "6px",
                cursor: "pointer",
                fontSize: "18px",
                color: "#103265",
              }}
              onClick={() => console.log(info.image)}
            />
          )}
        </Box>
      </Box>
      <Box textAlign="right">{info?.price}</Box>
    </Box>
  );
};

export default CheckboxWithInfoAndValue;
