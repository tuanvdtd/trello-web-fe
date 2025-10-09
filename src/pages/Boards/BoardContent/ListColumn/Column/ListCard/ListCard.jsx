import React from 'react'
import Box from '@mui/material/Box'
import TrelloCard from './TrelloCard'
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

function ListCard({ cards }) {
  return (
    <>
      <SortableContext
        items={cards?.map((c) => c._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: '0 5px 5px 5px',
            m: '0 5px',
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                5
              )} - ${theme.trello.columnHeaderHeight} - ${
                theme.trello.columnFooterHeight
              })`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}
        >
          {cards.map((card) => {
            return <TrelloCard key={card?._id} card={card} />
          })}
        </Box>
      </SortableContext>
    </>
  )
}

export default ListCard
