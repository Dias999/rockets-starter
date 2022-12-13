import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { RJSFSchema, UiSchema, FormValidation } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv6";
import { IChangeEvent } from "@rjsf/core";
import Form from "@rjsf/mui";
import emailValidation from "app/utils/emailValidation/emailValidation";

import DualColumn from "./Templates/DualColumn";
import SelectTemplate from "./Templates/SelectTemplate";
import GenericTemplate from "./Templates/GenericTemplate";
import { createTheme, ThemeProvider } from "@mui/material";
import CustomCheckboxesWidget from "./Widgets/CustomCheckboxesWidget";
import CustomRadioWidget from "./Widgets/CustomRadioWidget";
import CustomTextFieldWidget from "./Widgets/CustomTextFieldWidget";
import { locationOptions } from "./locationOptions";

type FormData = {
  name: string;
  email: string;
};

const SimpleForm: FC = () => {
  const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          variant: "standard",
        },
      },
    },
  });

  const schema: RJSFSchema = {
    type: "object",
    // required: ["name", "email"],
    properties: {
      acessories: {
        type: "array",
        title: "Acessories",
        items: {
          type: "string",
          enum: ["rainCover", "strollerBagHook", "coolerBag", "childSnackTray"],
          enumNames: [
            "Rain Cover",
            "Stroller Bag Hook",
            "Cooler Bag",
            "Child Snack Tray",
          ],
        },
        uniqueItems: true,
      },
      insurance: {
        type: "string",
        title: "Insurance",
        enum: ["add", "decline"],
        enumNames: [
          "Please add optional charge / theft insurance  (Just $15 for the entire rental period)",
          "I decline the optional damage / theft insurance",
        ],
      },
      nameTag: { type: "string", title: "Name Tag" },
      commentsNotes: { type: "string", title: "Comments & Notes" },
      location: {
        title: "",
        type: "object",
        properties: {
          location: {
            type: "string",
            title: "Location",
            enum: ["resort", "vacationHome", "orlandoAirport"],
            enumNames: ["Resort", "Vacation Home", "Orlando Airport"],
          },
          deliveryLocation: {
            title: "Location",
            description: "Select Delivery Location, Date and Time",
            type: "string",
            enum: locationOptions.enum,
            enumNames: locationOptions.enumNames,
          },
          scheduling: {
            type: "object",
            properties: {
              date: {
                type: "string",
                title: "Date",
              },
              time: {
                type: "string",
                title: "Time",
                enum: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
              },
            },
          },
        },
      },
      locationReturn: {
        title: "",
        type: "object",
        properties: {
          sameAsCheckIn: {
            type: "boolean",
            title: "Same as Check In",
            enum: [true, false],
          },
          location: {
            type: "string",
            title: "",
            enum: ["resort", "vacationHome", "orlandoAirport"],
            enumNames: ["Resort", "Vacation Home", "Orlando Airport"],
          },
          deliveryLocation: {
            title: "Location",
            description: "Select Return Location, Date and Time",
            type: "string",
            enum: locationOptions.enum,
            enumNames: locationOptions.enumNames,
          },
          scheduling: {
            type: "object",
            properties: {
              date: {
                type: "string",
                title: "Date",
              },
              time: {
                type: "string",
                title: "Time",
                enum: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
              },
            },
          },
        },
      },
    },
  };

  const uiSchema: UiSchema = {
    acessories: {
      "ui:widget": CustomCheckboxesWidget,
      "ui:options": {
        breakAfter: true,
        info: {
          rainCover: {
            image:
              "https://www.kingdomstrollers.com/Content/images/accessories/rain-cover-800x800-grid-ks-temp1.png",
            price: "Free",
          },
          strollerBagHook: {
            image:
              "https://www.kingdomstrollers.com/Content/images/accessories/stroller-hook1.png",
            price: "$5",
          },
          coolerBag: {
            image:
              "https://www.kingdomstrollers.com/Content/images/accessories/cooler-bag-800x800-grid-TEMP1-ks1.png",
            price: "Free",
          },
          childSnackTray: {
            image:
              "https://www.kingdomstrollers.com/Content/images/accessories/snack-tray-800x800-grid-ks-6.png",
            price: "$10",
          },
        },
      },
    },
    insurance: {
      "ui:widget": CustomRadioWidget,
      "ui:options": { breakAfter: true },
    },
    nameTag: {
      "ui:FieldTemplate": GenericTemplate,
      "ui:widget": CustomTextFieldWidget,
    },
    commentsNotes: {
      "ui:FieldTemplate": GenericTemplate,
      "ui:widget": CustomTextFieldWidget,
      "ui:options": { multiline: true, rows: 4, breakAfter: true },
    },
    location: {
      location: {
        "ui:widget": CustomRadioWidget,
        "ui:options": { inline: true },
      },
      deliveryLocation: {
        "ui:FieldTemplate": SelectTemplate,
      },
      scheduling: {
        "ui:ObjectFieldTemplate": DualColumn,
        date: { "ui:widget": "date" },
      },
    },
    locationReturn: {
      location: {
        "ui:widget": CustomRadioWidget,
        "ui:options": { inline: true },
      },
      deliveryLocation: {
        "ui:FieldTemplate": SelectTemplate,
      },
      scheduling: {
        "ui:ObjectFieldTemplate": DualColumn,
        date: { "ui:widget": "date" },
      },
    },
  };

  const validate = (formData: FormData, errors: FormValidation) => {
    if (!emailValidation(formData.email)) {
      errors?.email?.addError("please enter a valid email");
    }

    return errors;
  };

  const handleSubmit = (
    values: IChangeEvent<FormData>,
    nativeEvent: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("values", values);
    console.log("nativeEvent", nativeEvent);
  };

  const handleChange = (data: IChangeEvent) => {
    console.log("form", data?.formData);
  };

  return (
    <Box sx={{ maxWidth: "516px" }}>
      <ThemeProvider theme={theme}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={handleSubmit}
          customValidate={validate}
          noHtml5Validate={true}
          showErrorList={false}
          onError={(err) => console.log("errors", err)}
          onChange={handleChange}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Continue
          </Button>
        </Form>
      </ThemeProvider>
    </Box>
  );
};

export default SimpleForm;
