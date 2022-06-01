import React from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
} from '@mui/material'
import { Stream } from '@mui/icons-material'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center'}}>
          <Icon>
            <Stream />
          </Icon>
          <Typography variant="h5" noWrap color="red" fontFamily='monospace'>
            KOMO Track
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
