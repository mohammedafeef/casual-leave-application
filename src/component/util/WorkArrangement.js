import {
  Grid,
  TextField,
  Button,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function WorkArrangement(props) {
  const { addMoreHandler, addedArrangement } = props;
  const [workArrangement, setWorkArrangement] = useState({});
  const handleAddMoreCoveredPortion = (e) => {
    setWorkArrangement({
      ...workArrangement,
      [e.target.name]: e.target.value,
    });
  };
  const clearStates = () =>
    setWorkArrangement({
      date: "",
      firstHour: "",
      secondHour: "",
      thirdHour: "",
      fourthHour: "",
      fifthHour: "",
      arrangement: "",
    });
  const addCoveredPortion = () => {
    const data = { ...workArrangement };
    addMoreHandler(data);
    clearStates();
  };
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item container spacing={2}>
        <Grid item sm={8}>
          <h4 style={{ margin: "0" }}>Work arrangement</h4>
        </Grid>
      </Grid>
      {addedArrangement.length ? (
        <div style={{ overflow: "auto", width: "100%" }}>
          <Table style={{ overflow: "scroll" }}>
            {addedArrangement.map((arrangement) => (
              <TableRow>
                <TableCell>
                  <p>{arrangement.date}</p>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.firstHour}</h4>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.secondHour}</h4>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.thirdHour}</h4>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.fourthHour}</h4>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.fifthHour}</h4>
                </TableCell>
                <TableCell>
                  <h4>{arrangement.arrangement}</h4>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      ) : null}

      <Grid item container spacing={2}>
        <Grid item sm={3} xs={12}>
          <TextField
            fullWidth
            label={"date"}
            name={"date"}
            value={workArrangement.date}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <TextField
            fullWidth
            label={"1 Hr"}
            name={"firstHour"}
            value={workArrangement.firstHour}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <TextField
            fullWidth
            label={"2 Hr"}
            name={"secondHour"}
            value={workArrangement.secondHour}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <TextField
            fullWidth
            label={"3 Hr"}
            name={"thirdHour"}
            value={workArrangement.thirdHour}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <TextField
            fullWidth
            label={"4 hr"}
            name={"fourthHour"}
            value={workArrangement.fourthHour}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <TextField
            fullWidth
            label={"5 Hr"}
            name={"fifthHour"}
            value={workArrangement.fifthHour}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextField
            fullWidth
            label={"arrangement"}
            rows="4"
            multiline
            name={"arrangement"}
            value={workArrangement.arrangement}
            onChange={handleAddMoreCoveredPortion}
          />
        </Grid>
      </Grid>
      <Grid item container>
        <Button
          variant="contained"
          onClick={addCoveredPortion}
          disabled={
            !workArrangement ||
            !workArrangement.date ||
            !workArrangement.arrangement
          }
          style={{ marginLeft: "auto" }}
        >
          Add More
        </Button>
      </Grid>
    </Grid>
  );
}
