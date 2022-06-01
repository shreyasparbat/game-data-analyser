import React from 'react'
import { Card, IconButton, Box } from '@mui/material'
import { Save, Download } from '@mui/icons-material'
import AddList from './AddList'

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
}) {
  return (
    <Card padding={1} width="100%">
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <AddList
          items={items}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
          originalItems={originalItems}
        />
        <IconButton aria-label="save" onClick={onLayoutSave}>
          <Save />
        </IconButton>
        <IconButton aria-label="load" onClick={}>
          <Download />
        </IconButton>
      </Box>
    </Card>
  )
}
