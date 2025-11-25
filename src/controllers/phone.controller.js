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

/**
 * Controller: getPhoneDetails
 * Reads a single product JSON file from src/assets/phones/{productId}.json
 * If the file does not exist, responds with 404 and a clear message.
 * Any unexpected error results in a 500 response.
 */
export async function getPhoneDetails(req, res) {
  const { productId } = req.params;

  try {
    // Build path to the requested product JSON
    const productPath = join(__dirname, '..', 'assets', 'phones', `${productId}.json`);

    // Read file contents asynchronously
    const content = await readFile(productPath, 'utf8');

    // Parse and return the product data
    const product = JSON.parse(content);
    return res.status(200).type('application/json').json(product);
  } catch (err) {
    // If file not found, respond with 404
    if (err.code === 'ENOENT') {
      return res.status(404).json({ message: 'Phone not found' });
    }

    // Log unexpected errors and respond with 500
    // eslint-disable-next-line no-console
    console.error(`Error reading product ${productId}:`, err);
    return res.status(500).json({ message: 'Server error' });
  }
}
