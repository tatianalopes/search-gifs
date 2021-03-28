import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import GifCard from '../../components/GifCard';
import { MdDelete, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Container, ActionButton, GifAuthor, GifTitle } from '../../components/GifCard/styles';

interface IGif {
    id: string;
    title: string;
    username: string;
    url: string;
    isFavorite: boolean;
}

describe('GifCard Component', () => {

    it('should be able to render a not favorite gif', async () => {
        const gifMock: IGif = {
            id: 'gif_id',
            title: 'Test GIF',
            username: 'username',
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            isFavorite: false,
        }

        let wrapper = mount(
            <GifCard
                gif={gifMock}
                iconType="heart"
                handleAction={jest.fn()}
            />
        );

        expect(wrapper.exists(Container)).toEqual(true);
        expect(wrapper.exists(MdFavoriteBorder)).toEqual(true);
        expect(wrapper.exists(MdFavorite)).toEqual(false);
        expect(wrapper.exists(MdDelete)).toEqual(false);
        expect(wrapper.find(GifTitle).prop('children')).toBe(gifMock.title);
        expect(wrapper.find(GifAuthor).prop('children')).toBe(`@${gifMock.username}`);
        expect(wrapper.find('img').prop('src')).toBe(gifMock.url);
    });

    it('should be able to render a gif without username', async () => {
        const gifMock: IGif = {
            id: 'gif_id',
            title: 'Test GIF',
            username: '',
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            isFavorite: false,
        }

        let wrapper = mount(
            <GifCard
                gif={gifMock}
                iconType="heart"
                handleAction={jest.fn()}
            />
        );

        expect(wrapper.exists(Container)).toEqual(true);
        expect(wrapper.exists(MdFavoriteBorder)).toEqual(true);
        expect(wrapper.exists(MdFavorite)).toEqual(false);
        expect(wrapper.exists(MdDelete)).toEqual(false);
        expect(wrapper.find(GifTitle).prop('children')).toBe(gifMock.title);
        expect(wrapper.find(GifAuthor).prop('children')).toBe('anonymous');
        expect(wrapper.find('img').prop('src')).toBe(gifMock.url);
    });

    it('should be able to render a favorite gif', async () => {
        const gifMock: IGif = {
            id: 'gif_id',
            title: 'Test GIF',
            username: 'username',
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            isFavorite: true,
        }

        let wrapper = mount(
            <GifCard
                gif={gifMock}
                iconType="heart"
                handleAction={jest.fn()}
            />
        );

        expect(wrapper.exists(Container)).toEqual(true);
        expect(wrapper.exists(MdFavorite)).toEqual(true);
        expect(wrapper.exists(MdFavoriteBorder)).toEqual(false);
        expect(wrapper.exists(MdDelete)).toEqual(false);
        expect(wrapper.find(GifTitle).prop('children')).toBe(gifMock.title);
        expect(wrapper.find(GifAuthor).prop('children')).toBe(`@${gifMock.username}`);
        expect(wrapper.find('img').prop('src')).toBe(gifMock.url);
    });

    it('should be able to favorite a gif', async () => {
        const gifMock: IGif = {
            id: 'gif_id',
            title: 'Test GIF',
            username: 'username',
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            isFavorite: false,
        }
        const handleAction = jest.fn();

        let wrapper = mount(
            <GifCard
                gif={gifMock}
                iconType="heart"
                handleAction={handleAction}
            />
        );

        expect(wrapper.exists(MdFavoriteBorder)).toEqual(true);
        wrapper.find(ActionButton).simulate('click');

        await waitFor(() => {
            expect(handleAction).toBeCalled();
        });
    });

    it('should be able to delete a gif from favorites', async () => {
        const gifMock: IGif = {
            id: 'gif_id',
            title: 'Test GIF',
            username: 'username',
            url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
            isFavorite: true,
        }
        const handleAction = jest.fn();

        let wrapper = mount(
            <GifCard
                gif={gifMock}
                iconType="trash"
                handleAction={handleAction}
            />
        );

        expect(wrapper.exists(MdDelete)).toEqual(true);
        expect(wrapper.exists(MdFavoriteBorder)).toEqual(false);
        expect(wrapper.exists(MdFavorite)).toEqual(false);

        wrapper.find(ActionButton).simulate('click');

        await waitFor(() => {
            expect(handleAction).toBeCalled();
        });
    });
});