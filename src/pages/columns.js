import { Link } from "react-router-dom";

export const columns = [
  {
    field: "name",
    headerName: "Breed",
    description: "Breed",
    type: "text",
    width: 150
  },
  {
    field: "temperament",
    headerName: "Temperament",
    type: "text",
    flex: 1
  },
  {
    field: "breed_id",
    headerName: "Breed Info",
    width: 150,
    renderCell: ({ value }) => {
      return <Link to={`/breeds/breed/${value}`}>{value}</Link>;
    }
  },
  {
    field: "id",
    headerName: "Cats",
    width: 150,
    renderCell: ({ value }) => {
      return <Link to={`/breeds/cats/${value}`}>🐈🐈</Link>;
    }
  }
];
