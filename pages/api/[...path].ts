import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve) => {
    // convert cookies to token
    const cookies = Cookies(req, res);
    const accessToken = cookies.get('access_token');

    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }
    //don't send cookies to API server
    req.headers.cookie = '';
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
    // res.status(200).json({ name: 'PATCH - match all here' });
    proxy.once('proxyRes', () => {
      resolve(undefined);
    });
  });
}
