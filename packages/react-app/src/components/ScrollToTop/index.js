import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

export const ScrollToTop = withRouter(({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return <>{children}</>
})
