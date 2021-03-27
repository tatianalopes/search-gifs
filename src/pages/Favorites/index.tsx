import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { 
    Container,
    Header,
    Title,
    Content,
    NoContent,
    GifCard
} from './styles';

import LogoImg from '../../resources/assets/logo.svg';
import EmptyImg from '../../resources/assets/no-favorites.svg';
import { useStorage } from '../../hooks/storage';

const Favorites: React.FC = () => {

    const { storage, removeFavorite } = useStorage();

    const handleDelete = (id: string) => {
        removeFavorite(id);
    }

    return (
        <Container>
            <Header>
                <Link to='/'>
                    <img src={LogoImg} alt="logo" />
                </Link>
            </Header>
            <Title>My favorite gifs</Title>
            {Object.keys(storage).length === 0 ? 
                <NoContent>
                    <img src={EmptyImg} alt="no favorites" />
                    <span>No gifs favorited yet</span>
                </NoContent>
                : <Content>
                    {Object.keys(storage).map(key => 
                        <GifCard key={storage[key].id}>
                            <img 
                                src={storage[key].url} 
                                alt={storage[key].title} 
                            />
                            <span>{`Title ${storage[key].title}`}</span>
                            <span>{`Username ${storage[key].username}`}</span>
                            <button type="button" onClick={() => handleDelete(storage[key].id)}>
                                <MdDelete />
                            </button>
                        </GifCard>
                    )}
                </Content>
            }
        </Container>
    );
};

export default Favorites;