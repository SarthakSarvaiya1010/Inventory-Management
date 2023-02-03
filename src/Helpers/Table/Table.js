import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const useStyles = makeStyles((theme) => ({
  cell_long: {
    width: 300,
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { data, headalEdit, headalDelete, hide } = props;
  console.log(data, "headalEdit", Object.keys(data).length);
  const column = Object.keys(data[0]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontSize: "1.25rem",
              },
            }}
          >
            <StyledTableCell align="right">sr no</StyledTableCell>
            {column.map((data) => (
              <StyledTableCell align="right">{data}</StyledTableCell>
            ))}
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            index++;
            return (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{index}</StyledTableCell>

                {column.map((v) => (
                  <StyledTableCell
                    align="right"
                    sx={{
                      color:
                        row[v] === "YES"
                          ? "green"
                          : row[v] === "NO"
                          ? "red"
                          : "black",
                    }}
                  >
                    {row[v]}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="right" className={classes.cell_long}>
                  {!hide ? (
                    <>
                      <IconButton onClick={() => headalEdit(index)}>
                        <EditIcon fontSize="17px" />
                        <Typography
                          variant="h6"
                          component="text"
                          sx={{
                            fontSize: "17px",
                            marginLeft: "5px",
                          }}
                        >
                          Edit
                        </Typography>
                      </IconButton>
                    </>
                  ) : (
                    ""
                  )}
                  <IconButton onClick={() => headalDelete(index)}>
                    <DeleteIcon fontSize="17px" />

                    <Typography
                      variant="h6"
                      component="text"
                      sx={{ fontSize: "17px", marginLeft: "5px" }}
                    >
                      Delete
                    </Typography>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
