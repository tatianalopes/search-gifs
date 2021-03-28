import { waitFor, act } from '@testing-library/react';
import { mount, ReactWrapper } from 'enzyme';

import gifApi from '../../services/gifApi';

import GifCard from '../../components/GifCard';
import HomePage from '../../pages/Home';
import {
    Logo,
    FavoritesButton,
    Input,
    SearchGifButton,
    RandomGif,
    Title,
    GifGrid
} from '../../pages/Home/styles'

const mockTrendingGifs = [
    {
        id: 'guid-id-1',
        title: 'Trending Gif 1',
        username: 'user-1',
        images: {
            original: {
                url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            }
        }
    },
    {
        id: 'guid-id-2',
        title: 'Trending Gif 2',
        username: 'user-2',
        images: {
            original: {
                url: 'https://media3.giphy.com/media/vPuszmHgeWnIhTkSr5/giphy.gif',
            }
        }
    }
]
const apiTrendingResponse = {
    data: {
        data: mockTrendingGifs,
        pagination: {
            count: 40,
        }
    }
}

const mockRandomGif = {
    id: 'guid-id-3',
    title: 'Random Gif',
    username: 'user-random',
    images: {
        original: {
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
        }
    }
}

jest.mock('../../hooks/storage', () => {
    return {
        useStorage: () => ({
            favorites: {},
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
        }),
    };
});

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
      useHistory: () => ({
        push: mockedHistoryPush,
      }),
    };
});

describe('Home page', () => {
    const waitAndUpdate = async (wrapper: ReactWrapper) => {
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve));
          wrapper.update();
        });
    };

    let wrapper: ReactWrapper;

    beforeEach(async () => {
        mockedHistoryPush.mockClear();

        const mock = jest.spyOn(gifApi, "get");
        mock.mockImplementation(() => Promise.resolve(apiTrendingResponse));
        wrapper = mount(<HomePage />);
        await waitAndUpdate(wrapper);
    });

    it('should render', async () => {
        expect(wrapper.exists(Logo)).toBeTruthy();
        expect(wrapper.exists(Input)).toBeTruthy();
        expect(wrapper.exists(SearchGifButton)).toBeTruthy();
        expect(wrapper.exists(SearchGifButton)).toBeTruthy();
        expect(wrapper.exists(RandomGif)).toBeTruthy();
        expect(wrapper.exists(GifGrid)).toBeTruthy();
    });

    it('should show trending gifs', async () => {
        expect(wrapper.find(GifGrid).prop('children')).toHaveLength(2);
        expect(wrapper.find(Title).prop('children')).toBe('Trending');

        wrapper.find(GifCard).map((card, idx) => {
            expect(card.prop('gif').id).toBe(mockTrendingGifs[idx].id);
            expect(card.prop('gif').title).toBe(mockTrendingGifs[idx].title);
            expect(card.prop('gif').username).toBe(mockTrendingGifs[idx].username);
            expect(card.prop('gif').url).toBe(mockTrendingGifs[idx].images.original.url);
        })
    });

    it('should be able to generate random gif', async () => {
        const mock = jest.spyOn(gifApi, "get");
        mock.mockImplementation(() => Promise.resolve({
            data: {
                data: mockRandomGif,
            }
        }));

        await act(async () => {
            wrapper.find(RandomGif).simulate('click');
            await waitAndUpdate(wrapper);
        });

        expect(wrapper.find(Title).prop('children')).toBe('random');
        expect(wrapper.find(GifGrid).prop('children')).toHaveLength(1);
        expect(wrapper.find(GifCard).prop('gif').id).toBe(mockRandomGif.id);
        expect(wrapper.find(GifCard).prop('gif').title).toBe(mockRandomGif.title);
        expect(wrapper.find(GifCard).prop('gif').username).toBe(mockRandomGif.username);
        expect(wrapper.find(GifCard).prop('gif').url).toBe(mockRandomGif.images.original.url);
    });

    it('should be able redirect to favorites page', async () => {
        wrapper.find(FavoritesButton).simulate('click');

        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/favorites');
        });
    });
});