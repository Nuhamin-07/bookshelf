import { loadDevTools } from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from 'context/index.exercise'
import { App } from './app'



export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <AppProviders>
      <App />
    </AppProviders>
  )
  rootRef.current = root
})
