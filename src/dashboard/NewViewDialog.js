import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createView } from '../../services/api'

export default function NewViewDialog({ open, handleClose }) {
  const [name, setName] = useState('')

  // Close dialog gracefully
  const closeDialog = () => {
    // Reset state (to avoid a bug)
    setName('')

    // Parent closing handler
    handleClose()
  }

  // Fire create view API
  const newView = () => {
    // Create a new view using API
    createView({
      name,
      layout: {},
    })

    // Close this dialog
    closeDialog()
  }

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>New View</DialogTitle>
      <DialogContent>
        <DialogContentText>Give your new view a name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={newView} disabled={name === ''}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
