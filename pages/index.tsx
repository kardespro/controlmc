import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../components/Auth';
import Console from '../components/Console';

interface FormData {
  host: string;
  password: string;
  port: string;
}

const Home: NextPage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<{ command: string; message: string }>({ command: '', message: '' });

  useEffect(() => {
    (async () => {
      let w = window.localStorage.getItem('creds');
      let parsed: FormData = JSON.parse(w ?? '{}');
      if (parsed.host && parsed.password && parsed.port) {
        try {
          let data = await axios.get(`/api/checkHost?host=${parsed.host}&password=${parsed.password}&port=${parsed.port}`);
          if (data.data.status === 200) {
            setLoading(true);
            setAuthenticated(true);
            setTimeout(() => setLoading(false), 3000);
          } else {
            setAuthenticated(false);
          }
        } catch (error) {
          setAuthenticated(false);
        }
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData: FormData = {
      host: e.currentTarget.host.value,
      password: e.currentTarget.password.value,
      port: e.currentTarget.port.value,
    };

    try {
      let data = await axios.get(`/api/checkHost?host=${formData.host}&password=${formData.password}&port=${formData.port}`);
      if (data.data.status === 200) {
        setLoading(true);
        setAuthenticated(true);
        window.localStorage.setItem('creds', JSON.stringify(formData));
        setTimeout(() => setLoading(false), 3000);
      } else {
        setLoading(false);
        setAuthenticated(false);
      }
    } catch (error) {
      setLoading(false);
      setAuthenticated(false);
    }
  };

  const handleSubmitCommand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let w = window.localStorage.getItem('creds');
    let parsed: FormData = JSON.parse(w) ?? {}; // Provide a default value of an empty object {}
    try {
      let d = await axios.get(`/api/sendCommand?host=${parsed.host}&port=${parsed.port}&password=${parsed.password}&message=${e.currentTarget.command.value}`);
      setOutput({
        command: e.currentTarget.command.value,
        message: d.data.message,
      });
    } catch (err) {
      console.log('Invalid Rcon Session or Expired');
      setOutput({
        command: 'try again',
        message: 'Invalid Rcon Session or Expired',
      });
    }
  };

  return (
    <>
      <Head>
        <title>ControlMC</title>
        <meta name="description" content="ControlMC is Minecraft Pocket edition Control panel, connection with rcon protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="pt-24">
        {authenticated ? (
          <>
            {loading ? (
              <Auth />
            ) : (
              <>
                <div className="p-4">
                  <div className="bg-gray-900 rounded-3xl mb-1.5 py-5 px-5 p-4">
                    <div className="pt-6">
                      {output.command !== '' ? (
                        <>
                          <Console command={output.command} message={output.message} />
                        </>
                      ) : (
                        <>
                          <Console command="" message={`Connected in ${Date.now()}`} />
                        </>
                      )}
                      <form className="pt-4" onSubmit={handleSubmitCommand}>
                        <div className="flex justify-center items-center">
                          <input
                            className="border-4 border-gray-800 bg-gray-900 rounded-3xl py-5 px-5 hover:outline-none w-full text-slate-200"
                            name="command"
                            placeholder="op <your username here>"
                            type="text"
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <Auth />
            ) : (
              <>
                <div className="p-4">
                  <div className="bg-gray-900 rounded-3xl mb-1.5 py-5 px-5 p-4 max-w-auto">
                    <div className="pt-12">
                      <form className="p-4 max-auto" onSubmit={handleSubmit}>
                        <div className="pt-2">
                          <input
                            className="border-4 border-gray-800 bg-gray-900 rounded-3xl py-5 px-5 hover:outline-none w-full text-slate-200"
                            name="host"
                            placeholder="Host"
                            required
                          />
                        </div>

                        <div className="pt-2">
                          <input
                            className="border-4 border-gray-800 bg-gray-900 rounded-3xl py-5 px-5 hover:outline-none w-full text-slate-200"
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                          />
                        </div>
                        <div className="pt-2">
                          <input
                            name="port"
                            className="border-4 border-gray-800 bg-gray-900 rounded-3xl py-5 px-5 hover:outline-none w-full text-slate-200"
                            placeholder="Port Number"
                            type="number"
                            required
                          />
                        </div>
                        <div className="flex justify-center items-center pt-4">
                          <button className="bg-gray-900 border-4 border-gray-800 rounded-3xl py-5 px-5 w-full text-slate-200 hover:outline-none" type="submit">
                            Connect
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
