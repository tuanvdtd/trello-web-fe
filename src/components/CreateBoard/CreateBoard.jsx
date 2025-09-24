import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AppsIcon from "@mui/icons-material/Apps";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";

import modelList from './modelList';
import Introduce from './Introduce';
import DetailForm from './DetailForm';

function CreateBoard({ showCreate }) {
  const projectList = [
    { id: 1, name: "For you", icon: <AutoAwesomeIcon /> },
    { id: 2, name: "Software", icon: <AppsIcon /> },
    { id: 3, name: "Marketing", icon: <ShoppingBagIcon /> },
    { id: 4, name: "Design", icon: <ColorLensIcon /> },
  ];

  const [description, setDescription] = useState("");
  const [showModel, setShowModel] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleShowModel = () => {
    setShowModel(true);
    setShowIntro(false);
    setShowForm(false);
  };

  const handleShowIntro = (item) => {
    setShowIntro(true);
    setSelectedModel(item);
    setShowModel(false);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowIntro(false);
    setShowModel(false);
  };

  const renderModelsView = () => (
    <Paper elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'end', 
        alignItems: 'center',
        py: 1,
        px: 2, 
         background: 'linear-gradient(90deg, #7B1FA2 0%, #2196F3 50%, #7B1FA2 100%)',
      }}>
         {/* <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'white', ml: 1 }}>
            Create New Project
          </Typography> */}

          <CloseIcon sx={{ fontSize: 32, color: 'white', cursor: 'pointer', '&:hover': { border: '2px solid lightgray', borderRadius: 4 } }} onClick={showCreate}/>

      </Box>

      <Box sx={{ display: 'flex', height: 'calc(100% - 80px)' }}>
        {/* Sidebar */}
        <Box sx={{ width: '25%', p: 2, borderRight: 1, borderColor: 'divider' }}>
          {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create New Project
          </Typography> */}
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ ml: 1 }}>
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
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, px: 3, py: 2 }}>
          {/* Search Bar */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Type short description about your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ '& .MuiSvgIcon-root': { color: 'inherit' } }}>
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
                          background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)',
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

          {/* Models List */}
          <Box sx={{ 
            height: 'calc(100% - 100px)', 
            overflowY: 'auto',
            // width: '80%',
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
                        mr: 2,
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
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography 
                        noWrap
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          // overflow: 'hidden',
                          // textOverflow: 'ellipsis',
                          // whiteSpace: 'nowrap',
                          maxWidth: 550
                        }}
                      >
                        {item.description1}
                      </Typography>
                    </Box>

                    <ArrowForwardIosIcon 
                      sx={{ color: 'action.active', ml: 1 }} 
                    />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Paper>
  );

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
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        Create new project
      </Link>
      {selectedModel && (
        <Link
          component="button"
          variant="h6"
          onClick={() => handleShowIntro(selectedModel)}
          sx={{ 
            color: 'white', 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {selectedModel.name}
        </Link>
      )}
      {showForm && (
        <Typography variant="h6" sx={{ color: 'white' }}>
          Add details
        </Typography>
      )}
    </Breadcrumbs>
  );

  const renderOtherViews = () => (
    <Paper elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          height: 80,
          background: 'linear-gradient(90deg, #7B1FA2 0%, #2196F3 50%, #7B1FA2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          color: 'white'
        }}
      >
        {renderBreadcrumbs()}
        <IconButton onClick={showCreate} sx={{ color: 'white' }}>
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
        {showIntro && (
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <Introduce
              item={selectedModel}
              handleShowForm={handleShowForm}
              showForm={showForm}
            />
          </Box>
        )}

        {showForm && (
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <DetailForm template={selectedModel} backtoShowModel={handleShowModel} handleCloseModal={showCreate} />
          </Box>
        )}
      </Box>
    </Paper>
  );

  return (
    <Modal
      open={true}
      onClose={showCreate}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={{
          width: '75vw',
          height: showModel ? 'auto' : '90vh',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          overflow: 'hidden'
        }}
      >
        {showModel ? renderModelsView() : renderOtherViews()}
      </Box>
    </Modal>
  );
}

export default CreateBoard;