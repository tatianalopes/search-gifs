import React, { useState, useEffect } from 'react';
import { MdFavorite, MdSearch, MdShuffle } from 'react-icons/md';

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
import gifApi from '../../services/gifApi';

const GIF_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

interface IApiReponse {
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
}

const Home: React.FC = () => {

    const [gifs, setGifs] = useState<IGif[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchGifs(false);
        setIsFetching(false);
      }, [isFetching]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    const handleSearchValue = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleSearch = () => {
        fetchGifs(true);
    }

    const fetchGifs = (clear: boolean) => {
        gifApi.get(`search?api_key=${GIF_API_KEY}&q=${searchValue}&offset=${offset}`)
            .then(({ data }) => {
                setOffset(prevState => prevState + data.pagination.count);
                const newGifs = data.data.map((gif: IApiReponse) => (
                    {
                        id: gif.id,
                        title: gif.title,
                        username: gif.username,
                        url: gif.images.original.url
                    }
                ));

                if (clear) {
                    setGifs(newGifs);
                } else {
                    setGifs([...gifs, ...newGifs]);
                }
            })
    }

    return (
        <Container>
            <Header>
                <img src={LogoImg} alt="logo" />
                <FavoritesButton>
                    <span>My Favorites</span>
                    <MdFavorite size={30} />
                </FavoritesButton>
            </Header>
            <SearchBar>
                <InputArea>
                    <Input>
                        <MdSearch size={30} />
                        <input onChange={event => handleSearchValue(event)} />
                    </Input>
                    <SearchGifButton onClick={handleSearch}>Search</SearchGifButton>
                </InputArea>
                
                <RandomGif>
                    <span>Search random gifs</span>
                    <MdShuffle size={20} />
                </RandomGif>
            </SearchBar>
            <Title>{searchValue}</Title>
            <Content>
                {gifs.map(gif => 
                    <GifCard key={gif.id}>
                        <img 
                            src={gif.url} 
                            alt={gif.title} 
                        />
                        <span>{`Title ${gif.title}`}</span>
                        <span>{`Username ${gif.username}`}</span>
                    </GifCard>
                )}
            </Content>
        </Container>
    );
};

export default Home;