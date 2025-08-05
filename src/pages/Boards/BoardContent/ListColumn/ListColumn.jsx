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

function ListColumn({ columns }) {
  const [openForm, setOpenForm] = useState(false);
  
  const handleToggleForm = () => {
    setOpenForm(!openForm);
  }
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const addColumn = () => {
    if(!newColumnTitle) return;
      // Call the API to add the new column
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
          {columns.map((column) => {
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
              bgcolor: "#ffffff3d",
              mx: 2,
              p: 1,
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
               sx={{
                 "& label": {
                   color: "white",
                 },
                 "& input": { color: "white" },
                 "& label.Mui-focused": { color: "white" },
                 "& .MuiOutlinedInput-root": {
                   "& fieldset": {
                     borderColor: "white",
                   },
                   "&:hover fieldset": { borderColor: "white" },
                   "&.Mui-focused fieldset": {
                     borderColor: "white",
                   },
                 },
               }}
             />
             <Box
               sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
             >
              <Button variant="contained" color="success" size="small"
              onClick = {addColumn}
              // sx ={{boxShadow: "none",
              //   border:'0.5px solid',
              //   borderColor: (theme) => theme.palette.success.main,
              // }}
              >Add column</Button>
              <CloseIcon
                    fontSize="small"
                    onClick={handleToggleForm}
                    sx={{
                      color: "white",
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
