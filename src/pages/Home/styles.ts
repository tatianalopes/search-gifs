import styled from 'styled-components';

import colors from '../../resources/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SearchBar = styled.div`
    align-self: center;
    
    button {
        background-color: ${colors.silverPink};
        border-radius: 5px;
        padding: 10px;
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 10px;
`;

export const GifCard = styled.div`
    display: flex;
    flex-direction: column;

    background-color: ${colors.silverPink};

    width: 257px;
    height: 263px;
    border-radius: 5px;

    img {
        width: 100%;
        height: 214px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
`;