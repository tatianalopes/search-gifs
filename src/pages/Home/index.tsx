import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { MdFavorite, MdSearch, MdShuffle } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { 
    Container,
    Header,
    Logo,
    FavoritesButton,
    SearchBar,
    InputArea,
    Input,
    SearchGifButton,
    RandomGif,
    Title,
    Content,
    GifGrid
} from './styles';

import GifCard from '../../components/GifCard';
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

type SearchTypes = 'trending' | 'search' | 'random';

const apiLimit = 40;

const Home: React.FC = () => {

    const history = useHistory();
    
    const { favorites, addFavorite, removeFavorite } = useStorage();

    const [searchValue, setSearchValue] = useState('');
    const [title, setTitle] = useState('Trending');
    const [searchType, setSearchType] = useState<SearchTypes>('trending');
    const [gifs, setGifs] = useState<IGif[]>([]);
    const [offset, setOffset] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates: any) => {
        console.log('dates: ', dates)
    };

    // detect when scroll reaches the bottom of the page
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop 
            !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    const formatResponse = useCallback((data: IApiResponse): IGif => {
        return {
            id: data.id,
            title: data.title,
            username: data.username,
            url: data.images.original.url,
            isFavorite: data.id in favorites,
        }
    }, [favorites]);

    // show trendings gifs 
    useEffect(() => {
        if (gifs.length > 0) return;

        gifApi.get(`/trending?api_key=${GIF_API_KEY}&offset=0&limit=${apiLimit}`)
            .then(({ data }) => {
                const newGifs = data.data.map((gif: IApiResponse) => formatResponse(gif));
                setGifs(newGifs);

                setOffset(data.pagination.count);
            });
    }, [gifs, formatResponse]);

    const fetchGifs = useCallback((clear: boolean, type?: SearchTypes) => {   
        const queryOffset = clear ? 0 : offset;
        const querySearchType = type ? type : searchType;

        let query = `/${querySearchType}?api_key=${GIF_API_KEY}`;
        if (querySearchType === 'trending') {
            query += `&offset=${queryOffset}&limit=${apiLimit}`;
        } else if (querySearchType === 'search') {
            query += `&offset=${queryOffset}&limit=${apiLimit}&q=${searchValue}`;
        }

        gifApi.get(query)
            .then(({ data }) => {
                if (querySearchType === 'random') {
                    setGifs([formatResponse(data.data)]);
                } else {
                    const newGifs = data.data.map((gif: IApiResponse) => formatResponse(gif));
                    
                    if (clear) {
                        setGifs(newGifs);
                    } else {
                        setGifs(prevState => [...prevState, ...newGifs]);
                    }

                    setOffset(queryOffset + data.pagination.count);
                }

                setSearchType(querySearchType);
            })
    }, [offset, setGifs, searchType, formatResponse, searchValue]);

    // fetch more gifs when reaches the bottom of the page 
    useEffect(() => {
        if (!isFetching) return;

        fetchGifs(false);
        setIsFetching(false);
    }, [isFetching, fetchGifs]);

    const handleSearch = () => {
        if (searchValue) {
            setTitle(searchValue);
            fetchGifs(true, 'search');
        }
    }

    const handleRandom = () => {
        setTitle('random');
        fetchGifs(true, 'random');
    }

    const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleFavorite = useCallback((updatedGif: IGif) => {    
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
                <Logo>
                    <img 
                        src={LogoImg} 
                        alt="logo"
                        onClick={() => window.location.reload()}
                    />
                    <FiLoader size={30} color={colors.isabelline} />
                </Logo>
                <FavoritesButton onClick={() => history.push('/favorites')}>
                    <span>My Favorites</span>
                    <MdFavorite size={30} />
                </FavoritesButton>
            </Header>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                inline
            />
            <SearchBar>
                <InputArea>
                    <Input>
                        <MdSearch size={30} />
                        <input
                            onChange={(event) => setSearchValue(event.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </Input>
                    <SearchGifButton onClick={handleSearch}>Search</SearchGifButton>
                </InputArea>
                
                <RandomGif onClick={handleRandom}>
                    <span>Search random gif</span>
                    <MdShuffle size={20} />
                </RandomGif>
            </SearchBar>
            <Content>
                {title && <Title>{title}</Title>}
                <GifGrid>
                    {gifs.map(gif => 
                        <GifCard
                            key={gif.id}
                            gif={gif}
                            handleAction={handleFavorite}
                            iconType="heart"
                        />
                    )}
                </GifGrid>
            </Content>
            
        </Container>
    );
};

export default Home;