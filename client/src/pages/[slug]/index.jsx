import React, { useEffect, useState } from 'react';
import { SearchAPI } from '../api/serviceAPI';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const Index = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SearchAPI(slug);
        setProductData(res);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    // Only make the API call if the slug is available
    if (slug) {
      fetchData();
    }
  }, [slug]);
  console.log(router)
  return (
    <div className={styles.container}>
      {productData?.products?.length > 0 ? (
        productData.products.map((item, index) => (
          <div key={index} className={styles.productItem}>
            <img src={item.images[0]} alt={item.title} className={styles.productImage} />
            <div className={styles.productDetails}>
              <div className={styles.productTitle}>{item.title}</div>
              <div className={styles.productDescription}>{item.description}</div>
              <div className={styles.productPrice}>${item.price}</div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noProduct}>No Products Available!</div>
      )}
    </div>
  );
};

export default Index;
