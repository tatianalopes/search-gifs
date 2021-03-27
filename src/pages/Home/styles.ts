import styled from 'styled-components';

import colors from '../../resources/values/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 47px 144px 0 144px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
`;

export const FavoritesButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    outline: none;

    span {
        color: ${colors.isabelline};
        font-size: 32px;
        margin-right: 8px;
    }

    svg {
        color:  ${colors.red};
    }

    &:hover {
        opacity: 0.8;

        svg {
            animation: beat .25s infinite alternate;
        }

        @keyframes beat{
            to { transform: scale(1.2); }
        }
    }
`;

export const SearchBar = styled.div`
    align-self: center;
    display: flex;
    flex-direction: column;

    margin-bottom: 20px;
`;

export const SearchGifButton = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${colors.silverPink};
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    padding: 10px;
    height: 53px;
    width: 112px;

    &:hover {
        opacity: 0.8;
    }
`;

export const InputArea = styled.div`
    align-items: center;
    display: flex;

`;

export const Input = styled.div`
    align-self: center;
    background-color: ${colors.gray};
    border-radius: 6px;
    display: flex;
    height: 53px;
    margin-right: 16px;
    padding-right: 6px;
    width: 600px;

    svg {
        height: 100%;
        margin: 0 18px 0 15px;
    }

    input {
        background-color: transparent;
        border: none;
        font-size: 28px;
        width: 100%;
    }
`;

export const RandomGif = styled.button`
    align-items: center;
    background-color: transparent;
    border: none;
    color: ${colors.isabelline};
    cursor: pointer;
    display: flex;
    margin-left: 10px;
    margin-top: 8px;
    outline: none;

    span {
        font-size: 16px;
        margin-right: 6px;
    }
 
    &:hover {
        opacity: 0.8;
    }
`;

export const Title = styled.div`
    color: ${colors.isabelline};
    text-transform: capitalize;
    font-size: 40px;
    font-weight: 500;

    width: 100%;
    border-bottom: solid 2px ${colors.isabelline};
    margin-bottom: 36px;
    padding-bottom: 8px;
    padding-left: 12px;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    justify-items: center;
    align-items: center;
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

    button {
        background: transparent;
        border: 0;
        cursor: pointer;
        margin-left: auto;

        align-self: flex-start;
    }
`;