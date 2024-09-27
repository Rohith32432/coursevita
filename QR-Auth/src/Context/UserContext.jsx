import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState();

    const navigate=useNavigate()
    
    
    useEffect(()=>{
      const token = localStorage.getItem('hack') || '';
        async function  authorize() {
          try {
            if(token){
              
              const response = await axios.get('http://localhost:5000/api/user/me', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              
              
              if(response.status==200) {
                setUser(response.data)
              }
            }
          } catch (error) {
            console.error('Authorization error:', error);
             
          }
        };
        authorize()
      },[navigate])

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
