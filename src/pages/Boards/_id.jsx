//Board Details Page
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
// import { mockData } from "~/apis/mockdata";
import { mapOrder } from "~/utils/sort";
import{ fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI,
  updateColumnDetailsAPI,
  updateBoardDetailsAPI,
  moveCardToDiffColumnAPI,
  deleteColumnAPI 
} from "~/apis/index";
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty} from "lodash"
import  Box  from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import  Typography  from "@mui/material/Typography";
import { toast } from "react-toastify";



function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '6890683a0cef70ebaeac757a';
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự column theo columnOrderIds từ trên root cao nhất
      board.columns =  mapOrder(
            board?.columns,
            board?.columnOrderIds,
            "_id"
          );
      /*Nếu dnd kéo thả đã update vào database => Không cần nữa vì khi tạo mới column đã thêm rồi, nên khi f5 lại cũng không cần check column rỗng nữa => Có thể bỏ phần này đi */
      board.columns.forEach((column) => {
        //Nếu column không có cards thì tạo một card giả để phục vụ kéo thả dnd
        if(isEmpty(column.cards)) {
          const card = generatePlaceholderCard(column._id);
          column.cards = [card];
          column.cardOrderIds = [card._id];
        } else {
          // Nếu column có cards thì sắp xếp thứ tự cards theo cardOrderIds ngay từ trên root
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
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
    // console.log("🚀 ~ createNewCard ~ updateColumn:", updateColumn)
    // Nếu tạo card vào 1 column rỗng thì xóa placeholder card đi
    if(updateColumn.cards.some(card => card.isPlaceHolderCard)) {
      updateColumn.cards= [createdCard];
      updateColumn.cardOrderIds = [createdCard._id];
    } else {
      // Nếu column đã có card thì push card mới vào cuối mảng
    updateColumn.cards.push(createdCard);
    updateColumn.cardOrderIds.push(createdCard._id);
    }
    setBoard(updateBoard);
  }

  const moveColumnDnd =  (dnd) => {
    const dndColumnIds = dnd.map((column) => column._id);
    const updateBoard = {...board}
    updateBoard.columnOrderIds = dndColumnIds;
    updateBoard.columns = dnd;
    setBoard(updateBoard);
    updateBoardDetailsAPI(updateBoard._id, {columnOrderIds: dndColumnIds})
  }

  const moveCardInSameColumnDnd =  (dndCards, dndCardIds, columnId) => {
    const updateBoard = {...board}
    const updateColumn = updateBoard.columns.find(column => column._id === columnId);
    updateColumn.cardOrderIds = dndCardIds;
    updateColumn.cards = dndCards;
    setBoard(updateBoard);
    updateColumnDetailsAPI(updateColumn._id, {cardOrderIds: dndCardIds});
  }

  const moveCardToDiffColumnDnd =  (cardId, preColumnId, nextColumnId, dndColumnsData) => {
    const dndColumnIds = dndColumnsData.map((column) => column._id);
    const updateBoard = {...board}
    updateBoard.columnOrderIds = dndColumnIds;
    updateBoard.columns = dndColumnsData;
    setBoard(updateBoard);
    // Nếu column chỉ còn chứa placeholder card thì chỉ gửi mảng rỗng lên cho backend
    let preCardOrderIds = dndColumnsData.find(column => column._id === preColumnId).cardOrderIds;
    if( preCardOrderIds[0].includes('placeholder-card')) {
      preCardOrderIds = []
    }
    
    moveCardToDiffColumnAPI({
      cardId,
      preColumnId,
      preCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndColumnsData.find(column => column._id === nextColumnId).cardOrderIds,
    })
   
  }

   const deleteColumn =  (columnId) => {
    const updateBoard = {...board}
    updateBoard.columns = updateBoard.columns.filter(column => column._id !== columnId);
    updateBoard.columnOrderIds = updateBoard.columnOrderIds.filter(id => id !== columnId);
    setBoard(updateBoard);
    deleteColumnAPI(columnId).then(() => {
      toast.success("Column deleted successfully!");
    })
  }

  if (!board) return (
    <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', height: '100vh' ,width:'100vw', gap: 2 }}>
      <CircularProgress />
      <Typography>Loading board...</Typography>
    </Box>
  );

 

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} 
        moveColumnDnd={moveColumnDnd} 
        moveCardInSameColumnDnd={moveCardInSameColumnDnd}
        moveCardToDiffColumnDnd={moveCardToDiffColumnDnd}
        deleteColumn={deleteColumn}
        />
      </Container>
    </>
  );
}

export default Board;
