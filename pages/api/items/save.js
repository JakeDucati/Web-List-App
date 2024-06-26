import fs from 'fs/promises';
import path from 'path';

// path to the json file
const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'items.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { itemName, itemQuant, checked } = req.body;

        try {
            // read json
            const jsonContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            const currentItems = JSON.parse(jsonContent);

            // append new item
            currentItems.push({ title: itemName, quant: itemQuant, checked: checked });

            // write to file
            await fs.writeFile(JSON_FILE_PATH, JSON.stringify(currentItems, null, 2));

            res.status(200).json({ message: 'Item added successfully' });
        } catch (error) {
            console.error('Error adding item:', error);
            res.status(500).json({ error: 'Failed to add item' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
