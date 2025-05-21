import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

console.log('🌱 React app starting up')

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
