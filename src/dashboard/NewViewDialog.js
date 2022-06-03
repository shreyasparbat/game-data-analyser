import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createView } from '../../services/api'

export default function NewViewDialog({ open, handleClose, changeCurrentView }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // Close dialog gracefully
  const closeDialog = () => {
    // Reset state (to avoid a bug)
    setName('')

    // Reset loading
    setLoading(false)

    // Parent closing handler
    handleClose()
  }

  // Fire create view API
  const newView = () => {
    setLoading(true)

    // Create a new view using API
    createView({
      name,
      layout: {},
      items: [],
    }).then(({ data: { id } }) => {
      // Change current view
      changeCurrentView(id)

      // Close this dialog
      closeDialog()
    })
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
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={newView}
          loading={loading}
          disabled={name === ''}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
