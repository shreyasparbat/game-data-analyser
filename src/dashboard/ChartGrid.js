import React, { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import useWindowDimensions from '../util/useWindowDimensions'
import TopBar from './TopBar'
import LineReChart from './charts/LineReChart'

const ResponsiveGridLayout = WidthProvider(Responsive)

const originalItems = ['a', 'b', 'c', 'd']

const initialLayouts = {
  lg: [
    { w: 6, h: 6, x: 0, y: 0, i: 'a', moved: false, static: false },
    { w: 3, h: 6, x: 9, y: 0, i: 'b', moved: false, static: false },
    { w: 3, h: 6, x: 6, y: 0, i: 'c', moved: false, static: false },
    { w: 12, h: 4, x: 0, y: 6, i: 'd', moved: false, static: false },
  ],
}

const componentList = {
  a: LineReChart,
  b: <Widget id="b" backgroundColor="#fff5ab" />,
  c: <Widget id="c" backgroundColor="#ffcead" />,
  d: <Widget id="d" backgroundColor="#c449c2" />,
}

function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {}
    } catch (e) {}
  }
  return ls[key]
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      })
    )
  }
}

export default function ChartGrid() {
  // Get current window dimensions
  const { width } = useWindowDimensions()

  // Item State
  const [items, setItems] = useState(originalItems)

  // Layout State
  const [layouts, setLayouts] = useState(getFromLS('layouts') || initialLayouts)

  // Update layout state
  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts)
  }

  // Save layout in DB
  const onLayoutSave = () => {
    saveToLS('layouts', layouts)
  }

  // Remove item from layout
  const onRemoveItem = (itemId) => {
    setItems(items.filter((i) => i !== itemId))
  }

  // Add item to layout
  const onAddItem = (itemId) => {
    setItems([...items, itemId])
  }

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <ResponsiveGridLayout
        className="layout"
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        width={width}
      >
        {items.map((key) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
              component={componentList[key]}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  )
}
function Widget({ id, backgroundColor }) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor }}>
      {componentList[id]}
    </div>
  )
}
