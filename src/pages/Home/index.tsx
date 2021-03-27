import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder, MdSearch, MdShuffle } from 'react-icons/md';

import { 
    Container,
    Header,
    FavoritesButton,
    SearchBar,
    InputArea,
    Input,
    SearchGifButton,
    RandomGif,
    Title,
    Content,
    GifCard
} from './styles';

import LogoImg from '../../resources/assets/logo.svg';
import colors from '../../resources/values/colors';
import { useStorage } from '../../hooks/storage';
import gifApi from '../../services/gifApi';

const GIF_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

interface IApiResponse {
    id: string;
        title: string;
        username: string;
        images: {
            original: {
                url: string;
                height: string;
                width: string;
            }
        }
}

interface IGif {
    id: string;
    title: string;
    username: string;
    url: string;
    isFavorite: boolean;
}

const Home: React.FC = () => {

    const history = useHistory();
    
    const { storage, addFavorite, removeFavorite } = useStorage();

    const [gifs, setGifs] = useState<IGif[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [title, setTitle] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop 
            !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    const fetchGifs = useCallback((clear: boolean) => {   
        const queryOffset = clear ? 0 : offset;

        gifApi.get(`search?api_key=${GIF_API_KEY}&q=${searchValue}&offset=${queryOffset}`)
            .then(({ data }) => {
                const newGifs = data.data.map((gif: IApiResponse) => (
                    {
                        id: gif.id,
                        title: gif.title,
                        username: gif.username,
                        url: gif.images.original.url,
                        isFavorite: gif.id in storage,
                    }
                ));

                if (clear) {
                    setGifs(newGifs);
                    setOffset(0 + data.pagination.count);
                } else {
                    setGifs(prevState => [...prevState, ...newGifs]);
                    setOffset(prevState => prevState + data.pagination.count);
                }
                setTitle(searchValue);
            })
    }, [searchValue, offset, setGifs, storage]);

    useEffect(() => {
        if (!isFetching) return;
        fetchGifs(false);
        setIsFetching(false);
      }, [isFetching, fetchGifs]);

    const handleSearchValue = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleSearch = () => {
        setOffset(0);
        fetchGifs(true);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleFavorite = useCallback((updatedGif) => {    
        updatedGif.isFavorite = !updatedGif.isFavorite;

        const updatedList = gifs.map((gif) => {
          if (gif.id === updatedGif.id) {
            return {...gif, isFavorite: updatedGif.isFavorite};
          }
          return gif;
        });
    
        setGifs(updatedList);
        if (updatedGif.isFavorite) {
            addFavorite(updatedGif);
        } else {
            removeFavorite(updatedGif.id);
        }
    }, [gifs, addFavorite, removeFavorite]);

    return (
        <Container>
            <Header>
                <img 
                    src={LogoImg} 
                    alt="logo"
                    onClick={() => window.location.reload()}
                />
                <FavoritesButton onClick={() => history.push('/favorites')}>
                    <span>My Favorites</span>
                    <MdFavorite size={30} />
                </FavoritesButton>
            </Header>
            <SearchBar>
                <InputArea>
                    <Input>
                        <MdSearch size={30} />
                        <input 
                            onChange={handleSearchValue}
                            onKeyPress={handleKeyPress}
                        />
                    </Input>
                    <SearchGifButton onClick={handleSearch}>Search</SearchGifButton>
                </InputArea>
                
                <RandomGif>
                    <span>Search random gifs</span>
                    <MdShuffle size={20} />
                </RandomGif>
            </SearchBar>
            {title && <Title>{title}</Title>}
            <Content>
                {gifs.map(gif => 
                    <GifCard key={gif.id}>
                        <img 
                            src={gif.url} 
                            alt={gif.title} 
                        />
                        <span>{`Title ${gif.title}`}</span>
                        <span>{`Username ${gif.username}`}</span>
                        <button type="button" onClick={(e) => handleFavorite(gif)}>
                            {gif.isFavorite ? <MdFavorite color={colors.red} /> : <MdFavoriteBorder />}
                        </button>
                    </GifCard>
                )}
            </Content>
        </Container>
    );
};

export default Home;