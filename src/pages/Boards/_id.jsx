//Board Details Page
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
// import { mockData } from "~/apis/mockdata";
// import { mapOrder } from "~/utils/sort";
import{
  updateColumnDetailsAPI,
  updateBoardDetailsAPI,
  moveCardToDiffColumnAPI,
} from "~/apis/index";
import { cloneDeep } from "lodash"
import  Box  from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import  Typography  from "@mui/material/Typography";
import { fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'



function Board() {
  // const [board, setBoard] = useState(null);
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);
  // Bắt buộc phải lấy đúng tên boardId từ URL params để gọi API
  const { boardId } = useParams();
  // console.log(boardId);

  useEffect(() => {
    // const boardId = '6890683a0cef70ebaeac757a';
    // Call API
    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);

  const moveColumnDnd =  (dnd) => {
    const dndColumnIds = dnd.map((column) => column._id);
    const updateBoard = cloneDeep(board);
    updateBoard.columnOrderIds = dndColumnIds;
    updateBoard.columns = dnd;
    // setBoard(updateBoard);
    dispatch(updateCurrentActiveBoard(updateBoard));
    updateBoardDetailsAPI(updateBoard._id, {columnOrderIds: dndColumnIds})
  }

  const moveCardInSameColumnDnd =  (dndCards, dndCardIds, columnId) => {
    const updateBoard = cloneDeep(board);
    const updateColumn = updateBoard.columns.find(column => column._id === columnId);
    updateColumn.cardOrderIds = dndCardIds;
    updateColumn.cards = dndCards;
    // setBoard(updateBoard);
    dispatch(updateCurrentActiveBoard(updateBoard));
    updateColumnDetailsAPI(updateColumn._id, {cardOrderIds: dndCardIds});
  }

  const moveCardToDiffColumnDnd =  (cardId, preColumnId, nextColumnId, dndColumnsData) => {
    const dndColumnIds = dndColumnsData.map((column) => column._id);
    const updateBoard = cloneDeep(board);
    updateBoard.columnOrderIds = dndColumnIds;
    updateBoard.columns = dndColumnsData;
    // setBoard(updateBoard);
    dispatch(updateCurrentActiveBoard(updateBoard));
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

  if (!board) return (
    <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', height: '100vh' ,width:'100vw', gap: 2 }}>
      <CircularProgress />
      <Typography>Loading board...</Typography>
    </Box>
  );

  // Nếu board đã được load thành công thì hiển thị giao diện Board
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent 
          board={board}

          moveColumnDnd={moveColumnDnd}
          moveCardInSameColumnDnd={moveCardInSameColumnDnd}
          moveCardToDiffColumnDnd={moveCardToDiffColumnDnd}
        />
      </Container>
    </>
  );
}

export default Board;
