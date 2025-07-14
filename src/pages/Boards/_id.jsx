//Board Details Page
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent.jsx";
import { mockData } from "~/apis/mockdata";

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={mockData?.board} />
        <BoardContent board={mockData?.board} />
      </Container>
    </>
  );
}

export default Board;
