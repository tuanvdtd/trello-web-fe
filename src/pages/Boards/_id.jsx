//Board Details Page
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "~/pages/Boards/BoardBar.jsx";
import BoardContent from "~/pages/Boards/BoardContent.jsx";

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar />
        <BoardContent />
      </Container>
    </>
  );
}

export default Board;
