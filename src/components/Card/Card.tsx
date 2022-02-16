import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CardStyle = {
  minWidth: 375,
  maxWidth: 325,
};

export default function BasicCard({ item }: { item: any }) {
  return (
    <Card sx={CardStyle} key={item.id}>
      <CardContent>
        <img alt="Cat" src={item.url} width="350" height="300" />
      </CardContent>
    </Card>
  );
}
