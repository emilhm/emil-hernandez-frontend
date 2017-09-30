import React from 'react'
import Categories from '../../Categories/Categories'

const CategoriesComponent = () => {
  return (
    <div>
      <h2 className="text-center">Escoje la categoria y empieza a comprar</h2>
      <Categories ClassComponent="categoriesComponent" />
    </div>
  )
}

export default CategoriesComponent
