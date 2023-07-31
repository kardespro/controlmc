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
  const { host, port, password } = req.query;
  if (typeof host !== 'string' || typeof port !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ status: 400, message: 'Missing or invalid parameters' });
  }

  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort)) {
    return res.status(400).json({ status: 400, message: 'Invalid port number' });
  }

  const queryParams: QueryParams = {
    host,
    port: parsedPort,
    password,
  };

  const rcon = new Rcon({
    host: queryParams.host,
    port: queryParams.port,
    password: queryParams.password,
  });

  try {
    await rcon.connect();
    res.status(200).json({ status: 200, message: 'Connected' });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: 'An error occurred while connecting' });
  }
}
