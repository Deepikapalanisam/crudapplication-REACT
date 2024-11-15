// src/components/ItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = ({ onEdit, refresh }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h2>Item List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        <strong>{item.name}</strong> - {item.description} - Quantity: {item.quantity}
                        <button onClick={() => onEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
