import { Link } from "react-router-dom";

export const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0,
    renderCell: ({ value }) => {
      return <Link to={`/company/${value}`}>{value}</Link>;
    }
  },
  {
    field: "name",
    headerName: "Company",
    description: "Company's name",
    type: "text",
    width: 150
  },
  {
    field: "found_date",
    headerName: "Founded",
    type: "number",
    flex: 0,
    valueFormatter: (params) => {
      return `${params.value}`;
    }
  },
  {
    field: "description",
    headerName: "Description",
    flex: 4,
    description: "Description of the company.",
    sortable: false,
    width: 200
  },
  {
    field: "headquarter",
    headerName: "HQ",
    flex: 2
  },
  {
    field: "technologies",
    headerName: "Technologies",
    flex: 2
  },
  {
    field: "developer",
    headerName: "# Devs",
    width: 120,
    type: "number"
  },
  {
    field: "tm_rating",
    headerName: "⭐",
    description: "TechMiners' Score",
    type: "number"
  }
];
