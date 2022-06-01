import React from 'react'
import Header from '../layout/Header'
import ChartGrid from './ChartGrid'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <Box sx={{width: '100%', height: '100%'}}>
      <Header />
      <ChartGrid />
    </Box>
  )
}

export default Dashboard
