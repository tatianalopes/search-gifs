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

    const { favorites, removeFavorite } = useStorage();

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
                {Object.keys(favorites).length === 0 ? 
                    <NoContent>
                        <img src={EmptyImg} alt="no favorites" />
                        <span>No gifs favorited yet</span>
                    </NoContent>
                    : <GifGrid>
                        {Object.keys(favorites).map(key => 
                            <GifCard key={favorites[key].id}>
                            <DeleteButton onClick={() => removeFavorite(favorites[key].id)}>
                                <MdDelete size={25} color={colors.gray} />
                            </DeleteButton>
                            <img 
                                src={favorites[key].url}
                                alt="gif"
                            />
                            <GifInfo>
                                <GifTitle>{favorites[key].title}</GifTitle>
                                <GifAuthor>{favorites[key].username ? `@${favorites[key].username}` : 'anonymous'}</GifAuthor>
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