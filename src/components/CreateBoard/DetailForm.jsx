// import React, { useState } from 'react';
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
import { createNewBoardAPI } from '~/apis'
import { BOARD_TYPES } from '~/utils/constants'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from "react-router-dom";


const DetailForm = ({ template, backtoShowModel , handleCloseModal}) => {
  const navigate = useNavigate();
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      type: BOARD_TYPES.PUBLIC
    }
  })
  // watch form values để preview live
  const watchedValues = watch()


  const submitCreateNewBoard = async (data) => {
    const { title, description, type } = data
    // console.log('Board title: ', title)
    // console.log('Board description: ', description)
    // console.log('Board type: ', type)
    // console.log('model: ', template.name)

    try {
      const newBoard = await createNewBoardAPI({ title, description, type, template: template.name })
      handleCloseModal()
      navigate(`/boards/${newBoard._id}`);
      
    } catch (error) {
      console.error('Failed to create board: ', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitCreateNewBoard)}>
    <Box sx={{ p: 4 }}>
      <Grid container spacing={8}>
        {/* Form Section */}
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight="bold">
              Create your project
            </Typography>

            <TextField
              fullWidth
              label="Project Title"
              // type='text'
              placeholder="Enter your project title"
              variant="outlined"
              {...register('title', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: { value: 3, message: 'Min Length is 3 characters' },
                    maxLength: { value: 50, message: 'Max Length is 50 characters' }
                  })}
                  error={!!errors['title']}
            />
            <FieldErrorAlert errors={errors} fieldName={'title'} />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Project Description"
              placeholder="Describe your project goals and objectives"
              variant="outlined"
              {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 255, message: 'Max Length is 255 characters' }
                    })}
                    error={!!errors['description']}
            />
             <FieldErrorAlert errors={errors} fieldName={'description'} />
            {/* Visibility */}
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Visibility
              </Typography>
               <Controller
                  name="type"
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  value={field.value}
                  onChange={(event, value) => field.onChange(value)}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      mb: 2,
                      border: field.value === BOARD_TYPES.PUBLIC ? 2 : 1,
                      borderColor: field.value === BOARD_TYPES.PUBLIC ? 'primary.main' : 'divider'
                    }}
                  >
                    <FormControlLabel
                      value={BOARD_TYPES.PUBLIC}
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
                      border: field.value === BOARD_TYPES.PRIVATE ? 2 : 1,
                      borderColor: field.value === BOARD_TYPES.PRIVATE ? 'primary.main' : 'divider'
                    }}
                  >
                    <FormControlLabel
                      value={BOARD_TYPES.PRIVATE}
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
                </RadioGroup>)}
                />
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
                    src={template?.icon}
                    alt={template?.name}
                    sx={{ width: 50, height: 50 }}
                  />
                </Box>

                <Typography variant="h6" fontWeight="bold">
                  {watchedValues.title || 'Your Project Title'}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {watchedValues.description || 'Your project description will appear here'}
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
                      bgcolor: watchedValues.type === 'public' ? 'success.light' : 'grey.200'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {watchedValues.type === 'public' ? <PublicIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                      <Typography variant="caption" fontWeight="bold">
                        {watchedValues.type === 'public' ? 'Public' : 'Private'}
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
                onClick={backtoShowModel}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                type="submit"
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
      </form>
  );
};

export default DetailForm;