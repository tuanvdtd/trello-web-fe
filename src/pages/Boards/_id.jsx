//Board Details Page
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
// import { mockData } from "~/apis/mockdata";
// import { mapOrder } from "~/utils/sort";
import ActiveCard from "~/components/Modal/ActiveCard/ActiveCard";
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
// import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import BoardSkeleton from "~/components/Skeleton/BoardSkeleton"
import { useLocation } from "react-router-dom";
import { createBoardTour } from "~/utils/driverConfig";


function Board() {
  // const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);
  // Bắt buộc phải lấy đúng tên boardId từ URL params để gọi API
  const { boardId } = useParams();
  // console.log(boardId);
  const location = useLocation();
  
  // Check nếu board mới được tạo
  const isNewBoard = location.state?.isNewBoard || false;
  // console.log('isNewBoard: ', isNewBoard);

  useEffect(() => {
    // const boardId = '6890683a0cef70ebaeac757a';
    // Call API
    setIsLoading(true);
    dispatch(fetchBoardDetailsAPI(boardId)).finally(() => setIsLoading(false));
  }, [dispatch, boardId]);

  useEffect(() => {
    if (!isLoading && board && isNewBoard) {
      // Check xem user đã xem tour chưa
      const hasSeenTour = localStorage.getItem(`board-tour-${board._id}`) === 'true';
      
      if (!hasSeenTour) {
        // Delay một chút để đảm bảo DOM đã render
        const timer = setTimeout(() => {
          const driverObj = createBoardTour(board._id);
          driverObj.drive();
          
          // // Mark tour as seen for this board
          // localStorage.setItem(`board-tour-${boardId}`, 'true');
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, board, isNewBoard]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const boardTourKeys = allKeys.filter(key => key.startsWith('board-tour-'));

    boardTourKeys.forEach(key => {
      if (key !== `board-tour-${boardId}`) {
        localStorage.removeItem(key);
      }
    });
  }, [boardId]);



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

  if (isLoading || !board) return (
    // <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', height: '100vh' ,width:'100vw', gap: 2 }}>
    //   <CircularProgress />
    //   <Typography>Loading board...</Typography>
    // </Box>
    <BoardSkeleton />
  );

  // Nếu board đã được load thành công thì hiển thị giao diện Board
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        {<ActiveCard />}
        <AppBar />
        <Box sx = {{
            height: (theme) => theme.trello.boardBarHeight + theme.trello.boardContentHeight,
            width: "100%",
            backgroundImage: board?.background?.backgroundType === 'image' ? `url(${board.background.backgroundUrl})` :
                             board?.background?.backgroundType === 'gradient' ? board.background.backgroundUrl :
                            'none',
            backgroundColor: board?.background?.backgroundType === 'color' ? board.background.backgroundUrl : (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",}}>

        <BoardBar board={board} />
        <BoardContent 
          board={board}
          
          moveColumnDnd={moveColumnDnd}
          moveCardInSameColumnDnd={moveCardInSameColumnDnd}
          moveCardToDiffColumnDnd={moveCardToDiffColumnDnd}
          />
        </Box>
      </Container>
    </>
  );
}

export default Board;
