import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
// import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { Link, useLocation } from 'react-router-dom'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import BoardsListSkeleton from '~/components/Skeleton/BoardsListSkeleton'

import LearnMoreModal from '~/components/LearnMoreModal'
import { styled } from '@mui/material/styles'

import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import EmptyBoardsState from '~/components/EmptyBoardsState'
import SidebarContent from '~/components/SidebarContent'


const DRAWER_WIDTH = 280

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginLeft: DRAWER_WIDTH,
    padding: theme.spacing(0, 0, 0, 2)
  }
}))

function Boards() {

  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null)
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation()
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   * hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get('page') || '1', 10)
  const [mobileOpen, setMobileOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    // Fake tạm 16 cái item thay cho boards
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    // setBoards([...Array(16)].map((_, i) => i))
    // Fake tạm giả sử trong Database trả về có tổng 100 bản ghi boards
    // setTotalBoards(100)

    // Gọi API lấy danh sách boards ở đây...
    // ...
    setIsLoading(true)
    fetchBoardsAPI(location.search).then(res => {
      setBoards(res.boards || [])
      setTotalBoards(res.totalBoards || 0)
      setIsLoading(false)
    })

  }, [location.search])

  const handleCreateBoardSuccess = () => {
    setIsLoading(true)
    fetchBoardsAPI(location.search).then(res => {
      setBoards(res.boards || [])
      setTotalBoards(res.totalBoards || 0)
      setIsLoading(false)
    })
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleCreateBoard = () => {
    setIsCreateModalOpen(true)
    setIsLearnMoreOpen(false)
  }

  const handleLearnMore = () => {
    setIsLearnMoreOpen(true)
  }


  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRight: '1px solid',
              borderColor: 'divider'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SidebarContent onItemClick={handleDrawerToggle} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRight: '1px solid',
              borderColor: 'divider',
              top: 70, // Adjust based on AppBar height
              height: 'calc(100vh - 80px)'
            }
          }}
          open
        >
          <SidebarContent handleCreateBoardSuccess={handleCreateBoardSuccess}
            isCreateModalOpen={isCreateModalOpen}
            onCloseCreateModal={() => setIsCreateModalOpen(false)} />
        </Drawer>
        <MainContent component="main">
          {(isLoading || boards?.length !== 0) && <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards:</Typography>
          }

          {isLoading && <BoardsListSkeleton />}

          {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
          {!isLoading && boards?.length === 0 && (
            // <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>No result found!</Typography>
            <EmptyBoardsState onCreateBoard={handleCreateBoard}
              onLearnMore={handleLearnMore} />
          )}

          {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
          {!isLoading && boards?.length > 0 && (
            <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={3} >
              {boards.map(b =>
                <Grid item size= {{ xs: 6, sm: 4, md: 4, lg: 3 }} key={b._id}>
                  <Card sx={{ maxWidth: 300, mx: 'auto', boxShadow: 3, borderRadius: '10px', '&:hover': { boxShadow: 5, transform: 'scale(1.05)' }, transition: 'transform 0.2s' }}>
                    {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                    {b?.background?.backgroundType === 'image' ? (
                      <CardMedia component="img" image={b.background.backgroundUrl} sx={{ height: 120 }} />
                    ) : b?.background?.backgroundType === 'gradient' ? (
                      <CardMedia
                        component="div"
                        sx={{
                          height: 120,
                          backgroundImage: b.background.backgroundUrl,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    ) : (
                      <CardMedia
                        component="div"
                        sx={{
                          height: 120,
                          backgroundColor: b?.background?.backgroundUrl || '#1976d2'
                        }}
                      />
                    )}
                    {/* <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box> */}

                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {b?.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {b?.description}
                      </Typography>
                      <Box
                        component={Link}
                        to={`/boards/${b._id}`}
                        sx={{
                          mt: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          color: 'primary.main',
                          '&:hover': { color: 'primary.light' }
                        }}>
                        Go to board <ArrowRightIcon fontSize="small" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}

          {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
          {(totalBoards > 0) &&
              <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  // Giá trị prop count của component Pagination là để hiển thị tổng số lượng page, công thức là lấy Tổng số lượng bản ghi chia cho số lượng bản ghi muốn hiển thị trên 1 page (ví dụ thường để 12, 24, 26, 48...vv). sau cùng là làm tròn số lên bằng hàm Math.ceil
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  // Giá trị của page hiện tại đang đứng
                  page={page}
                  // Render các page item và đồng thời cũng là những cái link để chúng ta click chuyển trang
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
          }
        </MainContent>
      </Box>
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <LearnMoreModal
        open={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
        onGetStarted={() => setIsCreateModalOpen(true)}
      />
    </Container>
  )
}

export default Boards
