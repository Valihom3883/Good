// API route handler - only for frontend API routes
export default function handler(req, res) {
  // Forward to backend API
  return fetch(`${process.env.BACKEND_URL}/api/${req.query.slug.join('/')}`, {
    method: req.method,
    headers: req.headers,
    body: req.body
  })
    .then(backendRes => backendRes.json())
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
}
