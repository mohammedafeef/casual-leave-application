import React from "react";
import { useState, useEffect } from "react";
import TextInput from "../util/TextInput";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import PreviewIcon from "@mui/icons-material/Preview";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Grid, Tooltip } from "@mui/material";
import TextAreaInput from "../util/TextArea";
import leaveField from "../../Const";
import styles from "./styles.module.css";
import { useHistory } from "react-router";
import WorkArrangement from "../util/WorkArrangement";

const Home = (props) => {
  const { setPreviewData, previewData } = props;
  const [casualLeave, setCasualLeave] = useState(previewData);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const updateDisableState = () =>
      setIsDisabled(
        leaveField.find((item) => item.required && !casualLeave[item.name])
          ? true
          : false
      );
    updateDisableState();
  }, [casualLeave]);
  const history = useHistory();
  const handleFieldValueChange = (event) => {
    setCasualLeave({
      ...casualLeave,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmission = (event) => {
    setPreviewData({
      ...casualLeave,
      InternalTable: "created",
      ExternalTable: casualLeave["ExternalTable"] || "rows80",
    });
    history.push("/preview");
  };

  const handleWorkArrangementChange = (value) =>
    setCasualLeave({
      ...casualLeave,
      workArrangement: casualLeave.workArrangement
        ? [...casualLeave.workArrangement, value]
        : [value],
    });
  const handleFormReset = () => {
    history.go(0);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const getComponent = (field) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            label={field.label || ""}
            name={field.name}
            onChange={handleFieldValueChange}
            value={casualLeave[field.name]}
            required={`${field.title}${field.required ? "*" : ""}`}
          />
        );
      case "textArea":
        return (
          <TextAreaInput
            label={field.label || ""}
            onChange={handleFieldValueChange}
            name={field.name}
            value={casualLeave[field.name]}
            required={`${field.title}${field.required ? "*" : ""}`}
            sample={field.sample || ""}
          />
        );

      case "workArrangement":
        return (
          <WorkArrangement
            addMoreHandler={handleWorkArrangementChange}
            addedArrangement={
              casualLeave.workArrangement ? casualLeave.workArrangement : []
            }
          />
        );
      default:
        return;
    }
  };

  return (
    <Paper elevation={4} className={styles.formContainer}>
      <h3 className={styles.sectiontHeading}>Leave credential</h3>
      <List sx={styles} component="ul" className={styles.fieldList}>
        {leaveField.map((field) => (
          <>
            <ListItem className={styles.fieldListItem}>
              <Grid container>
                {field.title ? (
                  <>
                    <Grid item md={3} sm={12} xs={12} style={{marginBottom:"15px"}}>
                      {`${field.title} ${field.required ? "*" : ""}`}
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                      {getComponent(field)}
                    </Grid>
                  </>
                ) : (
                  getComponent(field)
                )}
              </Grid>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>

      <div class={styles.btnContainer}>
        <Tooltip
          title={
            isDisabled
              ? "Fill * fields to enable preview"
              : "Show your word document model"
          }
        >
          <span>
            <Button
              variant="contained"
              className={styles.customBtn}
              onClick={handleFormSubmission}
              disabled={isDisabled}
            >
              <PreviewIcon className={styles.btnIcon} />
              Preview
            </Button>
          </span>
        </Tooltip>
        <Tooltip disableFocusListener title="Clear all input field">
          <Button
            variant="contained"
            color="error"
            onClick={handleFormReset}
          >
            <BackspaceIcon className={styles.btnIcon} />
            Reset
          </Button>
        </Tooltip>
      </div>
    </Paper>
  );
};

export default Home;
