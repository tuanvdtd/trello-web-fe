// create.jsx
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createNewBoardAPI } from '~/apis'
import { BOARD_TYPES } from '~/utils/constants'
import { useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function SidebarCreateBoardModal({ handleCreateBoardSuccess, handleOpen, onClose }) {
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [isOpen, setIsOpen] = useState(handleOpen || false)

  useEffect(() => {
    if (handleOpen !== undefined) {
      setIsOpen(handleOpen)
    }
  }, [handleOpen])

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => {
    setIsOpen(false)
    onClose?.()
    reset()
  }

  const submitCreateNewBoard = async (data) => {
    const { title, description, type } = data

    try {
      const board = await createNewBoardAPI({ title, description, type })
      handleCloseModal()
      handleCreateBoardSuccess()
      navigate(`/boards/${board._id}`, { state: { isNewBoard: true } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create board: ', error)
    }
  }

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2 }
        }}
      >
        <Box sx={{
          position: 'relative',
          width: {
            xs: '85vw',
            sm: '85vw',
            md: '600px'
          },
          maxWidth: '600px',
          maxHeight: { xs: '85vh', sm: '85vh' },
          overflow: 'auto',
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: { xs: 2, sm: 3 },
          border: 'none',
          outline: 0,
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
        }}>

          {/* Close Button */}
          <Box sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            right: { xs: 8, sm: 12 },
            cursor: 'pointer'
          }}>
            <CancelIcon
              color="error"
              sx={{
                fontSize: { xs: 24, sm: 28 },
                '&:hover': {
                  color: 'error.light',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={handleCloseModal}
            />
          </Box>

          {/* Header */}
          <Box
            id="modal-modal-title"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              mb: { xs: 2.5, sm: 3 },
              pr: { xs: 4, sm: 5 }
            }}
          >
            <LibraryAddIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                fontWeight: 600
              }}
            >
              Create a new board
            </Typography>
          </Box>

          {/* Form Content */}
          <Box id="modal-modal-description">
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2.5, md: 3 }
              }}>

                {/* Title Field */}
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    placeholder="Enter your project title"
                    // type="text"
                    variant="outlined"
                    size={isMobile ? 'small' : 'medium'}
                    // slotProps={{
                    //   input: {
                    //     startAdornment: (
                    //       <InputAdornment position="start">
                    //         <AbcIcon
                    //           fontSize="small"
                    //           sx={{
                    //             '&.MuiSvgIcon-root': { color: 'inherit' },
                    //             fontSize: { xs: 18, sm: 20 }
                    //           }}
                    //         />
                    //       </InputAdornment>
                    //     )
                    //   }
                    // }}
                    // sx={{
                    //   '& .MuiOutlinedInput-root': {
                    //     borderRadius: 2
                    //   },
                    //   '& .MuiInputLabel-root': {
                    //     fontSize: { xs: '0.875rem', sm: '1rem' }
                    //   }
                    // }}
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 50, message: 'Max Length is 50 characters' }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                {/* Description Field */}
                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    placeholder="Describe your project goals and objectives"
                    // type="text"
                    variant="outlined"
                    multiline
                    rows={isMobile ? 3 : 4}
                    size={isMobile ? 'small' : 'medium'}
                    // slotProps={{
                    //   input: {
                    //     startAdornment: (
                    //       <InputAdornment
                    //         position="start"
                    //         sx={{
                    //           '& .MuiSvgIcon-root': { color: 'inherit' },
                    //           alignSelf: 'flex-start',
                    //           mt: { xs: 1.5, sm: 2 }
                    //         }}
                    //       >
                    //         <DescriptionOutlinedIcon
                    //           fontSize="small"
                    //           sx={{ fontSize: { xs: 18, sm: 20 } }}
                    //         />
                    //       </InputAdornment>
                    //     )
                    //   }
                    // }}
                    // sx={{
                    //   '& .MuiOutlinedInput-root': {
                    //     borderRadius: 2
                    //   },
                    //   '& .MuiInputLabel-root': {
                    //     fontSize: { xs: '0.875rem', sm: '1rem' }
                    //   }
                    // }}
                    {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 255, message: 'Max Length is 255 characters' }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                {/* Board Type */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '0.95rem' }
                    }}
                  >
                    Board Type
                  </Typography>
                  <Controller
                    name="type"
                    defaultValue={BOARD_TYPES.PUBLIC}
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        row={true}
                        onChange={(event, value) => field.onChange(value)}
                        value={field.value}
                        sx={{
                          gap: { xs: 1, sm: 2 },
                          flexWrap: { xs: 'wrap', sm: 'nowrap' }
                        }}
                      >
                        <FormControlLabel
                          value={BOARD_TYPES.PUBLIC}
                          control={<Radio size="small" />}
                          label="Public"
                          labelPlacement="start"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                            }
                          }}
                        />
                        <FormControlLabel
                          value={BOARD_TYPES.PRIVATE}
                          control={<Radio size="small" />}
                          label="Private"
                          labelPlacement="start"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                            }
                          }}
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>

                {/* Submit Button */}
                <Box sx={{
                  alignSelf: 'flex-end'
                  // mt: { xs: 1, sm: 1 }
                }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size={isMobile ? 'medium' : 'large'}
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.2 },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      minWidth: { xs: 100, sm: 120 },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SidebarCreateBoardModal