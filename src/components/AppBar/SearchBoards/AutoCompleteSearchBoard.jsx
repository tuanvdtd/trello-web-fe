import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useDebounceFn } from '~/customHooks/useDebounceFn'
import { fetchBoardsAPI } from '~/apis/index'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import {
  Search
} from 'lucide-react'
/**
 * https://mui.com/material-ui/react-autocomplete/#asynchronous-requests
 */
function AutoCompleteSearchBoard({ typeSearch = 'appbar' }) {
  const navigate = useNavigate()

  // State xử lý hiển thị kết quả fetch về từ API
  const [open, setOpen] = useState(false)
  // State lưu trữ danh sách board fetch về được
  const [boards, setBoards] = useState(null)
  // Sẽ hiện loading khi bắt đầu gọi api fetch boards
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Khi đóng cái phần list kết quả lại thì đồng thời clear cho boards về null
    if (!open) { setBoards(null) }
  }, [open])

  // Xử lý việc nhận data nhập vào từ input sau đó gọi API để lấy kết quả về (cần cho vào useDebounceFn như bên dưới)
  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value
    if (!searchValue) {
      return
    }
    // console.log(searchValue)

    // Dùng createSearchParams của react-router-dom để tạo một cái searchPath chuẩn với q[title] để gọi lên API
    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
    // console.log(searchPath)

    // Gọi API...
    setLoading(true)
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || [])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  // Bọc hàm handleInputSearchChange vào useDebounceFn để tránh việc spam gọi API khi gõ
  // Làm useDebounceFn...
  const debounceSearchBoard = useDebounceFn(handleInputSearchChange, 1000)

  // Khi select chọn một cái board cụ thể thì sẽ điều hướng tới board đó luôn
  const handleSelectedBoard = (event, selectedBoard) => {
    // Phải kiểm tra nếu tồn tại một cái board cụ thể được select thì mới gọi điều hướng - navigate
    // console.log(selectedBoard)
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`)
    }
  }

  return (
    <Autocomplete
      sx={{ width: typeSearch === 'appbar' ? 250 : '100%', maxWidth: 400 }}
      id="asynchronous-search-board"
      // Cái text này hiện ra khi boards là null hoặc sau khi đã fetch boards nhưng rỗng - không có kết quả
      noOptionsText={!boards ? 'Type to search board...' : 'No board found!'}

      // Cụm này để handle việc đóng mở phần kết quả tìm kiếm
      open={open}
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}

      // getOptionLabel: để thằng Autocomplete nó lấy title của board và hiển thị ra
      getOptionLabel={(board) => board.title}

      // Options của Autocomplete nó cần đầu vào là 1 Array, mà boards của chúng ta ban đầu cần cho null để làm cái noOptionsText ở trên nên đoạn này cần thêm cái || [] vào
      options={boards || []}

      // Fix một cái warning của MUI, vì Autocomplete mặc định khi chọn giá trị nó sẽ xảy ra sự so sánh object bên dưới,
      // và mặc dù có 2 json objects trông như nhau trong JavaScript nhưng khi compare sẽ ra false.
      // Vậy nên cần compare chuẩn với value dạng Primitive,
      // ví dụ ở đây là dùng String _id thay vì compare toàn bộ cả cái json object board.
      // Link chi tiết: https://stackoverflow.com/a/65347275/8324172
      isOptionEqualToValue={(option, value) => option._id === value._id}

      // Loading
      loading={loading}

      // onInputChange sẽ chạy khi gõ nội dung vào thẻ input, cần làm debounce để tránh việc bị spam gọi API
      onInputChange={debounceSearchBoard}

      // onChange của cả cái Autocomplete sẽ chạy khi chúng ta select một cái kết quả (ở đây là board)
      onChange={handleSelectedBoard}

      // Render từng option trong list kết quả tìm kiếm (thumbnail + title + description)
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        const bg = option?.background || {}
        const thumbSize = 40 // Kích thước thumbnail

        return (
          <ListItem
            key={key}
            component="li"
            {...optionProps}
            sx={{ alignItems: 'flex-start', py: 1 }}
          >
            <ListItemAvatar sx={{ minWidth: 0, mr: 1 }}>
              <Box
                sx={{
                  width: thumbSize*1.5,
                  height: thumbSize,
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: 1,
                  bgcolor: bg?.backgroundType === 'color' ? (bg.backgroundUrl || '#1976d2') : '#1976d2'
                }}
              >
                {bg?.backgroundType === 'image' ? (
                  <Box
                    component="img"
                    src={bg.backgroundUrl}
                    alt={option.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : bg?.backgroundType === 'gradient' ? (
                  <Box sx={{ width: '100%', height: '100%', backgroundImage: bg.backgroundUrl, backgroundSize: 'cover' }} />
                ) : null}
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                  {option.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary" noWrap>
                  {option.description}
                </Typography>
              }
              sx={{ ml: 0 }}
            />
          </ListItem>
        )
      }}

      // Render ra cái thẻ input để nhập nội dung tìm kiếm
      renderInput={(params) => {
        // Nếu typeSearch là 'appbar' thì render TextField với style đặc biệt
        if (typeSearch === 'appbar') {
          return (
            <TextField
              {...params}
              type='text'
              label="Type to search..."
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                },
                '.MuiSvgIcon-root': { color: 'white' }
              }}
            />
          )
        }

        // Ngược lại render TextField với style mặc định (cho các vị trí khác)
        return (
          <TextField
            {...params}
            type='text'
            placeholder="Search boards..."
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& input': {
                  padding: '10px 14px',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
              }
            }}
          />
        )
      }}
    />
  )
}

export default AutoCompleteSearchBoard
