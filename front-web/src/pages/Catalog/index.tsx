import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => {
    /* 
       P2 - Quando a lista estiver disponível popular um estado no componente
       e listar os produtos dinamicamente.
    */
   const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    console.log(productsResponse);

    //O useEfect() consegue acessar o siclo de vida do compoente.
    //P1 - Buscar a lista de produtos assim que o componente iniciar
    //o .then informa que, após os dados serem carregados serão mostrados no console.
    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 10
        }
        makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data));
    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
                {productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product ={product}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Catalog; 