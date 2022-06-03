import React from 'react'
import { Card, IconButton, Typography, Box } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function ChartCard({ id, onRemoveItem, component: Item, h, data }) {
  return (
    <Card width="100%" height="100%" display="flex">
      <Box
        display="flex"
        alignItems="center"
        padding="0.5rem"
        flexDirection="row"
      >
        <Typography variant="h6" gutterBottom>
          {id}
        </Typography>
        <Box flexGrow={1} />
        <IconButton aria-label="delete" onClick={() => onRemoveItem(id)}>
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Box padding="0.5rem" flexGrow={1}>
        <Item h={h} data={data} id={id}/>
      </Box>
    </Card>
  )
}
