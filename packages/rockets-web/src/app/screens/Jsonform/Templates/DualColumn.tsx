import * as React from "react";
import Box from "@mui/material/Box";
import { ObjectFieldTemplateProps } from "@rjsf/utils";
import Grid from "@mui/material/Grid";

const DualColumn: React.FC<ObjectFieldTemplateProps> = (props) => {
  const renderProperties = () => {
    return props.properties.map((element: any) => {
      return (
        <Grid item xs={6}>
          <Box>{element.content}</Box>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={2}>
      {renderProperties()}
    </Grid>
  );
};

export default DualColumn;
