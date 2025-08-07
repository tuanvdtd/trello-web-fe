import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumn from "./ListColumn/ListColumn";
// import { mapOrder } from "~/utils/sort";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  // PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {MouseSensor,TouchSensor} from '~/customLib/DndSensors';
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumn/Column/Column";

import { cloneDeep, isEmpty } from "lodash";
import TrelloCard from "./ListColumn/Column/ListCard/TrelloCard";
import { generatePlaceholderCard } from "~/utils/formatter";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "COLUMN",
  CARD: "CARD",
};

function BoardContent({ board, createNewColumn, createNewCard, moveColumnDnd, moveCardInSameColumnDnd, moveCardToDiffColumnDnd }) {
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
  const [preActiveDragColumn, setPreActiveDragColumn] = useState(null);

  useEffect(() => {
    const orderedColumns = board?.columns;
    setOrderedColumnsState(orderedColumns);
  }, [board]);



  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    if (event?.active?.data?.current?.columnId) {
      setPreActiveDragColumn(findColumnById(event?.active?.id));
    }
    setActiveDragItemData(event?.active?.data?.current);
  };

  const findColumnById = (cardId) => {
    return orderedColumnsState.find((column) =>
      column?.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  const moveCardBetweenDiffColumns = (overColumn, 
    overCardId, 
    active,
    over, 
    activeColumn, 
    activeDraggingCardId, 
    activeDraggingCardData,
    isDragEnd
  ) => {
      setOrderedColumnsState((prev) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );
        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prev);

        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          //
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );
          if (isEmpty(nextActiveColumn.cards)) {
            nextActiveColumn.cards = [
              generatePlaceholderCard(nextActiveColumn._id),
            ];
          }
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }
        if (nextOverColumn) {
          //
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            { ...activeDraggingCardData, columnId: nextOverColumn._id }
          );
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.isPlaceHolderCard)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }
        if( isDragEnd === 'dragEnd') {
          // Gọi hàm ở đây để cập nhật lại thứ tự card trong cùng 1 column
          moveCardToDiffColumnDnd(activeDraggingCardId, preActiveDragColumn._id, nextOverColumn._id, nextColumns)
        }
        return nextColumns;
      });
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;

    if (!over || !active) return;

    if (active.id !== over.id) {
      console.log("Hanh dong keo tha card");
    }

    // activeDraggingCardData = active.data.current;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;
    const activeColumn = findColumnById(activeDraggingCardId);
    const overColumn = findColumnById(overCardId);
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
  }
};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;
      const activeColumn = findColumnById(activeDraggingCardId);
      const overColumn = findColumnById(overCardId);
      if (!activeColumn || !overColumn) return;
      // console.log("Active: ", activeColumn);
      // console.log("Over: ", overColumn);
      // Nếu kéo thả 2 card giữa column khác nhau
      if (preActiveDragColumn._id !== overColumn._id) {
        // console.log("Moving card to a different column");
        moveCardBetweenDiffColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'dragEnd'
      );
      } else {
        // console.log("Same column, no action needed");
        const oldIndex = preActiveDragColumn?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        );
        const newIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );
        const dndCards = arrayMove(
          preActiveDragColumn?.cards,
          oldIndex,
          newIndex
        );
        const dndCardIds = dndCards.map((card) => card._id);
        setOrderedColumnsState((prev) => {
          const nextColumns = cloneDeep(prev);
          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          );
          targetColumn.cards = dndCards;
          targetColumn.cardOrderIds = dndCards.map((card) => card._id);
          return nextColumns;
        });
        
        // if(oldIndex !== newIndex) {
        //   moveCardInSameColumnDnd(dndCards, dndCardIds, preActiveDragColumn._id);
        // }
        if (oldIndex === newIndex) 
          return;
        //Gọi hàm ở đây để cập nhật lại thứ tự card trong cùng 1 column
        moveCardInSameColumnDnd(dndCards, dndCardIds, preActiveDragColumn._id);
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumnsState.findIndex(
          (column) => column._id === active.id
        );
        const newIndex = orderedColumnsState.findIndex(
          (column) => column._id === over.id
        );
        const dnd = arrayMove(orderedColumnsState, oldIndex, newIndex);
         setOrderedColumnsState(dnd);
        // const dndColumnIds = dnd.map((column) => column._id);
        //Viết API cập nhật lại thứ tự cột
        moveColumnDnd(dnd);
      }
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setPreActiveDragColumn(null);
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
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
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
          <ListColumn columns={orderedColumnsState} createNewColumn={createNewColumn} createNewCard={createNewCard} />
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <TrelloCard card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
