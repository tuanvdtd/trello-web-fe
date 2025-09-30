import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'

import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { updateBoardDetailsAPI } from '~/apis'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'

const BackgroundSelector = ({ open, onClose, boardId }) => {
  const [tabValue, setTabValue] = useState(-1)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  // Dữ liệu màu gradient
  const gradientColors = [
    { id: 1, gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', icon: '🦋' },
    { id: 2, gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', icon: '❄️' },
    { id: 3, gradient: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)', icon: '🌊' },
    { id: 4, gradient: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)', icon: '👑' },
    { id: 5, gradient: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)', icon: '🌈' },
    { id: 6, gradient: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)', icon: '🔥' },
    { id: 7, gradient: 'linear-gradient(135deg, #e91e63 0%, #f06292 100%)', icon: '✨' },
    { id: 8, gradient: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', icon: '🌿' },
    { id: 9, gradient: 'linear-gradient(135deg, #607d8b 0%, #90a4ae 100%)', icon: '🎯' },
    { id: 10, gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)', icon: '🚀' }
  ]

  // Dữ liệu màu đơn sắc
  const solidColors = [
    '#1976d2', '#f57c00', '#388e3c', '#d32f2f', '#7b1fa2'
  ]

  // Dữ liệu hình ảnh mẫu
  const sampleImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Mountain landscape' },
    { id: 2, url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400', alt: 'Orange sunset' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400', alt: 'Beach palm' },
    { id: 4, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Mountain lake' },
    { id: 5, url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', alt: 'Building architecture' },
    { id: 7, url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400', alt: 'Ocean waves' },
    { id: 8, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', alt: 'Night mountain' }
  ]

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const callUpdateBoardDetailsAPI = async (updateData) => {
    const updatedBoard = await updateBoardDetailsAPI(boardId, updateData)
    // Cập nhật lại store
    const updatedBoardInStore = cloneDeep(board)
    updatedBoardInStore.background = updatedBoard.background
    dispatch(updateCurrentActiveBoard(updatedBoardInStore))
    return updatedBoard
  }
  const handleDefaultSelect = (type, defaultImage) => {
    // onSelect({ type: 'gradient', value: gradient });
    // onClose();

    // Gọi API cập nhật nền cho board
    // console.log('Selected background: ', defaultImage);
    const updateBackgroundBoard = { backgroundType: type, defaultImage: defaultImage }
    callUpdateBoardDetailsAPI({ updateBackgroundBoard })
    onClose()
  }


  const uploadBackground = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    // console.log('e.target?.files[0]: ', e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('backgroundBoard', e.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    // console.log('reqData: ', reqData)
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    // Gọi API...
    toast.promise(
      callUpdateBoardDetailsAPI(reqData).finally(() => {
        e.target.value = ''
        onClose()
      }),
      {
        pending: 'Uploading...'
      }
    ).then(res => {
      if (!res.error) {
        toast.success('Background updated successfully!', { theme: 'colored' })
      }
    })
  }

  const renderColorTab = () => (
    <Box sx={{ p: 1.5 }}>
      {/* Gradient Colors */}
      <Grid container spacing={1} >
        {gradientColors.map((color) => (
          <Grid item xs={6} key={color.id} >
            <Card
              sx={{
                height: 90,
                width: 150,
                background: color.gradient,
                cursor: 'pointer',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)'
                },
                position: 'relative'
              }}
              onClick={() => handleDefaultSelect('gradient', color.gradient)}
            >
              <Typography variant="h6" sx={{ color: 'white', textShadow: '0 0 5px rgba(0,0,0,0.3)', position: 'absolute', bottom: 8, left: 8 }}>
                {color.icon}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      {/* Solid Colors */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {solidColors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 150,
              height: 90,
              backgroundColor: color,
              borderRadius: 1,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => handleDefaultSelect('color', color)}
          />
        ))}
      </Box>
    </Box>
  )

  const renderImageTab = () => (
    <Box sx={{ p: 1.5 }}>
      {/* Search Box */}
      <TextField
        fullWidth
        placeholder="Ảnh"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ '& .MuiSvgIcon-root': { color: 'inherit' } }}>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {/* Image Grid */}
      <Grid container spacing={1}>
        {sampleImages.map((image) => (
          <Grid item xs={6} key={image.id}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleDefaultSelect('image', image.url)}
            >
              <CardMedia
                component="img"
                image={image.url}
                alt={image.alt}
                sx={{ objectFit: 'cover', height: 90, width: 150 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Attribution */}
      {/* <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary' }}>
        Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với{' '}
        <span style={{ color: (theme) => theme.palette.primary.main }}>giấy phép</span> và{' '}
        <span style={{ color: (theme) => theme.palette.primary.main }}>Điều khoản dịch vụ</span>
      </Typography> */}
    </Box>
  )

  const renderCustomTab = () => (
    <Box sx={{ p: 2, paddingBottom: 0.5 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Tùy chọn
      </Typography>
      <Button
        component="label"
        sx={{
          height: 120,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: 2,
          border: '2px dashed #ccc',
          '&:hover': {
            backgroundColor: '#eeeeee'
          }
        }}
      >
        <AddIcon sx={{ fontSize: 40, color: '#999' }} />
        <VisuallyHiddenInput type="file" onChange={uploadBackground} />
      </Button>
    </Box>
  )

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 360 },
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 1.5
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5
            // borderBottom: 1,
            // borderColor: 'divider'
          }}
        >
          <IconButton onClick={() => { setTabValue(-1) }} size="small" disabled={tabValue === -1}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {tabValue === 0 ? 'Màu sắc' : tabValue === 1 ? 'Ảnh' : 'Thay đổi hình nền'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}
            sx={{ px: 1,
              '& .MuiTab-root': {
                paddingX: '8px',
                marginX: 'auto' // giảm padding
              }
            }} >
            <Tab
              label={
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 150,
                      height: 90,
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      borderRadius: 2,
                      mb: 0.5,
                      mx: 'auto'
                    }}
                  />
                  <Typography variant="caption">Màu</Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 150,
                      height: 90,
                      backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100)',
                      backgroundSize: 'cover',
                      borderRadius: 2,
                      mb: 0.5,
                      mx: 'auto'
                    }}
                  />
                  <Typography variant="caption">Ảnh</Typography>
                </Box>
              }
            />
          </Tabs>
          {/* <Divider /> */}
        </Box>
        {tabValue === -1 && renderCustomTab()}
        {/* Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: '0 5px 5px 5px',
          m: '0 5px',
          overflowX: 'hidden', '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}>
          {tabValue === 0 && renderColorTab()}
          {tabValue === 1 && renderImageTab()}
          {/* {tabValue === 2 && renderCustomTab()} */}
        </Box>
        {tabValue === 1 && (
          <Box sx={{ px:2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với giấy phép và Điều khoản dịch vụ
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default BackgroundSelector