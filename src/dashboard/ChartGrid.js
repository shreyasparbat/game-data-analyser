import React, { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import useWindowDimensions from '../util/useWindowDimensions'
import TopBar from './TopBar'
import LineReChart from './charts/LineReChart'
import ChartCard from './ChartCard'
import { readData, readView, updateView } from '../../services/api'

const ResponsiveGridLayout = WidthProvider(Responsive)

// const initialLayouts = {
//   lg: [
//     { w: 6, h: 6, x: 0, y: 0, i: 'a', moved: false, static: false },
//     { w: 3, h: 6, x: 9, y: 0, i: 'b', moved: false, static: false },
//     { w: 3, h: 6, x: 6, y: 0, i: 'c', moved: false, static: false },
//     { w: 12, h: 4, x: 0, y: 6, i: 'd', moved: false, static: false },
//   ],
// }

const componentList = {
  'line': LineReChart,
}

const rowHeight = 120

export default function ChartGrid() {
  // Get current window dimensions
  const { width } = useWindowDimensions()

  // Current view ID
  const [currentViewId, setCurrentViewId] = useState('Default')

  // Current view
  const [currentView, setCurrentView] = useState({})

  // All State
  const [allCharts, setAllCharts] = useState([])

  // To know which breakpoint to use in layouts
  const [currentBreakpoint, setCurrentBreakout] = useState('lg')

  // Get data before mount
  useEffect(async () => {
    // Get all charts
    setAllCharts(await readData())

    // Get info on current view and save
    setCurrentView(readView(currentViewId))
  })

  // Update layout state
  const onLayoutChange = (_, allLayouts) => {
    setCurrentView({
      name: currentView.name,
      items: currentView.items,
      layouts: allLayouts,
    })
  }

  // Remove item from layout
  const onRemoveItem = (itemId) => {
    setCurrentView({
      name: currentView.name,
      items: currentView.items.filter((i) => i !== itemId),
      layouts: currentView.layouts,
    })
  }

  // Add item to layout
  const onAddItem = (itemId) => {
    setCurrentView({
      name: currentView.name,
      items: [...currentView.items, itemId],
      layouts: currentView.layouts,
    })
  }

  // Notify breakpoint changes
  const onBreakpointChange = (newBreakpoint) => {
    setCurrentBreakout(newBreakpoint)
  }

  // Update view in Firestore
  const saveCurrentView = () => {
    updateView(currentView, currentViewId)
  }

  // Change the view given ID
  const changeCurrentView = (viewId) => {
    setCurrentViewId(viewId)
    setCurrentView(readView(viewId))
  }

  return (
    <>
      <TopBar
        onLayoutSave={saveCurrentView}
        items={currentView.items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={charts.map((chart) => chart.id)}
        changeCurrentView={changeCurrentView}
      />
      <ResponsiveGridLayout
        className="layout"
        layout={currentView.layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        aspect
        width={width}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
      >
        {currentView.items.map((item) => {
          // Calculate correct height for this chart
          const thisBreak = currentView.layouts[currentBreakpoint]
          const thisLayout = thisBreak
            ? thisBreak.find((l) => l.i == chart.id)
            : null
          const h = thisLayout ? thisLayout.h : 3
          const height = h * rowHeight - 70

          // Find the chart for this item
          const chart = allCharts.find(c => c.id === item)

          return (
            <div
              key={item}
              className="widget"
              data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
            >
              <ChartCard
                id={item}
                onRemoveItem={onRemoveItem}
                component={componentList[chart.type]}
                data={chart.data}
                h={height}
              />
            </div>
          )
        })}
      </ResponsiveGridLayout>
    </>
  )
}
