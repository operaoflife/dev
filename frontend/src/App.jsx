import { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div>
      <h1>Frontend</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}