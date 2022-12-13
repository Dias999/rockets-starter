import React, { FC, useState } from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Text } from "@concepta/react-material-ui";

interface TextAreaProps {
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
}

const TextField: FC<TextFieldProps & { options: TextAreaProps }> = (props) => {
  const { label, required, sx, type, options } = props;

  console.log("options", options);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prv) => !prv);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isPassword = type === "password";

  return (
    <>
      <Text
        fontSize={14}
        fontWeight={500}
        color="text.primary"
        textAlign="left"
      >
        {label}
        {required && " *"}
      </Text>
      <MuiTextField
        {...props}
        sx={{
          ...sx,
          marginTop: "4px",
          mb: 3,
          input: { color: "text.primary" },
        }}
        size="small"
        hiddenLabel
        label=""
        type={isPassword ? (showPassword ? "text" : "password") : type}
        // multiline
        // rows={4}
        multiline={options?.multiline}
        rows={options?.rows}
        InputProps={{
          ...(isPassword && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </>
  );
};

export default TextField;
