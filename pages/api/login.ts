import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '@/config/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { loginEmail, loginPassword } = req.body;

        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: loginEmail,
                password: loginPassword
            })
        })

        const data = await strapiRes.json();

        if (strapiRes.ok) {

            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
                path: '/'
            }))

            res.status(200).json({ user: data.user });
        } else {
            res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
}