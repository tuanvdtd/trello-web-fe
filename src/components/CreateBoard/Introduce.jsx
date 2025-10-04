import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

import CircleIcon from '@mui/icons-material/Circle'

const Introduce = ({ item, handleShowForm }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item size={{ xs: 12, md: 9 }}>
          <Stack spacing={4}>
            {/* Description */}
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {item.description}
            </Typography>

            {/* Recommendations */}
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recommend for
              </Typography>
              <List dense>
                {item.recommend?.map((rec, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CircleIcon sx={{ fontSize: 8, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Images and Information */}
            <Grid container spacing={3} alignItems="stretch">
              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={2}
                  sx={{
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.inform1}
                  </Typography>
                  <Box
                    component="img"
                    src={item.image1}
                    alt={item.inform1}
                    sx={{
                      width: '100%',
                      maxWidth: 200,
                      height: 200,
                      objectFit: 'contain',
                      borderRadius: 1
                    }}
                  />
                </Paper>
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={2}
                  sx={{
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.inform2}
                  </Typography>
                  <Box
                    component="img"
                    src={item.image2}
                    alt={item.inform2}
                    sx={{
                      width: '100%',
                      maxWidth: 200,
                      height: 200,
                      objectFit: 'contain',
                      borderRadius: 1
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item size={{ xs: 12, md: 3 }}>
          <Stack spacing={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Icon */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2
            }}>
              <Box
                component="img"
                src={item.icon}
                alt={item.name}
                sx={{ height: 120, objectFit: 'contain' }}
              />
            </Box>

            {/* Workflow */}
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Work flow
              </Typography>
              <List dense>
                {item.workflow?.map((step, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 20 }}>
                      <CircleIcon sx={{ fontSize: 6, color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={step}
                      primaryTypographyProps={{
                        variant: 'body2'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Action Button */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end'
              // mt: 'auto'
            }}>
              <Button
                variant="contained"
                onClick={handleShowForm}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #7B1FA2 90%)'
                  }
                }}
              >
                Use template
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Introduce