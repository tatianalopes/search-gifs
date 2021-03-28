import { act, renderHook } from '@testing-library/react-hooks';

import { useStorage, StorageProvider } from '../../hooks/storage';

interface IGif {
    id: string;
    title: string;
    username: string;
    url: string;
    isFavorite: boolean;
}

const gif: IGif = {
    id: 'guid-id',
    title: 'Test GIF',
    username: 'username',
    url: 'https://media2.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
    isFavorite: false,
};

describe('Storage hook', () => {
    it('should be able to add a new favorite gif', async () => {
        const { result } = renderHook(() => useStorage(), {
            wrapper: StorageProvider,
        });

        act(() => {
            result.current.addFavorite(gif);
        });

        expect(result.current.favorites).toHaveProperty(gif.id);
    });

    it('should be able to create delete an favorited gif', async () => {
        const { result } = renderHook(() => useStorage(), {
            wrapper: StorageProvider,
        });
    
        act(() => {
            result.current.addFavorite(gif);
            result.current.removeFavorite(gif.id);
        });
    
        expect(result.current.favorites).not.toHaveProperty(gif.id);
    });
});