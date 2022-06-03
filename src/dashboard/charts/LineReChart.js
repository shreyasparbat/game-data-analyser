import { Typography } from '@mui/material'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const colours = ['red', 'orange', 'green']

const dataKeys = {
  MAU: ['value'],
  'Avg Monthly Co-op Battle Completion': ['Started', 'Completed'],
}

export default function LineReChart({ h, data, id }) {
  return (
    <ResponsiveContainer width="99%" height={h}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys[id].map((key, idx) => (
          <Line
            type="monotone"
            dataKey={key}
            stroke={colours[idx]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
