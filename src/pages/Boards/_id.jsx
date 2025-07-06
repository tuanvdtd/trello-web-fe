//Board Details Page
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "~/pages/Boards/BoardBar.jsx";

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar />
        <Box
          sx={{
            backgroundColor: "primary.main",
            height: (theme) =>
              `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Board Content
        </Box>
      </Container>
    </>
  );
}

export default Board;
