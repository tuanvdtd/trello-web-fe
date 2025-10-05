import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

import CloseIcon from '@mui/icons-material/Close'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AppsIcon from '@mui/icons-material/Apps'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SearchIcon from '@mui/icons-material/Search'

import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import GrainIcon from '@mui/icons-material/Grain'

import modelList from './modelList'
import Introduce from './Introduce'
import DetailForm from './DetailForm'

function CreateBoard({ showCreate }) {
  const projectList = [
    { id: 1, name: 'For you', icon: <AutoAwesomeIcon /> },
    { id: 2, name: 'Software', icon: <AppsIcon /> },
    { id: 3, name: 'Marketing', icon: <ShoppingBagIcon /> },
    { id: 4, name: 'Design', icon: <ColorLensIcon /> }
  ]

  const [description, setDescription] = useState('')
  const [showModel, setShowModel] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(1)

  const handleShowModel = () => {
    setShowModel(true)
    setShowIntro(false)
    setShowForm(false)
  }

  const handleShowIntro = (item) => {
    setShowIntro(true)
    setSelectedModel(item)
    setShowModel(false)
    setShowForm(false)
  }

  const handleShowForm = () => {
    setShowForm(true)
    setShowIntro(false)
    setShowModel(false)
  }

  // const renderModelsView = () => (
  //   <Paper elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
  //     {/* Header */}
  //     <Box sx={{
  //       display: 'flex',
  //       justifyContent: 'end',
  //       alignItems: 'center',
  //       py: { xs: 0.5, sm: 1 },
  //       px: { xs: 1, sm: 2 },
  //       minHeight: { xs: 48, sm: 56, md: 72 },
  //       background: 'linear-gradient(90deg, #7B1FA2 0%, #2196F3 50%, #7B1FA2 100%)'
  //     }}>

  //       <CloseIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: 'white', cursor: 'pointer', '&:hover': { border: '2px solid lightgray', borderRadius: 4 } }} onClick={showCreate}/>

  //     </Box>

  //     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: 'calc(100% - 80px)' }}>
  //       {/* Sidebar */}
  //       <Box sx={{ width: { xs: '100%', md: '25%' },
  //         p: { xs: 1.5, md: 2 },
  //         borderBottom: { xs: 1, md: 0 }, borderColor: 'divider' }}>
  //         <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ ml: 1, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
  //           Create New Project
  //         </Typography>

  //         <List sx={{ mt: 2 }}>
  //           {projectList.map((item) => (
  //             <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
  //               <ListItemButton
  //                 selected={selectedCategory === item.id}
  //                 onClick={() => setSelectedCategory(item.id)}
  //                 sx={{
  //                   borderRadius: 2,
  //                   py: { xs: 0.5, sm: 1 },
  //                   px: { xs: 1, sm: 2 },
  //                   '&.Mui-selected': {
  //                     backgroundColor: 'primary.light',
  //                     color: 'primary.contrastText',
  //                     '&:hover': {
  //                       backgroundColor: 'primary.main'
  //                     }
  //                   }
  //                 }}
  //               >
  //                 <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
  //                   {item.icon}
  //                 </ListItemIcon>
  //                 <ListItemText primaryTypographyProps={{ noWrap: true, fontSize: { xs: 14, sm: 16 } }} primary={item.name} />
  //               </ListItemButton>
  //             </ListItem>
  //           ))}
  //         </List>
  //       </Box>

  //       {/* Main Content */}
  //       <Box sx={{ flex: 1, px: { xs: 1.5, md: 3 }, py: { xs: 1.5, md: 2 } }}>
  //         {/* Search Bar */}
  //         <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
  //           <TextField
  //             fullWidth
  //             placeholder="Type short description about your project..."
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start" sx={{ '& .MuiSvgIcon-root': { color: 'inherit' } }}>
  //                   <SearchIcon />
  //                 </InputAdornment>
  //               ),
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     sx={{
  //                       background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
  //                       color: 'white',
  //                       '&:hover': {
  //                         background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)'
  //                       }
  //                     }}
  //                   >
  //                     <SmartToyIcon />
  //                   </IconButton>
  //                 </InputAdornment>
  //               )
  //             }}
  //             sx={{
  //               '& .MuiOutlinedInput-root': {
  //                 borderRadius: 2,
  //                 height: { xs: 44, md: 56 }
  //               },
  //               '& .MuiInputBase-root': { bgcolor: 'background.paper', fontSize: { xs: 14, sm: 16 } }
  //             }}
  //           />
  //         </Box>

  //         {/* Models List */}
  //         <Box sx={{
  //           height: { xs: 'auto', md: 'calc(100% - 100px)' },
  //           maxHeight: { xs: '60vh', md: 'unset' },
  //           overflowY: 'auto',
  //           pr: { xs: 0, md: 1 }
  //         }}>
  //           <Stack spacing={{ xs: 1, md: 1.5 }}>
  //             {modelList.map((item) => (
  //               <Card
  //                 key={item.id}
  //                 sx={{
  //                   cursor: 'pointer',
  //                   transition: 'all 0.2s ease',
  //                   '&:hover': {
  //                     boxShadow: 6,
  //                     transform: 'translateY(-2px)'
  //                   }
  //                 }}
  //                 onClick={() => handleShowIntro(item)}
  //               >
  //                 <CardContent sx={{
  //                   display: 'flex',
  //                   alignItems: 'center',
  //                   gap: { xs: 1.25, md: 2 },
  //                   p: { xs: 1.25, md: 2 },
  //                   '&:last-child': { pb: { xs: 1.25, md: 2 } }
  //                 }}>
  //                   <Box
  //                     sx={{
  //                       width: { xs: 64, md: 80 },
  //                       height: { xs: 64, md: 80 },
  //                       backgroundColor: '#D6EEF2',
  //                       borderRadius: 2,
  //                       display: 'flex',
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                       // mr: 2,
  //                       flexShrink: 0
  //                     }}
  //                   >
  //                     <Box
  //                       component="img"
  //                       src={item.icon}
  //                       alt={item.name}
  //                       // sx={{ width: 40, height: 40 }}
  //                       sx={{ width: { xs: 28, md: 40 }, height: { xs: 28, md: 40 } }}
  //                     />
  //                   </Box>

  //                   <Box sx={{ flex: 1, minWidth: 0 }}>
  //                     <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: { xs: 0.5, md: 1 } }}
  //                     >
  //                       {item.name}
  //                     </Typography>
  //                     <Typography
  //                       noWrap
  //                       variant="body2"
  //                       color="text.secondary"
  //                       sx={{
  //                         // overflow: 'hidden',
  //                         textOverflow: 'ellipsis',
  //                         whiteSpace: 'nowrap',
  //                         maxWidth: {
  //                           xs: 550, // màn hình nhỏ (mobile)
  //                           sm: 550, // tablet
  //                           md: 300, // desktop vừa
  //                           lg: 550// desktop lớn
  //                         },
  //                         // maxWidth: 550,
  //                         display: '-webkit-box',
  //                         WebkitLineClamp: { xs: 2, md: 1 },
  //                         WebkitBoxOrient: 'vertical',
  //                         overflow: 'hidden',
  //                         fontSize: { xs: 12, sm: 13, md: 14 }
  //                       }}
  //                     >
  //                       {item.description1}
  //                     </Typography>
  //                   </Box>

  //                   <ArrowForwardIosIcon
  //                     sx={{ color: 'action.active', ml: 1, display: { xs: 'none', sm: 'block' } }}
  //                   />
  //                 </CardContent>
  //               </Card>
  //             ))}
  //           </Stack>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Paper>
  // )
  const renderModelsView = () => (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: { xs: 1, sm: 1 },
        px: { xs: 2, sm: 2 },
        minHeight: { xs: 56, sm: 56, md: 72 },
        background: 'linear-gradient(90deg, #7B1FA2 0%, #2196F3 50%, #7B1FA2 100%)',
        flexShrink: 0
      }}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Create New Project
        </Typography>
        <CloseIcon
          sx={{
            fontSize: { xs: 24, sm: 28, md: 32 },
            color: 'white',
            cursor: 'pointer',
            p: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
          onClick={showCreate}
        />
      </Box>

      {/* Mobile Layout */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          flex: 1,
          minHeight: 0
        }}
      >
        {/* Categories Tabs - Mobile */}
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'grey.50',
          px: 2,
          py: 1,
          flexShrink: 0
        }}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            {projectList.map((item) => (
              <Box
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  flexShrink: 0,
                  minWidth: 'fit-content',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  bgcolor: selectedCategory === item.id ? 'primary.main' : 'transparent',
                  color: selectedCategory === item.id ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: selectedCategory === item.id ? 'primary.dark' : 'grey.100'
                  },
                  transition: 'all 0.2s'
                }}
              >
                {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                <Typography variant="body2" fontWeight="inherit">
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Search Bar - Mobile */}
        <Box sx={{ p: 2, flexShrink: 0 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search templates..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20 }} />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper'
              }
            }}
          />
        </Box>

        {/* Models List - Mobile */}
        <Box sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          px: 2,
          pb: 2
        }}>
          <Stack spacing={1.5}>
            {modelList.map((item) => (
              <Card
                key={item.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-1px)'
                  },
                  '&:active': {
                    transform: 'scale(0.98)'
                  }
                }}
                onClick={() => handleShowIntro(item)}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: '#E3F2FD',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Box
                        component="img"
                        src={item.icon}
                        alt={item.name}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 0.5,
                          lineHeight: 1.3,
                          fontSize: '1rem'
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.4,
                          fontSize: '0.875rem'
                        }}
                      >
                        {item.description1}
                      </Typography>
                    </Box>

                    {/* Arrow */}
                    <ArrowForwardIosIcon
                      sx={{
                        color: 'action.active',
                        fontSize: 16,
                        mt: 0.5
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Desktop Layout */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flex: 1,
        minHeight: 0
      }}>
        {/* Sidebar - Desktop */}
        <Box sx={{
          width: '25%',
          flexShrink: 0,
          p: 2,
          borderRight: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ ml: 1, fontSize: '1.25rem' }}>
            Create New Project
          </Typography>

          <List sx={{ mt: 2 }}>
            {projectList.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={selectedCategory === item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.main'
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: 16 }} primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content - Desktop */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          px: 3,
          py: 2
        }}>
          {/* Search Bar - Desktop */}
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            <TextField
              fullWidth
              placeholder="Type short description about your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)'
                        }
                      }}
                    >
                      <SmartToyIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  height: 56
                },
                '& .MuiInputBase-root': { bgcolor: 'background.paper' }
              }}
            />
          </Box>

          {/* Models List - Desktop */}
          <Box sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            pr: 1
          }}>
            <Stack spacing={1.5}>
              {modelList.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => handleShowIntro(item)}
                >
                  <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    '&:last-child': { pb: 2 }
                  }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: '#D6EEF2',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Box
                        component="img"
                        src={item.icon}
                        alt={item.name}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1.25rem', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: 14
                        }}
                      >
                        {item.description1}
                      </Typography>
                    </Box>

                    <ArrowForwardIosIcon sx={{ color: 'action.active', ml: 1 }} />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  )

  const renderBreadcrumbs = () => (
    <Breadcrumbs
      separator={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
      sx={{ color: 'white' }}
    >
      <Link
        component="button"
        variant="h6"
        onClick={handleShowModel}
        sx={{
          color: 'white',
          display: 'flex', alignItems: 'center',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline' }
          }}
        >
            All Models
        </Box>
      </Link>
      {selectedModel && (
        <Link
          component="button"
          variant="h6"
          onClick={() => handleShowIntro(selectedModel)}
          sx={{
            color: 'white',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          <Box
            component="span"
            sx={{
              display: { xs: 'none', sm: 'inline' }
            }}
          >
            {selectedModel.name}
          </Box>
        </Link>
      )}
      {showForm && (
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Add details
        </Typography>
      )}
    </Breadcrumbs>
  )

  const renderOtherViews = () => (
    <Paper elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          height: { xs: 56, sm: 64, md: 80 },
          background: 'linear-gradient(90deg, #7B1FA2 0%, #2196F3 50%, #7B1FA2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.25, sm: 2, md: 3 },
          color: 'white'
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: { xs: '100%', md: 'unset' }
          }}
        >
          {renderBreadcrumbs()}
        </Box>
        <IconButton onClick={showCreate} sx={{ color: 'white' }}>
          <CloseIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ height: { xs: 'calc(100% - 56px)', md: 'calc(100% - 80px)' }, overflow: 'hidden' }}>
        {showIntro && (
          <Box sx={{ height: '100%', overflow: 'auto', p: { xs: 1.5, md: 0 } }}>
            <Introduce
              item={selectedModel}
              handleShowForm={handleShowForm}
              showForm={showForm}
            />
          </Box>
        )}

        {showForm && (
          <Box sx={{ height: '100%', overflow: 'auto', p: { xs: 1.5, md: 0 } }}>
            <DetailForm template={selectedModel} backtoShowModel={handleShowModel} handleCloseModal={showCreate} />
          </Box>
        )}
      </Box>
    </Paper>
  )

  return (
    <Modal
      open={true}
      onClose={showCreate}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        p: { xs: 1, sm: 2 }
      }}
    >
      <Box
        sx={{
          width: { xs: '85vw', sm: '85vw', md: '75vw' },
          height: showModel ? 'auto' : '92vh',
          maxHeight: '92vh',
          bgcolor: 'background.paper',
          borderRadius: { xs: 2, md: 3 },
          boxShadow: 24,
          overflow: 'hidden'
        }}
      >
        {showModel ? renderModelsView() : renderOtherViews()}
      </Box>
    </Modal>
  )
}

export default CreateBoard