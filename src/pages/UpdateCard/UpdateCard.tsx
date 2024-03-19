import "./UpdateCard.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCard() {

  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
  const token: string | null = localStorage.getItem('userToken');

  if (!token) return null;

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const card = await response.json();

        setTitle(card.title);
        setSubtitle(card.subtitle);
        setDescription(card.description);
        setPhone(card.phone);
        setEmail(card.email);
        setWeb(card.web);
        setImgUrl(card.image.url);
        setImgAlt(card.image.alt);
        setState(card.address.state);
        setCountry(card.address.country);
        setCity(card.address.city);
        setStreet(card.address.street);
        setHouseNumber(card.address.houseNumber);
        setZipCode(card.address.zip);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [cardId, token]);

  const handleSubmitUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true);

    const updatedCardData = {
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
        houseNumber: houseNumber,
        zip: zipCode
      }
    };

    try {
      const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(updatedCardData)
      });

      if (!response.ok) {
        throw new Error('Failed to update card');
      }

      setIsBusy(false);
      navigate('/mycards'); // Redirect to MyCards page after successful update
    } catch (error) {
      console.error('Error updating card:', error);
      setIsBusy(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'subtitle':
        setSubtitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'web':
        setWeb(value);
        break;
      case 'imgUrl':
        setImgUrl(value);
        break;
      case 'imgAlt':
        setImgAlt(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'street':
        setStreet(value);
        break;
      case 'houseNumber':
        setHouseNumber(Number(value));
        break;
      case 'zipCode':
        setZipCode(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="UpdateCard">
      <h1>Update Card</h1>
      <h5>Fill the following details to update your card</h5>
      <form onSubmit={handleSubmitUpdateCard} >
        <div className="formContainer">
          <p>CARD DETAILS</p>
          <div className="formRow" >
            <label htmlFor='title'>Business Details</label>
            <div>
              <input
                id='title'
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
                placeholder='Title'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='subtitle'
                type='text'
                name='subtitle'
                value={subtitle}
                onChange={handleChange}
                placeholder='Subtitle'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='description'
                type='text'
                name='description'
                value={description}
                onChange={handleChange}
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
                name='phone'
                value={phone}
                onChange={handleChange}
                placeholder='050-0000000'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
                placeholder='Email@email.com'
                required
                autoComplete='on'
              />
            </div>
          </div>
          <div className="formRow">
            <label htmlFor='web'>Web Details</label>
            <div>
              <input
                id='web'
                type='text'
                name='web'
                value={web}
                onChange={handleChange}
                placeholder='Web URL'
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='imgUrl'
                type='text'
                name='imgUrl'
                value={imgUrl}
                onChange={handleChange}
                placeholder='Image URL'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='imgAlt'
                type='text'
                name='imgAlt'
                value={imgAlt}
                onChange={handleChange}
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
                  name='state'
                  value={state}
                  onChange={handleChange}
                  placeholder='State'
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='country'
                  type='text'
                  name='country'
                  value={country}
                  onChange={handleChange}
                  placeholder='Country'
                  required
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='city'
                  type='text'
                  name='city'
                  value={city}
                  onChange={handleChange}
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
                  name='street'
                  value={street}
                  onChange={handleChange}
                  placeholder='Street'
                  required
                  autoComplete='on'
                />
              </div>
              <div>
                <input
                  id='houseNumber'
                  type='number'
                  name='houseNumber'
                  value={houseNumber}
                  onChange={handleChange}
                  placeholder='House Number'
                  required
                  autoComplete='on'
                />
              </div>
            </div>
          </div>
          <div className="zipCode">
            <label htmlFor='zip'></label>
            <input
              id='zipCode'
              type='number'
              name='zipCode'
              value={zipCode}
              onChange={handleChange}
              placeholder='Zip Code'
              autoComplete='on'
            />
          </div>

          <button type='submit' disabled={isBusy}>Update Card</button>
        </div>
      </form>

    </div>
  )
}
