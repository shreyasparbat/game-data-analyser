import React, { useEffect } from 'react'
import { Card, IconButton, Box } from '@mui/material'
import { Save, Download, Add } from '@mui/icons-material'
import AddList from './AddList'
import NewViewDialog from './NewViewDialog'

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  saveView,
}) {
  // To open/close Save View dialog
  const [open, setOpen] = React.useState(false)

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Close dialog
  const handleClose = () => {
    setOpen(false)
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
          <IconButton aria-label="load" onClick={() => {}}>
            <Download />
          </IconButton>
          <IconButton aria-label="add" onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Box>
      </Card>
      <NewViewDialog open={open} />
    </>
  )
}
