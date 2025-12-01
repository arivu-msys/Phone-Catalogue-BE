/**
 * Order controller
 * Handles POST /placeOrder requests: validates body, enforces auth via middleware,
 * waits 5 seconds, and responds with received data.
 */
import { promisify } from 'util';

// Small helper to await a timeout using Promise
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * placeOrder
 * Expects JSON body. Returns status and echo of received data after 5s.
 */
export async function placeOrder(req, res) {
  try {
    const data = req.body;

    // Basic validation: ensure request body is an object
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // Simulate processing delay of 5 seconds
    await wait(5000);

    // Respond with success and echo of received data
    return res.status(200).json({ status: 'success', receivedData: data });
  } catch (err) {
    // Log error server-side and return 500
    // eslint-disable-next-line no-console
    console.error('Error in placeOrder:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
