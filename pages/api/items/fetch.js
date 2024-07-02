import fs from 'fs/promises';
import path from 'path';

const JSON_FILE_PATH = path.join(process.cwd(), 'data/items.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const jsonContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            const items = JSON.parse(jsonContent);
            res.status(200).json(items);
        } catch (error) {
            console.error('Error reading items:', error);
            res.status(500).json({ error: 'Failed to load items' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
