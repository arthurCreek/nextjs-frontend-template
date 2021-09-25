import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

type UserContextObj = {
  user?: any | null;
  error: any;
  register: (user: any) => void;
  login: (loginInfo: UserProps) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContextObj>({
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {}
})

export interface Props {
  children: any
}

export interface UserProps {
  email: any,
  password: any
}

export const AuthProvider = (props: Props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchDataAsync = async () => {
       await checkUserLoggedIn();
    }   
    fetchDataAsync()
   }, []);

  // Register user
  const register = async (user: any) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await res.json();

    if (res.ok) {
      setUser(data.user)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Login user
  const login = async (userProps: UserProps) => {
    const loginEmail = userProps.email;
    const loginPassword = userProps.password;
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginEmail,
        loginPassword,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      // router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }

  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext