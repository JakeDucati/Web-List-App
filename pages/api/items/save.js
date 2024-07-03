import fs from 'fs/promises';
import path from 'path';

const JSON_FILE_PATH = path.join(process.cwd(), 'data', 'items.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { itemName, itemQuant, checked } = req.body;

        try {
            // read JSON file
            const jsonContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            const currentItems = JSON.parse(jsonContent);

            // check if item exists (checking by item name)
            const itemIndex = currentItems.findIndex(item => item.title === itemName);

            if (itemIndex !== -1) {
                // if item exists, replace it (and update quantity and checked state if needed)
                currentItems[itemIndex] = { title: itemName, quant: itemQuant, checked: checked };
            } else {
                // if item doesnt exist, append it
                currentItems.push({ title: itemName, quant: itemQuant, checked: checked });
            }

            // write to file
            await fs.writeFile(JSON_FILE_PATH, JSON.stringify(currentItems, null, 2));

            res.status(200).json({ message: 'Item added or updated successfully' });
        } catch (error) {
            console.error('Error adding item:', error);
            res.status(500).json({ error: 'Failed to add item' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
