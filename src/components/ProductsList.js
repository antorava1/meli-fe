import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import freeShippingIcon from '../assets/freeShippingIcon.png';

function ProductsList() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const searchParams = new URLSearchParams(window.location.search)
            console.log(searchParams)
            try {
                const response = await fetch(`http://localhost:3001/api/items?q=${searchParams.get("search")}`);
                const data = await response.json();
                setResults(data.items);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    return (
        <section>
            <nav>
                <ul className="breadcrumb">
                    <li>Hola</li>
                    <li>Samsung</li>
                    <li>Celulares</li>
                </ul>
            </nav>
            <article className="grid gap-4">
                {results.map(item => (
                    <Link key={item.id} to={`/items/${item.id}`} className="link-text">
                        <img src={item.picture} alt={item.title} className="link-img"/>
                        <div>
                            <p className="price-text">
                                {Intl.NumberFormat('es-AR', { style: 'currency', currency: item.price.currency }).format(item.price.amount)}
                                {item.free_shipping && (
                                <img src={freeShippingIcon}
                                alt="search-icon"
                                className="free-shipping-icon"
                            />
                            )}
                            </p>
                            <p className="title-text">{item.title}</p>
                        </div>
                        <span className="city-text">{item.address}</span>
                    </Link>
                ))}
            </article>
        </section>
    );
}

export default ProductsList;




