import { createContext, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export const LikeCardContext = createContext<{
    handleClickOnLikeCard: (cardId: string) => void;
}>({
    handleClickOnLikeCard: () => { },
});

export const LikeCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);

    const handleClickOnLikeCard = async (cardId: string) => {

        const token: null | string = localStorage.getItem('userToken')
        if (!token) return null

        try {
            if (!auth?.userDetails) {
                console.error('User details not found');
                return;
            }

            const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            console.log('Card liked successfully!');
        } catch (error) {
            console.error('Error liking card:', error);
        }
    };

    return (
        <LikeCardContext.Provider value={{ handleClickOnLikeCard }}>
            {children}
        </LikeCardContext.Provider>
    );
};
