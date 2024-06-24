'use client';

import React, { useState } from 'react';

// items load from json on server
const items = [
    { title: 'Cabbage', quant: 1 },
    { title: 'Garlic', quant: 2 },
    { title: 'Apple', quant: 3 },
];

// List items component
const ListItems = ({ items }) => {
    return items.map(item => (
        <tr className="flex justify-between" key={item.title}>
            <td>
                <label className="flex">
                    <input type="checkbox" className="mr-4 scale-150" />
                    <span>{item.title}</span>
                </label>
            </td>
            <td>
                {item.quant}
                <button className="ml-2">
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    ));
};

// Adding item inputs component
function AddingItem() {
    return (
        <tr className="flex justify-between" key="addingItem">
            <td>
                <label className="flex">
                    <input type="text" placeholder="Item" className="bg-transparent outline outline-2 outline-offset-2" />
                </label>
            </td>
            <td>
                <input type="number" placeholder="Quantity" className="bg-transparent outline outline-2 outline-offset-2" min="1" value={1} />
            </td>
        </tr>
    );
}

// Main page component
export default function Home() {
    const [isAddingItem, setIsAddingItem] = useState(false);

    const addItemInput = () => {
        setIsAddingItem(true);
    };

    return (
        <main className="flex-column p-3">
            <div className="flex justify-between text-4xl p-4 pr-7 items-center bg-slate-800 rounded-lg mb-4">
                <h1>List</h1>
                <button className="w-10 text-6xl" onClick={addItemInput}>+</button>
            </div>
            <div className="h-full text-2xl p-4 bg-slate-800 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="flex justify-between mb-4">
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isAddingItem && <AddingItem />}
                        <ListItems items={items} />
                    </tbody>
                </table>
            </div>
        </main>
    );
}
