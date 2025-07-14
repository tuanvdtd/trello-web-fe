import React from "react";
import Box from "@mui/material/Box";
import TrelloCard from "./TrelloCard";

function ListCard({ cards }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: "0 5px",
          m: "0 5px",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${
              theme.trello.columnHeaderHeight
            } - ${theme.trello.columnFooterHeight})`,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards.map((card) => {
          return <TrelloCard key={card?._id} card={card} />;
        })}
      </Box>
    </>
  );
}

export default ListCard;
