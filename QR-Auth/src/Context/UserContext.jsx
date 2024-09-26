import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    // console.log(token);
    
    async function  authorize() {
      const token = localStorage.getItem('hack') || '';
        try {
          const response = await axios.get('http://localhost:5000/api/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          
          if(response.status==200) {
            setUser(response.data)
            console.log(response);
            
          }
        } catch (error) {
          console.error('Authorization error:', error);
           
        }
      };
      
      useEffect(()=>{
        authorize()
      },[])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(UserContext);
};

export default UserProvider;
