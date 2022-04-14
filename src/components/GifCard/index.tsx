import React, { useCallback } from 'react';
import {
    Container,
    ActionButton,
    GifInfo,
    GifTitle,
    GifAuthor,
} from './styles';
import { MdDelete, MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import colors from '../../resources/values/colors';

interface IGif {
    id: string;
    title: string;
    username: string;
    url: string;
    isFavorite: boolean;
}

interface GifCardProps {
    gif: IGif;
    iconType: 'heart' | 'trash';
    handleAction: Function;
}

const GifCard: React.FC<GifCardProps> = ({ gif, handleAction, iconType }) => {

    const heartButton = useCallback(() => {
        return (
            <>
                {iconType === 'heart' && gif.isFavorite ?
                    (<MdFavorite size={25} color={colors.red} />) :
                    (<MdFavoriteBorder size={25} color={colors.gray} />)
                }
            </>
        );
    }, [gif.isFavorite, iconType]);

    return (
        <Container to={{
            pathname: gif.url
        }} target="_blank" rel="noopener noreferrer">
            <ActionButton onClick={(e) => {
                e.preventDefault();
                handleAction(gif);
            }}>
                {iconType === 'heart' ?
                    heartButton() :
                    (<MdDelete size={25} color={colors.gray} />)
                }
            </ActionButton>
            <img
                src={gif.url}
                alt="gif"
            />
            <GifInfo>
                <GifTitle>{gif.title}</GifTitle>
                <GifAuthor>{gif.username ? `@${gif.username}` : 'anonymous'}</GifAuthor>
            </GifInfo>
        </Container>
    );
};

export default GifCard;
