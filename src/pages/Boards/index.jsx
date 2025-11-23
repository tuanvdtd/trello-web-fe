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

import Drawer from '@mui/material/Drawer'
import EmptyBoardsState from '~/components/EmptyBoardsState'
import SidebarContent from '~/components/SidebarContent'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import {
  Clock,
  Search
} from 'lucide-react'
import { useColorScheme } from '@mui/material/styles'


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
  const { mode } = useColorScheme()

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

  const userId = useSelector(selectCurrentUser)._id

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
          {(isLoading || boards?.length !== 0) && (
            <div className="max-w-[1920px] mx-auto mb-8 ">
              <div className="mb-4 sm:mb-8">
                <div className="flex-1">
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {'My Boards'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {'Manage and organize all your projects in one place'}
                  </Typography>
                </div>
              </div>
              {/* Search bar */}
              <Box className="relative flex-1" sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search boards..."
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border ${
                    mode === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </Box>
              {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards:</Typography> */}
            </div>
          )}

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
                  <Card sx={{ position: 'relative', maxWidth: 300, mx: 'auto', boxShadow: 3, borderRadius: '6px', '&:hover': { boxShadow: 5, transform: 'scale(1.05)' }, transition: 'transform 0.2s' }}>
                    {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                    {b?.background?.backgroundType === 'image' ? (
                      <Box sx={{ position: 'relative', height: 120 }}>
                        <CardMedia component="img" image={b.background.backgroundUrl} sx={{ height: 120 }} />
                        {/* Role Badge */}
                        <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              b.ownerIds.includes(userId)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {b.ownerIds.includes(userId) ? 'Owner' : 'Member'}
                          </span>
                        </Box>
                      </Box>
                    ) : b?.background?.backgroundType === 'gradient' ? (
                      <Box sx={{ position: 'relative', height: 120 }}>
                        <CardMedia
                          component="div"
                          sx={{
                            height: 120,
                            backgroundImage: b.background.backgroundUrl,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        {/* Role Badge */}
                        <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              b.ownerIds.includes(userId)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {b.ownerIds.includes(userId) ? 'Owner' : 'Member'}
                          </span>
                        </Box>
                      </Box>
                    ) : (
                      <Box sx={{ position: 'relative', height: 120 }}>
                        <CardMedia
                          component="div"
                          sx={{
                            height: 120,
                            backgroundColor: b?.background?.backgroundUrl || '#1976d2'
                          }}
                        />
                        {/* Role Badge */}
                        <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              b.ownerIds.includes(userId)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {b.ownerIds.includes(userId) ? 'Owner' : 'Member'}
                          </span>
                        </Box>
                      </Box>
                    )}

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
                      {b.members.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {b.members.slice(0, 2).map((member) => (
                              <img
                                key={member._id}
                                src={member.avatar}
                                alt={member.name}
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-800 hover:z-10 transition-all"
                                title={member.name}
                              />
                            ))}
                            {b.members.length > 2 && (
                              <div
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 
                                     border-white bg-gray-200 text-gray-600
                                 flex items-center justify-center text-[10px] sm:text-xs`}
                              >
                                +{b.members.length - 2}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                            {/* Original dynamic time display (commented out for temporary hardcode)
                            <Clock className="w-3 h-3" />
                            <span className="hidden sm:inline">{formatDistanceToNow(createdDate, { addSuffix: true })}</span>
                            <span className="sm:hidden">{formatDistanceToNow(createdDate, { addSuffix: true }).replace('about ', '')}</span>
                            */}
                            {/* Temporary hardcoded time */}
                            <Clock className="w-3 h-3" />
                            <span className="hidden sm:inline">2 days ago</span>
                            <span className="sm:hidden">2d</span>
                          </div>
                        </div>
                      )}
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

      <LearnMoreModal
        open={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
        onGetStarted={() => setIsCreateModalOpen(true)}
      />
    </Container>
  )
}

export default Boards
