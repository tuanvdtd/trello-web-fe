//Board Details Page
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar/AppBar.jsx";

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <Box
          sx={{
            backgroundColor: "primary.dark",
            height: (theme) => theme.trello.boardBarHeight,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          BoardBar
        </Box>
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
