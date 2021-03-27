import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';

import { 
    Container,
    Header,
    Logo,
    Title,
    Content,
    NoContent,
    GifGrid,
    GifCard,
    DeleteButton,
    GifInfo,
    GifTitle,
    GifAuthor
} from './styles';

import LogoImg from '../../resources/assets/logo.svg';
import colors from '../../resources/values/colors';
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
                <Logo>
                    <Link to='/'>
                        <img src={LogoImg} alt="logo" />
                    </Link>
                    <FiLoader size={30} color={colors.isabelline} />
                </Logo>
            </Header>
            <Content>
                <Title>My favorite gifs</Title>
                {Object.keys(storage).length === 0 ? 
                    <NoContent>
                        <img src={EmptyImg} alt="no favorites" />
                        <span>No gifs favorited yet</span>
                    </NoContent>
                    : <GifGrid>
                        {Object.keys(storage).map(key => 
                            <GifCard key={storage[key].id}>
                            <DeleteButton onClick={() => handleDelete(storage[key].id)}>
                                <MdDelete size={25} color={colors.gray} />
                            </DeleteButton>
                            <img 
                                src={storage[key].url}
                                alt="gif"
                            />
                            <GifInfo>
                                <GifTitle>{`Title ${storage[key].title}`}</GifTitle>
                                <GifAuthor>{storage[key].username ? `@${storage[key].username}` : 'anonymous'}</GifAuthor>
                            </GifInfo>
                        </GifCard>
                        )}
                    </GifGrid>
                }
            </Content>
        </Container>
    );
};

export default Favorites;