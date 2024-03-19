import { jwtDecode } from "jwt-decode"
import { createContext, useState } from "react"
import { IUserDetailsType, IUserCustomJwtPayload, IUserAuthContextType, IUserSignup } from "../interfaces/IUserDetails"
import { doSignUp, removeToken } from "../Services/UserService"





export const AuthContext = createContext<IUserAuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [isBusiness, setIsBusiness] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [userDetails, setUserDetails] = useState<IUserDetailsType | undefined>(undefined)



    const getUserById = async (): Promise<null | string> => {
        const token: null | string = localStorage.getItem('userToken')
        if (!token) return null
        const decoded = jwtDecode<IUserCustomJwtPayload>(token)
        try {
            const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${decoded._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })

            if (!response.ok) throw new Error(response.statusText)

            const userDetails: IUserDetailsType = await response.json()
            setUserDetails(userDetails)

            return null

        } catch (err) {
            const errMessage = (err as Error).message
            return errMessage
        }
    }


    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.text()

            if (!response.ok) throw new Error(data)

            const decoded = jwtDecode<IUserCustomJwtPayload>(data)

            setIsSignedIn(true)
            setIsBusiness(decoded.isBusiness)
            setIsAdmin(decoded.isAdmin)

            localStorage.setItem('userToken', data)

            const errorMessage = await getUserById()
            if (errorMessage) throw new Error(errorMessage)

        } catch (err) {
            const errMessage = (err as Error).message
            return errMessage
        }
    }


    const logOut = async () => {
        alert("You'r Sign Out")
        setIsSignedIn(false)
        await removeToken()
        setUserDetails(undefined)
    }

    const signUp = async (userData: IUserSignup): Promise<{ error: string | undefined }> => {
        try {
            let { error } = await doSignUp(userData);

            if (error) {
                logOut();
                return { error };
            }
            return { error: undefined };
        } catch (err) {
            const errMessage = (err as Error).message;
            return { error: errMessage };
        }
    }


    const loadUserFromLS = async () => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) return
        const user = jwtDecode<IUserCustomJwtPayload>(userToken)
        setIsSignedIn(true)
        setIsBusiness(user.isBusiness)
        setIsAdmin(user.isAdmin)
        await getUserById();
    }


    return (
        <AuthContext.Provider value={{ isSignedIn, isBusiness, isAdmin, userDetails, login, logOut, signUp, loadUserFromLS }}>
            {children}
        </AuthContext.Provider>
    )
}





