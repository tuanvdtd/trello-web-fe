import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListColumn({ columns }) {
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
          {/* Add new Column */}
          <Box
            sx={{
              minWidth: "180px",
              maxWidth: "180px",
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
        </Box>
      </SortableContext>
    </>
  );
}

export default ListColumn;
