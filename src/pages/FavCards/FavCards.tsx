import "./FavCards.css";
import { useEffect, useState, useContext } from 'react';
import ICard from "../../interfaces/ICrad";
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { IUserCustomJwtPayload } from "../../interfaces/IUserDetails";

export default function FavCards() {
  const auth = useContext(AuthContext);
  const [likedCards, setLikedCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchAllMyCards = async () => {
      const token: string | null = localStorage.getItem('userToken');
      if (!token) return;

      const decoded: IUserCustomJwtPayload = jwtDecode<IUserCustomJwtPayload>(token);

      try {
        const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch cards');

        const data = await response.json();

        const userLikedCards = data.filter((card: ICard) => card.likes.includes(decoded._id));

        setLikedCards(userLikedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchAllMyCards();
  }, []);

  return (
    <div className="FavCards">
      <h1>My Favorites Cards</h1>
      <p>Business Cards</p>

      <div className="cards_container">
        {(likedCards.length > 0) ? (
          likedCards.map((likedCard) => (
            <div className="card_box" key={likedCard._id}>
              <img className='cardImg' src={likedCard.image.url} alt="Card" />
              <h3>{likedCard.title}</h3>
              <p>{likedCard.description}</p>
              <hr />
              <p>Phone: {likedCard.phone}</p>
              <p>Address: {likedCard.address.street} {likedCard.address.houseNumber} {likedCard.address.city}</p>
              <p>Card Number: {likedCard._id}</p>

              <div className='IconCardArea'>
                <div className='smallCradIcons'>
                  <img src="/assets/img/phone-call.png" alt="Phone" />
                </div>
                <div className='smallCradIconsLeft'>
                  <img src="/assets/img/trash.png" alt="Trash" style={{ display: auth?.isAdmin ? "block" : "none" }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You don't have any liked cards yet.</p>
        )}
      </div>
    </div>
  );
}
