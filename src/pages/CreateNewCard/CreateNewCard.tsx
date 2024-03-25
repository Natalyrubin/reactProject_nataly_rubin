import "./CreateNewCard.css"
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { AuthContext } from '../../context/AuthContext';

export default function CreateNewCard() {

  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [web, setWeb] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgAlt, setImgAlt] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<number>(0);
  const [zipCode, setZipCode] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();

  const handleSubmitCreateNewCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true);
    if (!auth) { setIsBusy(false); return }

    const newCardData = {
      title: title,
      subtitle: subtitle,
      description: description,
      phone: phone,
      email: email,
      web: web,
      image: {
        url: imgUrl,
        alt: imgAlt
      },
      address: {
        state: state,
        country: country,
        city: city,
        street: street,
        houseNumber: Number(houseNumber),
        zip: Number(zipCode)
      }
    };

    const token: null | string = localStorage.getItem('userToken')
    if (!token) return null

    try {
      const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newCardData)
      });


      if (!response.ok) {
        throw new Error('Failed to POST card to data');
      }
      /*  const data = await response.json();
 
       console.log(data); */
      toasts?.addToast('🎉', 'Card created successfully', 'success');

      navigate('/mycards');
    } catch (error) {
      console.error('Error POST card to data:', error);

      toasts?.addToast('⚠️', 'Error creating card', 'danger');
    }
  };

  return (
    <div className="CreateNewCard">
      <h1>Create A New Card</h1>
      <h5>fill the following details and create your own card</h5>

      <form onSubmit={handleSubmitCreateNewCard} >
        <div className="formContainer">
          <p>CARD DETAILS</p>
          <div className="formRow" >
            <label htmlFor='title'>Business Details</label>
            <div>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='subtitle'
                type='text'
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder='Subtitle'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
                required
                autoComplete='on'
              />
            </div>
          </div>
          <div className="formRow">
            <label htmlFor='phone'>Contact Details</label>
            <div>
              <input
                id='phone'
                type='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='050-0000000'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email@email.com'
                required
                autoComplete='on'
              />
            </div>
          </div >
          <div className="formRow">
            <label htmlFor='web'>Web Details</label>
            <div>
              <input
                id='web'
                type='text'
                value={web}
                onChange={(e) => setWeb(e.target.value)}
                placeholder='Web URL'
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='imgUrl'
                type='text'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder='Image URL'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='imgAlt'
                type='text'
                value={imgAlt}
                onChange={(e) => setImgAlt(e.target.value)}
                placeholder='Image alt'
                required
                autoComplete='on'
              />
            </div>
          </div>

          <div className="addressSignUpArea">
            <div>
              <label htmlFor='country'>Address</label>
              <div>
                <input
                  id='state'
                  type='text'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder='State'
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='country'
                  type='text'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder='Country'
                  required
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='city'
                  type='text'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder='City'
                  required
                  autoComplete='on'
                />
              </div>
            </div>
          </div>
          <div className="addressSignUpArea2">
            <div>
              <div>
                <label htmlFor='street'></label>
                <input
                  id='street'
                  type='text'
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder='Street'
                  required
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='houseNumber'
                  type='number'
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(parseInt(e.target.value))}
                  placeholder='House Number'
                  required
                  autoComplete='on'
                />
              </div>
            </div>
          </div>
          <div className="zipCode">
            <label htmlFor='zipCode'></label>
            <input
              id='zipCode'
              type='number'
              value={zipCode}
              onChange={(e) => setZipCode(parseInt(e.target.value))}
              placeholder='Zip Code'
              autoComplete='on'
            />
          </div>

          <button type='submit' disabled={isBusy}>Create New Card</button>
        </div>
      </form>
    </div>
  )
}
