import { useState, useEffect } from 'react'
import styles from './App.module.scss'
import axios from 'axios';

type User = {
  id?: number;
  email?: string;
  password?: string;
}

function App() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);


  const fecthData = async () => {
    const response = await axios.get('http://localhost:3000/user/all');
    const data = response.data;
    return data;
  }
  
  const createUser = async (user: User | null) => {
    if (!user) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/user/create', user);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { 
    fecthData().then(setUsers);
  }, [])

  return (
    <>
      <h1>User Management</h1>
      <div className={styles.card}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="text" value={user?.email} onChange={(e) => setUser({ 
            ...user,
            email: e.target.value || ''
          })} />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input type="text" value={user?.password} onChange={(e) => setUser({
            ...user,
            password: e.target.value || ''
          })} />
        </div>
        <button onClick={() => createUser(user).then(() => fecthData().then(setUsers))}>
          Create User
        </button>
        <div >
          {users?.map((user) => (
            <div key={user?.id}>
              {user?.email}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
