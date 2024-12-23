import React from 'react'

const Sidebar = ({addFirmHandler , addProductHandler,getAllProductsHandler,showFirmTitle}) => {
  return (
   <div className="sidebarSection">
        <ul>
          {showFirmTitle ? <li onClick={addFirmHandler}>Add Firm</li> :""}
        <li onClick={addProductHandler}>Add Products</li>
        <li onClick={getAllProductsHandler}>All Products</li>
        <li>User Details</li>
        </ul>
   </div>

  )
}

export default Sidebar
