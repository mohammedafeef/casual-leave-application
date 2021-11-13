import {
  Paper,
  Button,
  Tooltip,
  List,
  ListItem,
} from "@mui/material";
import styles from "./styles.module.css";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import html2pdf from "html2pdf.js";
import leaveField from "../../Const";

export default function Preview(props) {
  const { previewData, setPreviewData } = props;
  const history = useHistory();
  const cols = [
    "date",
    "firstHour",
    "secondHour",
    "thirdHour",
    "fourthHour",
    "fifthHour",
    "arrangement",
  ];
  const handleBackEvent = () => history.push("/home");
  const exportToPdf = () => {
    var element = document.getElementById("pdfWrapper");
    var opt = {
      margin: 1,
      filename: `${previewData.name}-leave-application`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
    history.push("/home");
    setPreviewData('');
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  const getPreviewComponent = (field) => {
    switch (field.type) {
      case "text":
        return (
          <span className={styles.textData}>{previewData[field.name]}</span>
        );
      case "textArea":
        return (
          <span className={styles.textAreaData}>{previewData[field.name]}</span>
        );
      case "select":
        return (
          <span className={styles.selectBoxData}>
            {previewData[field.name]}
          </span>
        );
      case "checkbox":
        return (
          <List>
            {previewData[field.name]?.map((item) => (
              <ListItem>{item}</ListItem>
            ))}
          </List>
        );

      default:
        return;
    }
  };
  return (
    <Paper elevation={4} className={styles.formContainer}>
      <div className={styles.docWrapper} id="pdfWrapper">
        <h3 className={styles.clgName}>
          EMEA COLLEGE OF ARTS & SCIENCE, KONDOTTI
        </h3>
        <h4 className={styles.appName}>APPLICATION FOR CASUAL LEAVE</h4>
        <div className={styles.listContainter}>
          {leaveField?.map((field, ind) => (
            <>
              {previewData[field.name] && field?.label && (
                <div className={styles.listItem}>
                  <div className={styles.listTitle}>
                    <h4 className={styles.fieldTitle}>
                      {ind + 1}. {field.title}
                    </h4>
                    <span>:</span>
                  </div>
                  <div className={styles.listDist}>
                    {getPreviewComponent(field)}
                  </div>
                </div>
              )}
            </>
          ))}
          <div className={styles.listItem}>
            <div className={styles.listTitle}>
              <h4 className={styles.fieldTitle}>
                6. Signature of applicant with date
              </h4>
              <span>:</span>
            </div>
            <div className={styles.listDist}>
              ..............................<br />
            </div>
          </div>
        </div>
        <div className={styles.tableContainer} style={{overflow:"auto"}}>
          <span className={styles.tableTitle}>
            Class Hours and Work Arrangement Details
          </span>
          <table className={styles.arrangementTable} style={{overflow:"scroll"}}>
            <tr className={styles.tableHeader}>
              <th>Date</th>
              <th>1Hr</th>
              <th>2Hr</th>
              <th>3Hr</th>
              <th>4Hr</th>
              <th>5Hr</th>
              <th>Arrangement</th>
            </tr>
            {previewData?.workArrangement?.map((work) => (
              <tr className={styles.tableContent}>
                {cols?.map((col) => (
                  <td>{work[col]}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
        <hr className={styles.docDiver} size="4" />
        <div className={styles.footerWrapper}>
          <div className={styles.section} style={{ marginRight: "60px" }}>
            <span className={styles.firstLine}>
              Recommended/Not recommended
            </span>
            <span>Head of Dept:/ Office Supdt. </span>
          </div>
          <div className={styles.section}>
            <span className={styles.firstLine}>
              Sanctioned / Not sanctioned
            </span>
            <span className={styles.alignRight}>Principal.</span>
          </div>
        </div>
      </div>
      <div class={styles.btnContainer}>
        <Tooltip disableFocusListener title="Go back to form">
          <Button
            variant="contained"
            className={styles.customBtn}
            onClick={handleBackEvent}
          >
            <ArrowBackIcon className={styles.btnIcon} />
            Back
          </Button>
        </Tooltip>
        <Tooltip disableFocusListener title="export the dcument to word">
          <Button variant="contained" color="success" onClick={exportToPdf}>
            <ImportExportIcon className={styles.customBtnRight} />
            Export
          </Button>
        </Tooltip>
      </div>
    </Paper>
  );
}
