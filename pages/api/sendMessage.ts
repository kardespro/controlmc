import { NextApiRequest, NextApiResponse } from 'next';
import { Rcon } from 'rcon-client';

interface QueryParams {
  host: string;
  port: number;
  password: string;
  message: string;
}

interface ResponseData {
  status: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { host, port, password, message }: QueryParams = req.query;
  if (!host || !port || !password || !message) {
    return res.status(400).json({ status: 400, message: 'Missing parameters' });
  }

  const rcon = new Rcon({
    host,
    port,
    password,
  });

  try {
    await rcon.connect();
    let d = await rcon.send(message)
    res.status(200).json({ status: 200, message: d });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: 'An error occurred while connecting' });
  }
}
