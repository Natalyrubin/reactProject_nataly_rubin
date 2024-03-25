import "./MyCards.css";
import { useEffect, useState, useContext } from 'react';
import ICard from "../../interfaces/ICrad";
import { useUser } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { DeleteCardContext } from '../../context/DeleteCardContext'
import { ToastsContext } from '../../context/ToastsContext';




export default function MyCards() {

  const auth = useContext(AuthContext)
  const { searchTerm } = useUser();
  const [cardsById, setCardsById] = useState<ICard[] | null>(null);
  const { handleClickOnDeleteCard } = useContext(DeleteCardContext);
  const toasts = useContext(ToastsContext)


  useEffect(() => {
    const fetchAllMyCards = async () => {

      const token: null | string = localStorage.getItem('userToken')
      if (!token) return null

      try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        });

        if (!response.ok) throw new Error('Failed to fetch cards');

        const data = await response.json();

        const filteredCards = searchTerm ? data.filter(
          (card: ICard) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase()) || card.address.city.toLowerCase().includes(searchTerm.toLowerCase())
        ) : data;

        setCardsById(filteredCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchAllMyCards();
  }, [searchTerm, cardsById]);


  return (
    <div className="MyCards">

      <h1>My Cards</h1>
      <p>Business Cards</p>


      <button className='linktoCreatePage' style={{ display: auth?.isBusiness ? "block" : "none" }}>
        <Link to="/createnewcard" style={{ display: auth?.isBusiness ? "block" : "none" }}>
          Make Your Own Card
        </Link>
      </button>


      <div className="cards_container">
        {(cardsById) ?
          (cardsById.length > 0) ?
            cardsById.map((cardById) => (
              <div className="card_box" key={cardById._id}>
                <img className='cardImg' src={cardById.image.url} alt="Card" />
                <h3>{cardById.title}</h3>
                <p>{cardById.description}</p>
                <hr />
                <p>Phone: {cardById.phone}</p>
                <p>Address: {cardById.address.street}{cardById.address.houseNumber}{cardById.address.city}</p>
                <p>Card Number: { }</p>

                <div className='IconCardArea'>
                  <div className='smallCradIcons'>
                    <img src="/assets/img/phone-call.png" alt="Phone" />
                    <Link to={`/updatecard/${cardById._id}`}>
                      <img src="/assets/img/cogwheel.png" alt="Update" />
                    </Link>
                  </div>
                  <div className='smallCradIconsLeft'>
                    <img
                      src="/assets/img/trash.png"
                      alt="Trash"
                      style={{ display: auth?.isSignedIn ? "block" : "none" }}
                      onClick={() => {
                        handleClickOnDeleteCard(cardById._id);
                        toasts?.addToast('👍', 'Success', 'Delete successfully', 'success');
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
            :
            'You Dont Have Any Cards By Your Own, Start To Make By Click on "Make Your Own Card" at the Cards page'


          :
          (!cardsById) && 'To Start Login and Join Us :)'

        }
      </div>
    </div>
  )
}
