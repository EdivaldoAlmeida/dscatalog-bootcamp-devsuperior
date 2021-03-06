import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader'
import './styles.scss';
import Pagination from 'core/components/Pagination';

const Catalog = () => {
    /* 
       P2 - Quando a lista estiver disponível popular um estado no componente
       e listar os produtos dinamicamente.
    */
   const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
   const [isLoading, setIsLoading] = useState(false);
   const [activePage, setActivePage] = useState(0);

    //O useEfect() consegue acessar o siclo de vida do compoente.
    //P1 - Buscar a lista de produtos assim que o componente iniciar
    //o .then informa que, após os dados serem carregados serão mostrados no console.
    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
        }
        //Inicia o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data))
        .finally( () => {
            //Finaliza o loader
            setIsLoading(false);
        })
    }, [activePage]);
    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
            </h1>
            <div className="catalog-products">
            {isLoading ? <ProductCardLoader /> : (
                productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product ={product}/>
                    </Link>
                ))
            ) }
            </div>
            {productsResponse &&  (
            <Pagination
                totalPage={productsResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)} 
            />
            )}
        </div>
    )
}

export default Catalog; 