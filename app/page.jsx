'use client';

import React, { useState, useRef, useEffect } from 'react';


// fetch items
const fetchItems = async () => {
    try {
        const response = await fetch('/api/items/fetch');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


// list all items
const ListItems = ({ items, onItemCheck }) => {
    return items.map(item => (
        <tr className="flex justify-between" key={item.title}>
            <td>
                <label className="flex">
                    <input type="checkbox" className="mr-4 scale-150" defaultChecked={item.checked} onChange={() => onItemCheck(item.title, item.quant, item.checked)} />
                    <span>{item.title}</span>
                </label>
            </td>
            <td>
                {item.quant}
                <button className="ml-4">
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    ));
};


// update item check state (checked / unchecked)
const itemCheck = async (itemNameState, itemQuantState, checkState) => {
    const newCheckState = !checkState;

    try {
        const response = await fetch("/api/items/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemName: itemNameState, itemQuant: itemQuantState, checked: newCheckState }),
        });

        if (!response.ok) {
            throw new Error("Failed to update item");
        }

        // Handle success
        console.log("Checked / Unchecked Item");
    } catch (error) {
        console.log(error.message);
    }
};




// add item
function AddingItem({itemNameInput, setIsAddingItem }) {
    const addItemTxt = (event) => {
        if (event.key === "Enter") {
            addItem();
        }
    }

    const addItem = async () => {
        const itemName = document.getElementById("itemName").value;
        const itemQuant = parseInt(document.getElementById("itemQuant").value);
        const checked = false;

        try {
            const response = await fetch("/api/items/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({itemName, itemQuant, checked}),
            });

            if (!response.ok) {
                throw new Error("Failed to add item");
            }

            // handle success
            setIsAddingItem(false);
        } catch (error) {
            console.log(error.message);
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
                <input id="itemQuant" type="number" placeholder="Quantity" onKeyDown={addItemTxt} className="bg-transparent outline-none border-b-2 border-white w-14" min="1" defaultValue="1" />
            </td>
            <td>
                <button onClick={addItem} className="bg-slate-600 p-1 rounded-md">Add</button>
            </td>
        </tr>
    );
}



// page
export default function Home() {
    const [items, setItems] = useState([]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const itemNameInput = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const newItems = await fetchItems();
            setItems(newItems);
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);

    const addItemInput = () => {
        setIsAddingItem(true);
    };

    useEffect(() => {
        if (isAddingItem && itemNameInput.current) {
            itemNameInput.current.focus();
        }
    }, [isAddingItem]);

    const handleItemCheck = (itemName, itemQuant, checked) => {
        itemCheck(itemName, itemQuant, checked);
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
                        {isAddingItem && <AddingItem itemNameInput={itemNameInput} setIsAddingItem={setIsAddingItem} />}
                        <ListItems items={items} onItemCheck={handleItemCheck} />
                    </tbody>
                </table>
            </div>
        </main>
    );
}
