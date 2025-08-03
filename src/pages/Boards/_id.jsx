//Board Details Page
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent.jsx";
// import { mockData } from "~/apis/mockdata";
import{ fetchBoardDetailsAPI } from "~/apis/index.js";

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = '688eda486716600a03c62be8';
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} />
      </Container>
    </>
  );
}

export default Board;
