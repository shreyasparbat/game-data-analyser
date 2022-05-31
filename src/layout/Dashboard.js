import React from 'react'
import Header from './Header'
import ChartGrid from './ChartGrid'

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <ChartGrid />
    </Box>
  )
}

export default Dashboard
