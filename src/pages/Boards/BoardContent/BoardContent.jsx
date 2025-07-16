import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumn from "./ListColumn/ListColumn";
import { mapOrder } from "~/utils/sort";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumn/Column/Column";
import Card from "./ListColumn/Column/ListCard/TrelloCard";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "COLUMN",
  CARD: "CARD",
};

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

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

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
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5,
        },
      },
    }),
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
