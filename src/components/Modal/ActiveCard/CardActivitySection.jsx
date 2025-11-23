import { useState } from 'react'
import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'


function CardActivitySection({ onAddCardComment, onUpdateCardComment, onDeleteCardComment, comments = [] }) {
  const currentUser = useSelector(selectCurrentUser)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null)
  const [editingCommentIndex, setEditingCommentIndex] = useState(null)
  const [editContent, setEditContent] = useState('')

  const handleAddCardComment = (event) => {
    // Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
      if (!event.target?.value) return // Nếu không có giá trị gì thì return không làm gì cả

      // Tạo một biến commend data để gửi api
      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      }
      onAddCardComment(commentToAdd).then(() => {
        // console.log(commentToAdd)
        event.target.value = '' // Xóa giá trị trong ô input
      })
    }
  }

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedCommentIndex(index)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedCommentIndex(null)
  }

  const handleEditComment = () => {
    const comment = comments[selectedCommentIndex]
    setEditContent(comment.content)
    setEditingCommentIndex(selectedCommentIndex)
    handleCloseMenu()
  }

  const handleSaveEdit = (commentId) => {
    if (!editContent.trim()) return
    const content = editContent.trim()

    onUpdateCardComment(commentId, content).then(() => {
      setEditingCommentIndex(null)
      setEditContent('')
    })
    // console.log({ commentId, editContent: editContent.trim() })
  }

  const handleCancelEdit = () => {
    setEditingCommentIndex(null)
    setEditContent('')
  }

  const handleDeleteComment = () => {
    const comment = comments[selectedCommentIndex]
    onDeleteCardComment(comment._id)
    handleCloseMenu()
  }


  return (
    <Box sx={{ mt: 2 }}>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer' }}
          alt={currentUser?.displayName}
          src={currentUser?.avatar}
        />
        <TextField
          fullWidth
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
        />
      </Box>

      {/* Hiển thị danh sách các comments */}
      {comments.length === 0 &&
        <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>No activity found!</Typography>
      }
      {comments.map((comment, index) =>
        <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={comment._id}>
          <Tooltip title={comment.userEmail} arrow>
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt={comment.userDisplayName}
              src={comment.userAvatar}
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  {comment.userDisplayName}
                </Typography>

                <Typography variant="span" sx={{ fontSize: '12px' }}>
                  {moment(comment.createdAt).format('llll')}
                </Typography>
              </Box>

              {/* Hiển thị three-dot menu chỉ cho comments của user hiện tại */}
              {comment.userId === currentUser?._id && (
                <IconButton
                  size="small"
                  onClick={(e) => handleOpenMenu(e, index)}
                  sx={{ ml: 1 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {editingCommentIndex === index ? (
              // Chế độ edit
              <Box sx={{ mt: 1 }}>
                <TextField
                  autoFocus
                  fullWidth
                  multiline
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  variant="outlined"
                  sx= {{ '& .MuiInputBase-root': {
                    height: 42// chiều cao container input
                  } }}
                />
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleSaveEdit(comment._id)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              // Chế độ view
              <Box sx={{
                display: 'block',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
                p: '8px 12px',
                mt: '4px',
                border: '0.5px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                wordBreak: 'break-word',
                boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
              }}>
                {comment.content}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Menu cho Edit và Delete */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditComment}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteComment}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default CardActivitySection
