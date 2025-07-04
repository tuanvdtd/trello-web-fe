import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";

function App() {
  return (
    <>
      <h1>Hello world</h1>
      <Button variant="contained">Hello world</Button>
      <Button startIcon={<Delete />} />
    </>
  );
}

export default App;
