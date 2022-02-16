import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface TableProps {
  breedsData: Array<object>;
  fetchCatImages: Function;
  handleOpen: Function;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableStyle = { minWidth: 700 };

const LinkStyle = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline",
};

const TitleStyle = { flex: "1 1 100%" };

function createData(
  id: any,
  name: string,
  temperament: string,
  origin: number,
  adaptability: number,
  affectionLevel: number,
  dogFriendly: number,
  energyLevel: number
) {
  return {
    id,
    name,
    temperament,
    origin,
    adaptability,
    affectionLevel,
    dogFriendly,
    energyLevel,
  };
}

export default function CustomizedTables({
  breedsData,
  fetchCatImages,
  handleOpen,
}: TableProps) {
  const rows = breedsData.map((item: any) =>
    createData(
      item.id,
      item.name,
      item.temperament,
      item.origin,
      item.adaptability,
      item.affection_level,
      item.dog_friendly,
      item.energy_level
    )
  );

  return (
    <>
      <Typography sx={TitleStyle} variant="h4" id="tableTitle" component="div">
        Cat Breeds around the World
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={TableStyle} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Temperament</StyledTableCell>
              <StyledTableCell align="left">Origin</StyledTableCell>
              <StyledTableCell align="center">Adaptability</StyledTableCell>
              <StyledTableCell align="center">
                Affection&nbsp;Level
              </StyledTableCell>
              <StyledTableCell align="center">
                Dog&nbsp;Friendly
              </StyledTableCell>
              <StyledTableCell align="center">
                Energy&nbsp;Level
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((rows: any) => (
              <StyledTableRow key={rows.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={LinkStyle}
                  onClick={() => {
                    fetchCatImages(rows.id);
                    handleOpen();
                  }}
                >
                  {rows.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {rows.temperament}
                </StyledTableCell>
                <StyledTableCell align="left">{rows.origin}</StyledTableCell>
                <StyledTableCell align="center">
                  {rows.adaptability}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rows.affectionLevel}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rows.dogFriendly}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rows.energyLevel}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
