import React from 'react';
import { Product } from 'core/types/Product';
import ProductPrice from '../ProductPrice';
import './styles.scss';

type Props = {
    product: Product;
}

const ProductCard = ( { product }: Props ) => (
<div className="card-base border-radius-10 product-card">
    <img src={product.imgUrl} alt={product.name} className="product-card-image" />
    <div className="product-inf">
        <h6 className="product-name">
            {product.name}
        </h6>
        <ProductPrice price={product.price}/>
    </div>
</div>

);

export default ProductCard;