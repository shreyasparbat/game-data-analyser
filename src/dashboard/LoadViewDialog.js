import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { List } from '@mui/material'
import { readViewsInfo } from '../../services/api'

export default function NewViewDialog({ open, handleClose,changeCurrentView }) {
  // To store view names available
  const [viewsInfo, setViewsInfo] = useState([])

  // Populate available view names
  useEffect(async () => {
    const v = await readViewsInfo()
    setViewsInfo(v)
    console.log(v)
  })

  // Switch to this view
  const handleSelection = (info) => {
    // Switch
    changeCurrentView(info.id)

    // Close after switching
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Load View</DialogTitle>
      <DialogContent>
        <Box sx={{ width: 360, height: 500 }}>
          <List>
            {viewsInfo.map((info) => (
              <ListItem>
                <ListItemButton onClick={() => handleSelection(info)}>
                  <ListItemText primary={info.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
