import { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

const UserInfo = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVR_URL}/me`, {
      method: "GET",
      credentials: "include",
    })
      .then(async res => {
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data);
      })
      .catch(err => {
        setUser(null);
      });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default UserInfo;
export { AppContext };
