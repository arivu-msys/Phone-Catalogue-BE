import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Determine directory of current module to build path to assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Controller: getPhones
 * Reads the phones JSON file from src/assets/phones/phones.json and returns it.
 * On any file read or parse error, responds with 500 and a generic message.
 */
export async function getPhones(req, res) {
  try {
    // Build absolute path to the phones.json file in the assets folder
    const phonesPath = join(__dirname, '..', 'assets', 'phones', 'phones.json');

    // Read file contents as UTF-8 text
    const content = await readFile(phonesPath, 'utf8');

    // Parse JSON and send it back with correct content-type
    const data = JSON.parse(content);
    res.type('application/json').status(200).json(data);
  } catch (err) {
    // Log the error server-side for debugging (do not leak internals to client)
    // eslint-disable-next-line no-console
    console.error('Error reading phones.json:', err);

    // Send a generic error message to the client per requirements
    res.status(500).json({ message: 'Error loading phone data' });
  }
}
