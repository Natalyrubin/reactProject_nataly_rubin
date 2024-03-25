export default interface ICard {
    _id: string,
    title: string,
    subtitle: string,
    description: string,
    phone: number,
    email: string,
    web: string,
    image: {
        url: string,
        alt: string,
        _id: string,
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
        _id: string,
    },
    bizNumber: number,
    likes: number[],
    user_id: string,
    createdAt: string,
    __v: number
}

