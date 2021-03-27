import styled from 'styled-components';

import colors from '../../resources/values/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 47px 144px;
`;

export const Header = styled.div`
    margin-bottom: 80px;
`;

export const Logo = styled.div`
    display: flex;
    align-items: flex-start;
    width: fit-content;
    
    cursor: pointer;

    &:hover {
        svg {
            animation: rotation 6s infinite linear;
        }

        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(359deg);
            }
        }
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
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const GifGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    justify-items: center;
    align-items: center;
`;

export const NoContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items :center;

    margin-top: 60px;

    img {
        height: 250px;
        width: 250px;
    }

    span {
        color: ${colors.isabelline};
        font-size: 20px;
    }
`;

export const GifCard = styled.div`
    background-color: ${colors.silverPink};
    border-radius: 5px;
    box-shadow: 3px 4px 4px ${colors.darkBlue};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 263px;
    position: relative;
    width: 257px;

    img {
        width: 100%;
        height: 214px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    svg {
        opacity: 0;
        position: absolute;
        right: 8px;
        top: 8px;
    }

    &:hover {
        svg {
            transition: opacity 0.5s;
            opacity: 1;
        }
    }
`;

export const DeleteButton = styled.div`
    background-color: transparent;
    border: none;
    outline: none;
`;

export const GifInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 50px;
    padding: 6px 10px 0 10px;
    width: 100%;
`;

export const GifTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const GifAuthor = styled.div`
    font-size: 14px;
    font-style: italic;
    opacity: 0.5;
`;