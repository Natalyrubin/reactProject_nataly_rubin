export interface IUserDetailsType {
    _id: string
    name: {
        first: string
        middle: string
        last: string
    }
    phone: string
    email: string
    password: string
    image: {
        url: string
        alt: string
    }
    address: {
        state: string
        country: string
        city: string
        street: string
        houseNumber: number
        zip: number
    }
    isAdmin: boolean
    isBusiness: boolean
    createdAt: string
}


export interface IUserAuthContextType {
    isSignedIn: boolean
    isBusiness: boolean
    isAdmin: boolean
    userDetails: IUserDetailsType | undefined
    login: (email: string, password: string) => Promise<void | string>
    logOut: () => void
    signUp: ({ }: IUserSignup) => Promise<{ error: string | undefined }>
    loadUserFromLS: () => void
}

export interface IUserCustomJwtPayload {
    _id: string
    isBusiness: boolean
    isAdmin: boolean
    iat: number
}


export interface IUserSignup {
    name: {
        first: string
        middle?: string
        last: string
    }
    phone: string
    email: string
    password: string
    image?: {
        url: string
        alt: string
    }
    address: {
        state?: string
        country: string
        city: string
        street: string
        houseNumber: number
        zip: number
    }
    isBusiness: boolean
}