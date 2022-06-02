import React, { useEffect } from 'react'
import { Card, IconButton, Box } from '@mui/material'
import { Save, Download, Add } from '@mui/icons-material'
import AddList from './AddList'
import NewViewDialog from './NewViewDialog'
// import LoadViewDialog from './LoadViewDialog'

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  changeCurrentView,
}) {
  // To open/close Save View dialog
  const [open, setOpen] = React.useState(false)
  const [openLoadView, setOpenLoadView] = React.useState(false)

  // Open new view dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Close new view dialog
  const handleClose = () => {
    setOpen(false)
  }

  // Open Load view dialog
  const handleLoadViewClickOpen = () => {
    setOpenLoadView(true)
  }

  // Close load view dialog
  const handleLoadViewClose = () => {
    setOpenLoadView(false)
  }

  return (
    <>
      <Card padding={1} width="100%">
        <Box
          sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <AddList
            items={items}
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
            originalItems={originalItems}
          />
          <IconButton aria-label="save" onClick={onLayoutSave}>
            <Save />
          </IconButton>
          <IconButton aria-label="load" onClick={handleLoadViewClickOpen}>
            <Download />
          </IconButton>
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </Box>
      </Card>
      <NewViewDialog open={open} handleClose={handleClose}/>
      {/* <LoadViewDialog open={openLoadView} handleClose={handleLoadViewClose}/> */}
    </>
  )
}
