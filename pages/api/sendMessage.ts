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
  const { host, port, password, message } = req.query;
  if (!host || !port || !password || !message) {
    return res.status(400).json({ status: 400, message: 'Missing parameters' });
  }

  const parsedPort = parseInt(port as string, 10);
  if (isNaN(parsedPort)) {
    return res.status(400).json({ status: 400, message: 'Invalid port number' });
  }

  const queryParams: QueryParams = {
    host: host as string,
    port: parsedPort,
    password: password as string,
    message: message as string,
  };

  const rcon = new Rcon({
    host: queryParams.host,
    port: queryParams.port,
    password: queryParams.password,
  });

  try {
    await rcon.connect();
    const response = await rcon.send(queryParams.message);
    res.status(200).json({ status: 200, message: response });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: 'An error occurred while connecting' });
  }
}
