import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState();
    // console.log(token);
    const navigate=useNavigate()
    
    
    useEffect(()=>{
      // console.log(token);
      const token = localStorage.getItem('hack') || '';
        async function  authorize() {
          try {
            const response = await axios.get('http://localhost:5000/api/user/me', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          
            
            if(response.status==200) {
              setUser(response.data)
              // console.log(response);
              
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
