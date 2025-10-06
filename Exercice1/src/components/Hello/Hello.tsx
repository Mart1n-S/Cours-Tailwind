// import { useState } from 'react'

export function Hello({text}: {text?: string}) {
  return (
    <div>
      <p>{text ? text : "Bonjour"}</p>
    </div>
  )
}