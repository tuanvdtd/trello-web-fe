import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { CARD_MEMBER_ACTIONS } from '~/utils/constants'

function CardUserGroup({ cardMemberIds = [], onHandleUpdateCardMembers }) {
  /**
   * Xử lý Popover để ẩn hoặc hiện toàn bộ user trên một cái popup, tương tự docs để tham khảo ở đây:
   * https://mui.com/material-ui/react-popover/
   */
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const containerRef = useRef(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined

  const handleTogglePopover = () => {
    if (!anchorPopoverElement) {
      setAnchorPopoverElement(containerRef.current)
    } else {
      setAnchorPopoverElement(null)
    }
  }

  const activeBoard = useSelector(selectCurrentActiveBoard)
  const boardMembers = activeBoard.allUsers

  const cardMembers = cardMemberIds.map(memberId => {
    return boardMembers.find(user => user._id === memberId)
  })

  const handleUpdateCardMember = (userId) => {
    const updateMemberCardData = {
      userId: userId,
      action: cardMemberIds.includes(userId) ? CARD_MEMBER_ACTIONS.REMOVE : CARD_MEMBER_ACTIONS.ADD
    }
    onHandleUpdateCardMembers(updateMemberCardData)
  }

  // Lọc members theo search
  const filteredBoardMembers = boardMembers.filter(user =>
    user.displayName.toLowerCase().includes(searchValue.toLowerCase())
  )

  const boardMembersNotInCard = filteredBoardMembers.filter(user => !cardMemberIds.includes(user._id))

  // Lưu ý ở đây chúng ta không dùng Component AvatarGroup của MUI bởi nó không hỗ trợ tốt trong việc chúng ta cần custom & trigger xử lý phần tử tính toán cuối, đơn giản là cứ dùng Box và CSS - Style đám Avatar cho chuẩn kết hợp tính toán một chút thôi.
  return (
    <Box ref={containerRef} sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {/* Hiển thị các user là thành viên của card */}
      {cardMembers.map((user, index) =>
        <Tooltip title={user?.displayName} key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt={user?.displayName}
            src={user?.avatar}
          />
        </Tooltip>
      )}

      {/* Nút này để mở popover thêm member */}
      <Tooltip title="Add new member">
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '50%',
            color: (theme) => isOpenPopover
              ? (theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4')
              : (theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d'),
            bgcolor: (theme) => isOpenPopover
              ? (theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff')
              : (theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200]),
            '&:hover': {
              color: (theme) => theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng
      Click chọn thêm vào card  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPopover-paper': {
            mt: 1
          }
        }}
      >
        <Box sx={{ width: '300px', maxHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{
            p: 1.5,
            borderBottom: '1px solid',
            borderColor: (theme) => theme.palette.divider,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
              Thành viên
            </Typography>
            <IconButton
              size="small"
              onClick={handleTogglePopover}
              sx={{ position: 'absolute', right: 4 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Search Input */}
          <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: (theme) => theme.palette.divider }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm các thành viên"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '14px'
                }
              }}
            />
          </Box>

          {/* Members List */}
          <Box sx={{ p: 1.5, overflowY: 'auto' }}>
            {/* Thành viên của thẻ */}
            {cardMembers.filter(user => user.displayName.toLowerCase().includes(searchValue.toLowerCase())).length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Thành viên của thẻ
                </Typography>
                {cardMembers
                  .filter(user => user.displayName.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((user, index) => (
                    <Box
                      key={index}
                      onClick={() => handleUpdateCardMember(user._id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#f1f2f4'
                        }
                      }}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt={user.displayName}
                        src={user.avatar}
                      />
                      <Typography sx={{ fontSize: '14px', flex: 1 }}>
                        {user.displayName}
                      </Typography>
                      <CloseIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </Box>
                  ))}
              </Box>
            )}

            {/* Thành viên của bảng */}
            {boardMembersNotInCard.length > 0 && (
              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Thành viên của bảng
                </Typography>
                {boardMembersNotInCard.map((user, index) => (
                  <Box
                    key={index}
                    onClick={() => handleUpdateCardMember(user._id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : '#f1f2f4'
                      }
                    }}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={user.displayName}
                      src={user.avatar}
                    />
                    <Typography sx={{ fontSize: '14px' }}>
                      {user.displayName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
