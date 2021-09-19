import type { NextApiRequest, NextApiResponse } from 'next'
const { sponsors } = require('./data.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    res.status(200).json(sponsors);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
}