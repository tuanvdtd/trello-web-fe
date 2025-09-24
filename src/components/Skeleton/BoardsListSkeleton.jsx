import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const BoardsListSkeleton = () => {
  
  const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

  return (
    <Grid container spacing={2}>
      {skeletonItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
          <Card 
            sx={{ 
              width: '250px', 
              borderRadius: '10px',
              boxShadow: 3
            }}
          >
            {/* Card Cover Skeleton */}
            <Skeleton 
              variant="rectangular" 
              height={120} 
              sx={{ borderRadius: '10px 10px 0 0' }}
            />
            
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              {/* Board Title Skeleton */}
              <Skeleton 
                variant="text" 
                width="80%" 
                height={28}
                sx={{ mb: 1 }}
              />
              
              {/* Board Description Skeleton */}
              <Skeleton 
                variant="text" 
                width="100%" 
                height={20}
                sx={{ mb: 0.5 }}
              />
              <Skeleton 
                variant="text" 
                width="60%" 
                height={20}
                sx={{ mb: 1 }}
              />
              
              {/* Go to board link skeleton */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-end',
                mt: 1
              }}>
                <Skeleton 
                  variant="text" 
                  width={100} 
                  height={20}
                />
                <Skeleton 
                  variant="circular" 
                  width={16} 
                  height={16}
                  sx={{ ml: 0.5 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardsListSkeleton;