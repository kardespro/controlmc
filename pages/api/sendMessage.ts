import { NextApiRequest, NextApiResponse } from 'next';
import { Rcon } from 'rcon-client';

interface QueryParams {
  host: string;
  port: string;
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

  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort)) {
    return res.status(400).json({ status: 400, message: 'Invalid port number' });
  }

  const rcon = new Rcon({
    host,
    port: parsedPort,
    password,
  });

  try {
    await rcon.connect();
    const response = await rcon.send(message);
    res.status(200).json({ status: 200, message: response });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: 'An error occurred while connecting' });
  }
}
