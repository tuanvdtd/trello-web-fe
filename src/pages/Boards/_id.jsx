//Board Details Page
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
// import { mockData } from "~/apis/mockdata";
import{ fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from "~/apis/index";
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty} from "lodash"



function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = '6890683a0cef70ebaeac757a';
    fetchBoardDetailsAPI(boardId).then((board) => {
      /*Nếu dnd kéo thả đã update vào database => Không cần nữa vì khi tạo mới column đã thêm rồi, nên khi f5 lại cũng không cần check column rỗng nữa => Có thể bỏ phần này đi */
      board.columns.forEach((column) => {
        //Nếu column không có cards thì tạo một card giả để phục vụ kéo thả dnd
        if(isEmpty(column.cards)) {
          const card = generatePlaceholderCard(column._id);
          column.cards = [card];
          column.cardOrderIds = [card._id];
        }
      });
      setBoard(board);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    });

    // Tạo một card giả để phục vụ kéo thả dnd khi tạo mới column mà chưa có card nào
    const card = generatePlaceholderCard(createdColumn._id);
    createdColumn.cards = [card];
    createdColumn.cardOrderIds = [card._id];
    
    // Cập nhật lại state bên Fe, tránh gọi lại api fetchBoardDetailsAPI  gây mất thời gian
    const updateBoard = {...board}
    updateBoard.columns.push(createdColumn)
    updateBoard.columnOrderIds.push(createdColumn._id);
    setBoard(updateBoard);
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });
    

    // Cập nhật lại state bên Fe, tránh gọi lại api fetchBoardDetailsAPI  gây mất thời gian
    const updateBoard = {...board}
    const updateColumn =  updateBoard.columns.find(column => column._id === createdCard.columnId);
    updateColumn.cards.push(createdCard);
    updateColumn.cardOrderIds.push(createdCard._id);
    setBoard(updateBoard);
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
      </Container>
    </>
  );
}

export default Board;
