import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCard from "./ListCard/ListCard";
// import { mapOrder } from "~/utils/sort";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

function Column({ column, createNewCard, deleteColumn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = column.cards;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const styleDnDColumn = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [openForm, setOpenForm] = useState(false);
  
  const handleToggleForm = () => {
    setOpenForm(!openForm);
  }
  const [newCardTitle, setNewCardTitle] = useState("");

  const addCard = async () => {
    if(!newCardTitle) {
      toast.error("Card title cannot be empty!");
      return;
    }
    // Call the API to add the new card
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData);
    // After successful addition, reset the form
    setNewCardTitle("");
    handleToggleForm();
  }

  const confirm = useConfirm();
  const handleDeleteColumn = async () => {
    const { confirmed } = await confirm({
      title: "Are you sure you want to delete this column?",
      confirmationText: "Delete",
      cancellationText: "Cancel",
      // confirmationButtonProps: { color:"error", variant: "contained" },
      // cancellationButtonProps: { color: "inherit", variant: "outlined" },
      // allowClose: false,
      description: `Type "${column.title}" to confirm your action`,
      confirmationKeyword: `${column.title}`,

    });

    if (confirmed) {
      console.log(column.title);
      // Call the API to delete the column
      deleteColumn(column._id);
      // toast.success("Column deleted successfully!");
      return;
    }

    else {
      toast.info("You cancelled the delete action!");
      return;
    }

  }

  return (
    <>
      <div ref={setNodeRef} style={styleDnDColumn} {...attributes}>
        <Box
          {...listeners}
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: (theme) => theme.trello.columnHeaderHeight,
              p: 2,
              display: "flex",
              direction: "col",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              {column?.title}
            </Typography>
            <Box>
              <Tooltip title="More Actions">
                <KeyboardArrowDownIcon
                  onClick={handleClick}
                  id="basic-icon-title"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Menu
                id="basic-menu-workspace"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-icon-title",
                  },
                }}
              >
                <MenuItem onClick={handleToggleForm} sx = {{
                  '&:hover': {
                    color: 'info.main',
                    '& .add_card_icon': {
                      color: 'info.main',
                    }
                  }
                }}>
                  <ListItemIcon>
                    <AddCardOutlinedIcon fontSize="small" className="add_card_icon" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                      </ListItemIcon>
                    <ListItemText>Copy</ListItemText> 
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                    </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem sx = {{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete_icon': {
                      color: 'warning.dark',
                    }
                  }
                }} onClick={handleDeleteColumn}>
                  <ListItemIcon>
                    <DeleteForeverOutlinedIcon fontSize="small" className="delete_icon"/>
                  </ListItemIcon>
                  <ListItemText>Delete this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* List Card Content */}
          <ListCard cards={orderedCards} />
          {/* Column Footer*/}
          <Box
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!openForm 
            ?
            <Box  sx={{
              width: '100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Button onClick={handleToggleForm} startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
            </Box>
            :
            <Box sx={{
              width: '100%',
              display: "flex",
              alignItems: "center",
              gap: 1
            }}>
             <TextField
                label="Add card..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true" // fix lỗi bôi đen text bị nhả sang kéo thả
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  "& label": {
                    color: "text.primary",
                  },
                  "& input": { color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#333643" : "white"),
                   },
                  "& label.Mui-focused": { color: (theme) => theme.palette.primary.main },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": { borderColor: (theme) => theme.palette.primary.main },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                   "& .MuiOutlinedInput-input": {borderRadius: 1},
                }}
              />
               <Box
               sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:1 }}
             >
              <Button variant="contained" color="success" size="small"
              onClick = {addCard}
              // sx ={{boxShadow: "none",
              //   border:'0.5px solid',
              //   borderColor: (theme) => theme.palette.success.main,
              // }}
              >Add</Button>
              <CloseIcon
                    fontSize="small"
                    onClick={handleToggleForm}
                    sx={{
                      color: (theme) => theme.palette.warning.light,
                      cursor: "pointer",
                    }}
                  />
             </Box>
            </Box>
          }

          </Box>
        </Box>
      </div>
    </>
  );
}

export default Column;
