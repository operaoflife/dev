import { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add cache buster and ensure trailing slash
        const url = new URL(import.meta.env.VITE_API_URL || '/api/', window.location.origin)
        url.searchParams.set('_', Date.now())  // Cache busting
        
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })

        console.log('Response status:', response.status)
        console.log('Request URL:', url.toString())

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - ${response.statusText}`)
        }

        const jsonData = await response.json()
        setData(jsonData)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Fetch error:', {
          message: err.message,
          stack: err.stack
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Add slight delay to show loading state
    const timeout = setTimeout(fetchData, 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>CI/CD Pipeline Demo</h1>
      {error ? (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <h2>Error fetching data:</h2>
          <p>{error}</p>
          <p>Attempted backend URL: {import.meta.env.VITE_API_URL || '/api/'}</p>
          <p>Environment: {import.meta.env.MODE}</p>
          <p>Build version: {import.meta.env.VITE_BUILD_TIMESTAMP}</p>
        </div>
      ) : isLoading ? (
        <p style={{ color: '#666' }}>Initializing backend connection...</p>
      ) : data ? (
        <div style={{ marginTop: '1rem' }}>
          <h2>Backend Response:</h2>
          <pre style={{ 
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Environment: {data.environment} | Timestamp: {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      ) : (
        <p style={{ color: '#666' }}>No data received from backend</p>
      )}
    </div>
  )
}