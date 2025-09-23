import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";


const DetailForm = ({ item, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'public',
    workspace: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    event();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={10}>
        {/* Form Section */}
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight="bold">
              Create your project
            </Typography>

            <TextField
              fullWidth
              label="Project Title"
              value={formData.title}
              onChange={handleInputChange('title')}
              placeholder="Enter your project title"
              variant="outlined"
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Project Description"
              value={formData.description}
              onChange={handleInputChange('description')}
              placeholder="Describe your project goals and objectives"
              variant="outlined"
            />

            {/* Visibility */}
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Visibility
              </Typography>
              <RadioGroup
                value={formData.type}
                onChange={handleInputChange('type')}
              >
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    mb: 2,
                    border: formData.type === 'public' ? 2 : 1,
                    borderColor: formData.type === 'public' ? 'primary.main' : 'divider'
                  }}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PublicIcon />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Public
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Anyone can see this project
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </Paper>

                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    border: formData.type === 'private' ? 2 : 1,
                    borderColor: formData.type === 'private' ? 'primary.main' : 'divider'
                  }}
                >
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LockIcon />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Private
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Only you can see this project
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </Box>

            {/* Action Buttons */}
            {/* <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={event}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  flex: 1,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)',
                  }
                }}
              >
                Create Project
              </Button>
            </Stack> */}
          </Stack>
        </Grid>

        {/* Preview Section */}
        <Grid item size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              borderRadius: 3,
              bgcolor: 'grey.50',
              height: 'fit-content'
            }}
          >
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#D6EEF2',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Box
                    component="img"
                    src={item?.icon}
                    alt={item?.name}
                    sx={{ width: 50, height: 50 }}
                  />
                </Box>

                <Typography variant="h6" fontWeight="bold">
                  {formData.title || 'Your Project Title'}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {formData.description || 'Your project description will appear here'}
                </Typography>

                <Box sx={{ 
                  mt: 2, 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      px: 2, 
                      py: 0.5, 
                      bgcolor: formData.type === 'public' ? 'success.light' : 'grey.200'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {formData.type === 'public' ? <PublicIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                      <Typography variant="caption" fontWeight="bold">
                        {formData.type === 'public' ? 'Public' : 'Private'}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </Paper>
           <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={event}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  flex: 1,
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)',
                  }
                }}
              >
                Create Project
              </Button>
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailForm;