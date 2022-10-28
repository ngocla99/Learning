import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import { CategoryContainer, Title } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    const isLoading = useSelector(selectCategoriesIsLoading);

    useEffect(() => {
        console.log('useEffect trigger component');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
                </CategoryContainer>
            )}
        </Fragment>
    );
};

export default Category;
