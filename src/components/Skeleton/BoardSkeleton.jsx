import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';


const BoardSkeleton = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      {/* AppBar Skeleton */}
      <Box sx={{ 
        height: 48, 
        bgcolor: 'grey.900', 
        display: 'flex', 
        alignItems: 'center', 
        px: 2,
        gap: 2
      }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: 'grey.700' }} />
        <Box sx={{ flex: 1 }} />
        <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'grey.700' }} />
        <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'grey.700' }} />
      </Box>

      <Box sx={{
        height: 'calc(100vh - 48px)',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundColor: 'grey.200',
        position: 'relative'
      }}>
        {/* BoardBar Skeleton */}
        <Box sx={{ 
          height: 60, 
          display: 'flex', 
          alignItems: 'center', 
          px: 3,
          gap: 2
        }}>
          <Skeleton 
            variant="text" 
            width={200} 
            height={32} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
          />
          <Skeleton 
            variant="rectangular" 
            width={80} 
            height={24} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} 
          />
          <Box sx={{ flex: 1 }} />
          <Skeleton 
            variant="circular" 
            width={32} 
            height={32} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
          />
          <Skeleton 
            variant="circular" 
            width={32} 
            height={32} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
          />
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={32} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} 
          />
        </Box>

        {/* BoardContent Skeleton */}
        <Box sx={{ 
          height: 'calc(100% - 60px)', 
          display: 'flex', 
          gap: 2, 
          p: 2,
          overflowX: 'auto'
        }}>
          {/* Column Skeletons */}
          {[1, 2, 3].map((columnIndex) => (
            <Paper
              key={columnIndex}
              sx={{
                minWidth: 272,
                maxWidth: 272,
                height: 'fit-content',
                maxHeight: 'calc(100vh - 158px)',
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              {/* Column Header Skeleton */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="circular" width={20} height={20} />
              </Box>

              {/* Card Skeletons */}
              <Stack spacing={1}>
                {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, cardIndex) => (
                  <Paper
                    key={cardIndex}
                    elevation={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: 'white'
                    }}
                  >
                    {/* Card Content Skeleton */}
                    <Skeleton 
                      variant="text" 
                      width="90%" 
                      height={20} 
                      sx={{ mb: 1 }} 
                    />
                    {Math.random() > 0.5 && (
                      <Skeleton 
                        variant="text" 
                        width="70%" 
                        height={16} 
                        sx={{ mb: 1 }} 
                      />
                    )}
                    
                    {/* Card Footer Skeleton */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mt: 1
                    }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {Math.random() > 0.6 && (
                          <Skeleton variant="circular" width={16} height={16} />
                        )}
                        {Math.random() > 0.7 && (
                          <Skeleton variant="circular" width={16} height={16} />
                        )}
                      </Box>
                      {Math.random() > 0.5 && (
                        <Skeleton variant="circular" width={24} height={24} />
                      )}
                    </Box>
                  </Paper>
                ))}
              </Stack>

              {/* Add Card Button Skeleton */}
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={36} 
                sx={{ borderRadius: 1, mt: 1 }} 
              />
            </Paper>
          ))}

          {/* Add Column Button Skeleton */}
          <Paper
            sx={{
              minWidth: 272,
              height: 'fit-content',
              bgcolor: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton 
              variant="rectangular" 
              width="80%" 
              height={40} 
              sx={{ borderRadius: 1 }} 
            />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default BoardSkeleton;