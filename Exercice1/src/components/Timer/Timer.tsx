import { useEffect, useState } from 'react'

export function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [intervalMs, setIntervalMs] = useState(1000)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, intervalMs)

    // Nettoyage du timer à chaque changement ou à l'arrêt
    return () => clearInterval(id)
  }, [isRunning, intervalMs])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => setSeconds(0)

  return (
    <div>
      <p>Timer : {seconds} secondes</p>

      <label>
        Intervalle de mise à jour (ms) :{' '}
        <input
          type="number"
          value={intervalMs}
          onChange={(e) => setIntervalMs(Number(e.target.value))}
          min={100}
          step={100}
        />
      </label>

      <div>
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleStop} disabled={!isRunning}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
