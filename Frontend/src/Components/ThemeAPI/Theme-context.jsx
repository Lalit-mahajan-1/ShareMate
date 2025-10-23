import { createContext ,useContext , useState,useEffect} from "react";
const ThemeContext = createContext();

export const useTheme = () =>{
    return useContext(ThemeContext);
}

export const ThemeProvider = ({children}) =>{
      const [isDarkMode, setIsDarkMode] = useState(true);
      const toggleTheme =()=>{
        setIsDarkMode((prev)=>!prev)
      }

      const theme = isDarkMode?"dark":"light";
      

      useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);  
      })
      
      return <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
      </ThemeContext.Provider>
}