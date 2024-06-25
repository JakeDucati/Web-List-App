'use client';

import React, { useState, useRef, useEffect } from 'react';

// items load from json on server
const items = [
    { title: 'Cabbage', quant: 1, checked: true },
    { title: 'Garlic', quant: 2, checked: false },
    { title: 'Apple', quant: 3, checked: false },
];

// list all items
const ListItems = ({items}) => {
    return items.map(item => (
        <tr className="flex justify-between" key={item.title}>
            <td>
                <label className="flex">
                    <input type="checkbox" className="mr-4 scale-150" defaultChecked={item.checked} />
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

// add item
function AddingItem({itemNameInput}) {
    const addItemTxt = (event) => {
        if (event.key === "Enter") {
            addItem();
        }
    }

    const addItem = async () => {
        const itemName = document.getElementById("itemName").value;
        const itemQuant = parseInt(document.getElementById("itemQuant").value);

        try {
            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({itemName, itemQuant}),
            });

            if (!response.ok) {
                throw new Error("Failed to add item");
            }

            // handle success
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr className="flex justify-between mb-4" key="addingItem">
            <td>
                <label className="flex">
                    <input id="itemName" type="text" placeholder="Item" ref={itemNameInput} onKeyDown={addItemTxt} className="bg-transparent outline-none border-b-2 border-white w-full" />
                </label>
            </td>
            <td>
                <input id="itemQuant" type="number" placeholder="Quantity" onKeyDown={addItemTxt} className="bg-transparent outline-none border-b-2 border-white w-14" min="1" value={1} />
            </td>
            <td>
                <button onClick={addItem} className="bg-slate-600 p-1 rounded-md">Add</button>
            </td>
        </tr>
    );
}

// page
export default function Home() {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const itemNameInput = useRef(null);

    const addItemInput = () => {
        setIsAddingItem(true);
    };

    useEffect(() => {
        if (isAddingItem && itemNameInput.current) {
            itemNameInput.current.focus();
        }
    }, [isAddingItem]);

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
                        {isAddingItem && <AddingItem itemNameInput={itemNameInput} />}
                        <ListItems items={items} />
                    </tbody>
                </table>
            </div>
        </main>
    );
}
