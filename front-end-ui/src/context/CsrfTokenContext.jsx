import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:8080/api/csrf-token";

export const CsrfContext = createContext(null);

const CsrfContextProvider = (props) => {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });
        // console.log(response);
        setCsrfToken(response.data.token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={{ csrfToken }}>
      {props.children}
    </CsrfContext.Provider>
  );
};

export const useCsrf = () => {
  return useContext(CsrfContext);
};

export default CsrfContextProvider;
