import React, { createContext, useContext, useState } from 'react';

interface IGif {
    id: string;
    title: string;
    username: string;
    url: string;
    isFavorite: boolean;
}

interface IHash {
    [id: string]: IGif;
}

interface StorageContextData {
    favorites: IHash;
    addFavorite(gif: IGif): void;
    removeFavorite(id: string): void;
}

const StorageContext = createContext<StorageContextData>(
    {} as StorageContextData,
);

const StorageProvider: React.FC = ({ children }) => {
    const [hash, setHash] = useState<IHash>(() => {
        const data = localStorage.getItem('@Search-Gifs');

        if (data) {
            return JSON.parse(data);
        }

        return {} as IHash;
    });

    const addFavorite = (gif: IGif): void => {
        const newHash = hash;
        newHash[gif.id] = gif;

        localStorage.setItem(
            '@Search-Gifs',
            JSON.stringify(newHash),
        );
        setHash({ ...hash, ...newHash });
    };

    const removeFavorite = (id: string): void => {
        const newHash = hash;
        delete newHash[id];

        localStorage.setItem(
            '@Search-Gifs',
            JSON.stringify(newHash),
        );
        setHash({ ...hash, ...newHash });
    };

    return (
        <StorageContext.Provider
            value={{
                favorites: hash,
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
};

function useStorage(): StorageContextData {
    const context = useContext(StorageContext);

    if (!context) {
        throw new Error('useStorage must be used within a StorageProvider');
    }

    return context;
}

export { StorageProvider, useStorage };
