import type { NextApiRequest, NextApiResponse } from 'next'
const { sponsors } = require('./data.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
    const spons = sponsors.filter((s: any) => s.slug === req.query.slug);

  if(req.method === 'GET') {
    res.status(200).json(spons);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
}