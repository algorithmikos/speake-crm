import React from 'react'

function PageTitle({children}) {
  return (
    <h2 className="m-3">{children.toUpperCase()}</h2>
  )
}

export default PageTitle