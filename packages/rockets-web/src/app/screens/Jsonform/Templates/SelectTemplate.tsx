import * as React from "react";
import Box from "@mui/material/Box";
import { FieldTemplateProps } from "@rjsf/utils";
import { Text } from "@concepta/react-material-ui";

const SelectTemplate: React.FC<FieldTemplateProps> = (props) => {
  const { help, required, description, errors, children } = props;
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Text color="#103265" sx={{ mb: 1 }}>
        {description}
      </Text>
      {children}
      {errors}
      {help}
    </Box>
  );
};

export default SelectTemplate;
