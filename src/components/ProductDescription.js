import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function capitalize(text) {
    if (!text) {
        return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function toSpanish(condition) {
    const conditionMap = {
        new: 'Nuevo',
        used: 'Usado',
    };
    return conditionMap[condition] || condition;
}   

function ProductDescription(props) {
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3001/api/items/${id}`);
                const data = await response.json();
                setItem(data.item);
                setCategories(data.item.categories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);

    return (
        <section>
            <article>
                <nav>
                    <ul className="breadcrumb">
                        {categories && categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </nav>
                    <div key={id} className="description-container">
                        <img src={item.picture} alt={item.title} className="description-img" />
                        <div className="description-details">
                            <p className="description-status">{capitalize(toSpanish(item.condition))} - {item.sold_quantity} Vendidos </p>
                            <p className="description-title">{item.title}</p>
                            <p className="description-price">
                                {item.price && item.price.currency && 
                                    Intl.NumberFormat('es-AR', { style: 'currency', currency: item.price.currency }).format(item.price.amount)
                                }
                            </p>
                            <button className="buy-button">Comprar</button>
                        </div>
                    </div>
                    <div className="text-container">
                        <span className="description-product-title">Descripción del producto</span>
                        <p className="description-text">{item.description}</p>
                    </div>
            </article>
        </section>
    );
}

export default ProductDescription;



