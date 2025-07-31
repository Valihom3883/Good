import axios from 'axios';

export default async function handler(req, res) {
  // Extract API route segments
  const route = req.query.route.join('/');
  const backendUrl = `${process.env.BACKEND_URL}/api/${route}`;

  try {
    // Proxy request to backend
    const response = await axios({
      method: req.method,
      url: backendUrl,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization
        })
      },
      validateStatus: () => true // Handle all status codes
    });

    // Forward backend response
    return res
      .status(response.status)
      .json(response.data);

  } catch (error) {
    console.error('Backend connection failed:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}
