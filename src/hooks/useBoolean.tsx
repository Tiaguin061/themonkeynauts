import { useState } from 'react'

export function useBoolean(initialState?: boolean) {
  const [state, setState] = useState(initialState || false);

  function changeToTrue() {
    setState(true);
  }

  function changeToFalse() {
    setState(false);
  }

  return {
    setState,
    state,
    changeToTrue,
    changeToFalse
  }
}