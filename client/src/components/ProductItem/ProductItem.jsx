import React from 'react'
import Button from '../Button/Button'
import './ProductItem.css'

const ProductItem = ({product, className, onAdd}) => {
const onAddHandler = () => {
  onAdd(product);
}

  return (
    <div className={'product' + className}>
<div className={'img'}></div>
<div className={'title'}></div>
<div className={'description'}></div>
<div className={'price'}>
<span>Price: <b>{product.price}</b></span>
</div>
<Button className={'add-btn'} onClick={onAddHandler}>
  Add to cart.
</Button>
    </div>
  )
}

export default ProductItem
