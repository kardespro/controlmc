useEffect(() => {
    (async () => {
      let w = window.localStorage.getItem('creds');
      if (w === null) {
        w = ''; // Convert null to an empty string
      }
      let parsed: FormData = JSON.parse(w);
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
