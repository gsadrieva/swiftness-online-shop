import { useState, useEffect } from "react";
import userService from "../services/user.service";
import UserContext from "./user";

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      userService
      .getUser()
        .then((response) => response.data)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);
  
    function updateUser() {
      userService
      .getUser()
        .then((response) => response.data)
        .then((data) => {
          setUser(data);
        })
        .catch((err) => setUser(null));
    }
  
    return (
      <UserContext.Provider value={{ user, loading, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  export default UserProvider;