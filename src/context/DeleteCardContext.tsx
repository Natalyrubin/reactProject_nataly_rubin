import { createContext, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export const DeleteCardContext = createContext<{
    handleClickOnDeleteCard: (cardId: string) => void;
}>({
    handleClickOnDeleteCard: () => { },
});

export const DeleteCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);

    const handleClickOnDeleteCard = async (cardId: string) => {

        const token: null | string = localStorage.getItem('userToken')
        if (!token) return null

        try {
            if (!auth?.userDetails) {
                console.error('User details not found');
                return;
            }

            const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            console.log('Card Delete successfully!');
        } catch (error) {
            console.error('Error Deleting card:', error);
        }
    };

    return (
        <DeleteCardContext.Provider value={{ handleClickOnDeleteCard }}>
            {children}
        </DeleteCardContext.Provider>
    );
};
