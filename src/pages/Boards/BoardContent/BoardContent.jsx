import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumn from "./ListColumn/ListColumn";
import { mapOrder } from "~/utils/sort";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  // const pointer = useSensor(PointerSensor, {
  //   // Require the mouse to move by 10 pixels before activating
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      "_id"
    );
    setOrderedColumnsState(orderedColumns);
  }, [board]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(
        (column) => column._id === active.id
      );
      const newIndex = orderedColumnsState.findIndex(
        (column) => column._id === over.id
      );
      const dnd = arrayMove(orderedColumnsState, oldIndex, newIndex);
      // const dndColumnIds = dnd.map((column) => column._id);

      setOrderedColumnsState(dnd);
    }
  };
  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            height: (theme) => theme.trello.boardContentHeight,
            width: "100%",
            p: "10px 0",
          }}
        >
          <ListColumn columns={orderedColumnsState} />
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
