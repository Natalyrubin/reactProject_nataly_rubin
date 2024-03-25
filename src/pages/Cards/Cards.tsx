import './Cards.css';
import ICard from '../../interfaces/ICrad';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { LikeCardContext } from '../../context/LikeCardContext';
import { Link } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';



export default function ICards() {

    const auth = useContext(AuthContext)
    const { searchTerm } = useUser();
    const [cards, setCards] = useState<ICard[] | null>(null);
    const { handleClickOnLikeCard } = useContext(LikeCardContext);
    const toasts = useContext(ToastsContext)



    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) throw new Error('Failed to fetch cards');

                const data = await response.json();

                const filteredCards = searchTerm ? data.filter(
                    (card: ICard) =>
                        card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase()) || card.address.city.toLowerCase().includes(searchTerm.toLowerCase())
                ) : data;

                setCards(filteredCards);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchAllCards();
    }, [searchTerm]);



    return (
        <div className="Cards">
            <h1>Our Works</h1>
            <p>Business Cards</p>

            <button className='linktoCreatePage' style={{ display: auth?.isBusiness ? "block" : "none" }}>
                <Link to="/createnewcard" style={{ display: auth?.isBusiness ? "block" : "none" }}>
                    Make Your Own Card
                </Link>
            </button>

            <div className="cards_container">
                {(cards) ?
                    (cards.length > 0) ?
                        cards.map((card) => (
                            <div className="card_box" key={card._id}>
                                <img className='cardImg' src={card.image.url} alt="Card" />
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <hr />
                                <p>Phone: {card.phone}</p>
                                <p>Address: {card.address.street}{card.address.houseNumber}{card.address.city}</p>
                                <p>Card Number: { }</p>

                                <div className='IconCardArea'>
                                    <div className='smallCradIcons'>
                                        <img
                                            src="/assets/img/like.png"
                                            alt="Like"
                                            style={{ display: auth?.isBusiness ? "inline" : "none" }}
                                            onClick={() => {
                                                handleClickOnLikeCard(card._id);
                                                toasts?.addToast('👍', 'Success', 'Like performed successfully', 'success');
                                            }}

                                        />
                                        <img src="/assets/img/phone-call.png" alt="Phone" />
                                    </div>
                                    <div className='smallCradIconsLeft'>
                                        <img src="/assets/img/trash.png" alt="Trash" style={{ display: auth?.isAdmin ? "block" : "none" }} />
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        'Loading data, please wait ...'

                    :
                    (!cards) && 'No cards'
                }
            </div>
        </div>
    );
}
