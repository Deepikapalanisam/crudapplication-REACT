// src/App.js
import React, { useState } from 'react';
import ItemList from './Components/ItemList';
import ItemForm from './Components/Itemform';

const App = () => {
    const [editingItem, setEditingItem] = useState(null);
    const [refreshList, setRefreshList] = useState(false); // Trigger refresh in ItemList

    const handleCancel = () => setEditingItem(null);

    const handleSave = () => {
        setEditingItem(null);
        setRefreshList(!refreshList); // Toggle to refresh the ItemList
    };

    return (
        <div className="App">
            <h1>Inventory Management</h1>
            <ItemForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
            <ItemList onEdit={(item) => setEditingItem(item)} refresh={refreshList} />
        </div>
    );
};

export default App;
