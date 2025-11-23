import React from 'react'
// import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { updateCurrentActiveCard, showActiveCardModal } from '~/redux/activeCard/activeCardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { MessageSquare, Paperclip, UsersRound, Users } from 'lucide-react'

function TrelloCard({ card }) {
  const dispatch = useDispatch()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const styleDnDCard = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2980b9' : undefined
    // cursor: isDragging ? 'grabbing' : 'grab'
  }

  const isShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    )
  }

  const activeBoard = useSelector(selectCurrentActiveBoard)
  const boardMembers = activeBoard.allUsers

  const cardMembers = card?.memberIds?.map(memberId => {
    return boardMembers.find(user => user._id === memberId)
  })

  return (
    <>
      <Card
        onClick={() => {
          // Gán currentActiveCard vào redux
          dispatch(updateCurrentActiveCard(card))
          // Mở modal hiển thị chi tiết card
          dispatch(showActiveCardModal())
        }}
        ref={setNodeRef}
        style={styleDnDCard}
        {...attributes}
        {...listeners}
        // className={`dnd-draggable ${card?.isPlaceHolderCard ? '' : 'dnd-card'}`}
        sx={{
          // cursor: card?.isPlaceHolderCard ? 'default' : 'grab', // Conditional cursor
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: card?.isPlaceHolderCard ? 'hidden' : 'unset',
          // overflow: "unset",
          // display: card?.isPlaceHolderCard ? "none" : "block",
          height: card?.isPlaceHolderCard ? '0px' : 'unset',
          // border: "1px solid transparent",
          border: card?.isPlaceHolderCard ? 'unset' : '1px solid transparent',
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.main
          }
        }}
      >
        {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>
        {isShowCardActions() && (
          <CardActions sx={{ p: '0 4px 8px 4px' }}>
            {/* {!!card?.memberIds?.length && (
              <Button size="small" startIcon={<GroupIcon />}>
                {card?.memberIds.length}
              </Button>
            )}
            {!!card?.comments?.length && (
              <Button size="small" startIcon={<ModeCommentIcon />}>
                {card?.comments.length}
              </Button>
            )}
            {!!card?.attachments?.length && (
              <Button size="small" startIcon={<AttachmentIcon />}>
                {card?.attachments.length}
              </Button>
            )} */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                {!!card?.memberIds?.length && (
                  <Button className="flex items-center gap-1 text-xs">
                    <Users className="w-3.5 h-3.5" />
                    <span>{card?.memberIds.length}</span>
                  </Button>
                )}
                {!!card?.comments?.length && (
                  <Button className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{card?.comments.length}</span>
                  </Button>
                )}
                {!!card?.attachments?.length && (
                  <Button className="flex items-center gap-1 text-xs">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{card?.attachments.length}</span>
                  </Button>
                )}
              </div>
              {cardMembers.length > 0 && (
                <Button className="flex -space-x-2">
                  {cardMembers.slice(0, 2).map(user => (
                    <img
                      key={user._id}
                      src={user.avatar}
                      alt={user.username}
                      className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-gray-300"
                      title={user.username}
                    />
                  ))}
                  {cardMembers.length > 2 && (
                    <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs bg-gray-200 text-gray-600
                    }`}>
                      +{cardMembers.length - 2}
                    </div>
                  )}
                </Button>
              )}
            </div>
          </CardActions>
        )}
      </Card>
    </>
  )
}

export default TrelloCard
