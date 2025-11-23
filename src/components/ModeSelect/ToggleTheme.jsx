import { useState } from 'react'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
// import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { Moon, Sun } from 'lucide-react'

export default function ToggleTheme() {
  const { mode, setMode } = useColorScheme()
  const [darkMode, setDarkMode] = useState(mode === 'dark')
  if (!mode) return null
  // const handleChange = (event) => {
  //   setMode(event.target.value)
  // }

  return (
    // <FormControl size="small" sx={{ minWidth: '120px' }}>
    //   <InputLabel
    //     id="demo-select-small-label"
    //     sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
    //   >
    //     Mode
    //   </InputLabel>
    //   <Select
    //     labelId="select-small-mode"
    //     id="select-small"
    //     value={mode}
    //     label="Mode"
    //     onChange={handleChange}
    //     sx={{
    //       color: 'white',
    //       '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    //       '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    //       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //         borderColor: 'white'
    //       }
    //     }}
    //   >
    //     <MenuItem value="light">
    //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //         <LightModeIcon fontSize="small" />
    //         Light
    //       </Box>
    //     </MenuItem>
    //     <MenuItem value="dark">
    //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //         <DarkModeIcon fontSize="small" />
    //         Dark
    //       </Box>
    //     </MenuItem>
    //     <MenuItem value="system">
    //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    //         <SettingsBrightnessIcon fontSize="small" />
    //         System
    //       </Box>
    //     </MenuItem>
    //   </Select>
    // </FormControl>
    <>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => {
          setDarkMode(!darkMode)
          setMode(darkMode ? 'light' : 'dark')
        }}
        className={`p-2 rounded-lg ${
          darkMode
            ? 'bg-gray-800 hover:bg-gray-600 text-yellow-400'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        } transition-colors`}
        title={darkMode ? 'Light Mode' : 'Dark Mode'}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </>
  )
}
