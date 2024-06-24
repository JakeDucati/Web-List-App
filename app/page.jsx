// items load from json on server
const products = [
    { title: 'Cabbage', quant: 1 },
    { title: 'Garlic', quant: 2 },
    { title: 'Apple', quant: 3 },
];

// list item
const listitems = products.map(product =>
    <tr key={product.title}>
        <td>
            <label className="flex">
                <input type="checkbox" className="mr-4 scale-150" />
                <span>{product.title}</span>
            </label>
        </td>
        <td>{product.quant}</td>
    </tr>
);


// page
export default function Home() {
    return (
        <main className="flex-column p-3">
            <div className="flex justify-between text-4xl p-4 pr-7 items-center bg-slate-800 rounded-lg mb-4">
                <h1>List</h1>
                <button className="w-10 text-6xl">+</button>
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
                        {listitems}
                    </tbody>
                </table>
            </div>
        </main>
    );
}