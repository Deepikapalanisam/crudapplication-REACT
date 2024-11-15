// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ItemForm = ({ item, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setQuantity(item.quantity);
        } else {
            setName('');
            setDescription('');
            setQuantity('');
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name, description, quantity };

        try {
            if (item) {
                await axios.put(`http://localhost:5000/api/items/${item._id}`, newItem);
            } else {
                await axios.post('http://localhost:5000/api/items', newItem);
            }
            onSave();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{item ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ItemForm;
