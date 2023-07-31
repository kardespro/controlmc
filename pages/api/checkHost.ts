import { NextApiRequest, NextApiResponse } from 'next';
import { Rcon } from 'rcon-client';

interface QueryParams {
  host: string;
  port: number;
  password: string;
}

interface ResponseData {
  status: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { host, port, password }: QueryParams = req.query;
  if (!host || !port || !password) {
    return res.status(400).json({ status: 400, message: 'Missing parameters' });
  }

  const rcon = new Rcon({
    host,
    port,
    password,
  });

  try {
    await rcon.connect();
    res.status(200).json({ status: 200, message: 'Connected' });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: 'An error occurred while connecting' });
  }
}
