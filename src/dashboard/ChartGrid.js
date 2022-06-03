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

const componentList = {
  line: LineReChart,
}

const rowHeight = 120

export default function ChartGrid() {
  // Get current window dimensions
  const { width } = useWindowDimensions()

  // Current view ID
  const [currentViewId, setCurrentViewId] = useState('fL3Ba1D9JfNxarVmF9dg')

  // Current view
  const [currentView, setCurrentView] = useState({
    name: 'Default',
    items: [],
    layouts: {},
  })

  // All State
  const [allCharts, setAllCharts] = useState([])

  // To know which breakpoint to use in layouts
  const [currentBreakpoint, setCurrentBreakout] = useState('lg')

  // Update charts at the begining
  useEffect(() => {
    const fetchData = async () => {
      setAllCharts((await readData()).data)
    }
    fetchData().catch(console.error)
  }, [setAllCharts, setCurrentView])

  // Update view whenever view ID is updated
  useEffect(() => {
    const fetchData = async () => {
      setCurrentView((await readView(currentViewId)).data)
    }
    fetchData().catch(console.error)
  }, [setCurrentViewId, setCurrentView])


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
        originalItems={allCharts.map((chart) => chart.id)}
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
          // Find the chart for this item
          const chart = allCharts.find((c) => c.id === item)

          // Calculate correct height for this chart
          const thisBreak = currentView.layouts[currentBreakpoint]
          const thisLayout = thisBreak
            ? thisBreak.find((l) => l.i == item)
            : null
          const h = thisLayout ? thisLayout.h : 3
          const height = h * rowHeight - 70

          return (
            <div
              key={item}
              className="widget"
              data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
            >
              <ChartCard
                id={item}
                onRemoveItem={onRemoveItem}
                component={componentList[chart ? chart.type : 0]}
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
