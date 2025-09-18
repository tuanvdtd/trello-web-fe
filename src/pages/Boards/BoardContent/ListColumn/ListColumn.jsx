import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import  { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash"
import{ createNewColumnAPI } from "~/apis/index";
import { generatePlaceholderCard } from '~/utils/formatter'
import {updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux';

function ListColumn({ columns }) {
  const [openForm, setOpenForm] = useState(false);
  
  const handleToggleForm = () => {
    setOpenForm(!openForm);
  }
  const [newColumnTitle, setNewColumnTitle] = useState("");
  // Board
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  const addColumn = async () => {
    if(!newColumnTitle) {
      toast.error("Column title cannot be empty!");
      return;
    }
    // Call the API to add the new column
    const newColumnData = {
      title: newColumnTitle
    };

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    });
    

    // Tạo một card giả để phục vụ kéo thả dnd khi tạo mới column mà chưa có card nào
    const card = generatePlaceholderCard(createdColumn._id);
    createdColumn.cards = [card];
    createdColumn.cardOrderIds = [card._id];
    
    // Cập nhật lại state bên Fe, tránh gọi lại api fetchBoardDetailsAPI  gây mất thời gian
    const updateBoard = cloneDeep(board);
    updateBoard.columns.push(createdColumn)
    updateBoard.columnOrderIds.push(createdColumn._id);
    // setBoard(updateBoard);
    dispatch(updateCurrentActiveBoard(updateBoard));

    // After successful addition, reset the form
    setNewColumnTitle("");
    handleToggleForm();
  }

  return (
    <>
      <SortableContext
        items={columns?.map((c) => c._id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            gap: 1,
            overflowY: "hidden",
            overflowX: "auto",
            "&::-webkit-scrollbar-track": { m: 2 },
          }}
        >
          {columns?.map((column) => {
            return <Column key={column?._id} column={column} />;
          })}
          {!openForm
            ?
            <Box
             onClick={handleToggleForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              bgcolor: "#ffffff3d",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
          :
           <Box sx={{ 
              minWidth: "250px",
              maxWidth: "250px",
              // bgcolor: "#ffffff3d",
              bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
              mx: 2,
              p: 1.5,
              borderRadius: "6px",
              height: "fit-content", 
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}>
             <TextField
               label="Add column..."
               type="text"
               size="small"
               variant="outlined"
               autoFocus
               value={newColumnTitle}
               onChange={(e) => setNewColumnTitle(e.target.value)}
              //  sx={{
              //    "& label": {
              //      color: "black",
              //    },
              //    "& input": { color: "black" },
              //    "& label.Mui-focused": { color: "black" },
              //    "& .MuiOutlinedInput-root": {
              //      "& fieldset": {
              //        borderColor: "blue",
              //      },
              //      "&:hover fieldset": { borderColor: "black" },
              //      "&.Mui-focused fieldset": {
              //        borderColor: "blue",
              //      },
              //    },
              //  }}
              sx={{"& input": { 
                // color: (theme) => theme.palette.primary.main,
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "#333643" : "white"),
                   }}}
             />
             <Box
               sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
             >
              <Button variant="contained" color="success" size="small"
              onClick = {addColumn} className="interceptor-loading"
              // sx ={{boxShadow: "none",
              //   border:'0.5px solid',
              //   borderColor: (theme) => theme.palette.success.main,
              // }}
              >Add column</Button>
              <CloseIcon
                    fontSize="small"
                    onClick={handleToggleForm}
                    sx={{
                      // color: "black",
                      cursor: "pointer",
                      mr:1,
                      '&:hover' : {color: (theme) => theme.palette.warning.light}
                    }}
                  />
             </Box>
            </Box>
          }
          
        </Box>
      </SortableContext>
    </>
  );
}

export default ListColumn;
