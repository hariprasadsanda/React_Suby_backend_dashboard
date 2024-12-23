import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
    <div className='not-foundSection'>
        <h1>404</h1>
        <h3>Page Not Found , Please Click on Go back</h3>
        <h6><Link to='/' style={{fontSize:'30px'}}> Go back</Link></h6>
    </div>
    </>
  )
}

export default PageNotFound
