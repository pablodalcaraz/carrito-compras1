import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        UserName:'',
        UserLastName:'',
        UserMail:'',
        UserPassword:''
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false)
    

    const login = (userData) => {
      setUserData(userData);
      setIsLoggedIn(true);
      
  }

  const logout = () => {
      setUserData({
          UserName:'',
          UserLastName:'',
          UserMail:'',
          UserPassword:''
      });
      setIsLoggedIn(false);
      setShowUserMenu(false)
  }
  return (
    <UserContext.Provider 
    value={{userData,setUserData,isLoggedIn, setIsLoggedIn, isAuthenticated,setIsAuthenticated, login,logout,showUserMenu, setShowUserMenu}}>
      {children}</UserContext.Provider>
  )
}
