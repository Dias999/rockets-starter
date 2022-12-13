import * as React from "react";
import Box from "@mui/material/Box";
import { FieldTemplateProps } from "@rjsf/utils";
import { Text } from "@concepta/react-material-ui";
import Divider from "@mui/material/Divider";

const GenericTemplate: React.FC<FieldTemplateProps> = (props) => {
  const { help, label, required, description, errors, children } = props;
  const breakAfter = props?.uiSchema?.["ui:options"]?.breakAfter;

  return (
    <>
      <Box display="flex" flexDirection="column" flex={1}>
        {label && (
          <Text color="#103265" fontWeight={700} fontSize={22}>
            {label}
            {required && " *"}
          </Text>
        )}

        {description && (
          <Text color="#103265" sx={{ mb: 1 }}>
            {description}
          </Text>
        )}
        {children}
        {errors}
        {help}
      </Box>

      {breakAfter && <Divider sx={{ mt: 2 }} />}
    </>
  );
};

export default GenericTemplate;
