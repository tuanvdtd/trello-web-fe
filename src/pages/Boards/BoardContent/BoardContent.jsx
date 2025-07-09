import Box from "@mui/material/Box";
import ListColumn from "./ListColumn/ListColumn";

function BoardContent() {
  return (
    <>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          height: (theme) => theme.trello.boardContentHeight,
          width: "100%",
          p: "10px 0",
        }}
      >
        <ListColumn />
      </Box>
    </>
  );
}

export default BoardContent;
