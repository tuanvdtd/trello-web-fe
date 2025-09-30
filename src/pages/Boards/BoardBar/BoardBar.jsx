import { useState } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
// import Avatar from "@mui/material/Avatar";
// import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from '@mui/material/Tooltip'
// import Button from "@mui/material/Button";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from '~/utils/formatter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
import BackgroundSelector from '~/components/BackgroundSelector'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import { updateBoardDetailsAPI } from '~/apis'
import { useDispatch } from 'react-redux'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'

const MenuStyle = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  },
  fontSize: '16px',
  fontWeight: 500
}


function BoardBar({ board }) {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const updateBoardTitle = async (newTitle) => {
    // console.log('New board title: ', newTitle)
    await updateBoardDetailsAPI(board._id, { title: newTitle })
    const updatedBoard = cloneDeep(board)
    updatedBoard.title = newTitle
    dispatch(updateCurrentActiveBoard(updatedBoard))
  }

  return (
    <>
      <Box
        px={2}
        sx={{
          height: (theme) => theme.trello.boardBarHeight,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          bgcolor: 'rgba(0, 0, 0, 0.32)',
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title={board?.description}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              {/*<Chip
              data-tour="board-title"
              icon={<DashboardIcon />}
              label={<ToggleFocusInput
              value={board?.title}
              onChangedValue={updateBoardTitle}
              sx={{ '& .MuiOutlinedInput-input': {
                color: 'white !important'
                } }}
                id={`toggle-focus-input-controlled-${board._id}`}
                data-tour="board-title"
                /> }
                clickable
                sx={MenuStyle}
                /> */}

              <DashboardIcon sx={{ color: 'white' }} />
              <ToggleFocusInput
                value={board?.title}
                onChangedValue={updateBoardTitle}
                // sx={{
                //   '& .MuiOutlinedInput-input': {
                //     color: 'white !important',
                //     fontSize: '15px',
                //     fontWeight: 500,
                //   },
                //   '& .MuiOutlinedInput-root': {
                //     '& input': {
                //       color: 'white !important'
                //     }
                //   },
                //   // Màu khi focus (nếu muốn giữ trắng khi focus)
                //   '& .MuiOutlinedInput-root.Mui-focused': {
                //     '& .MuiOutlinedInput-input': {
                //       color: 'white !important' // Hoặc 'black' nếu muốn đổi màu khi focus
                //     }
                //   }
                // }}
                color="white"
                sx= {MenuStyle}
                id={`toggle-focus-input-controlled-${board._id}`}
                data-tour="board-title"
              />
            </Box>
            {/* <ToggleFocusInput
              value={board?.title}
              onChangedValue={updateBoardTitle}
              sx={MenuStyle}
              id={`toggle-focus-input-controlled-${board._id}`}
              data-tour="board-title"
            /> */}
          </Tooltip>

          <Chip
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
            sx={MenuStyle}
          />

          <Chip
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            clickable
            sx={MenuStyle}
          />

          <Chip
            data-tour="board-menu"
            icon={<BoltIcon />}
            label="Settings"
            clickable
            sx={MenuStyle}
            onClick={() => setModalOpen(true)}
          />
          <BackgroundSelector
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            // onSelect={handleBackgroundSelect}
            boardId={board?._id}
          />
          <Chip
            icon={<FilterListIcon />}
            label="Filter"
            clickable
            sx={MenuStyle}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }}
          >
            Invite
          </Button> */}
          <InviteBoardUser boardId={board._id} />

          {/* <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
                "&:first-of-type": { bgcolor: "#a4b0de" },
              },
            }}
          >
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar
                alt="tuan"
                src="https://mui.com/static/images/avatar/2.jpg"
              />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar alt="tuan" src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="Tuan">
              <Avatar alt="tuan" src="/static/images/avatar/1.jpg" />
            </Tooltip>
          </AvatarGroup> */}
          <BoardUserGroup boardUsers={board.allUsers} />

        </Box>
      </Box>
    </>
  )
}

export default BoardBar
