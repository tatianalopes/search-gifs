import styled from 'styled-components';

import colors from '../../resources/values/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 47px 144px;
    min-width: 1000px;
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
    grid-gap: 20px;

    justify-items: center;
    align-items: center;

    @media screen and (min-width: 1px) and (max-width: 1150px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1150px) and (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1400px) and (max-width: 1700px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (min-width: 1700px) and (max-width: 2000px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media screen and (min-width: 2000px) and (max-width: 2200px) {
        grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (min-width: 2200px) and (max-width: 2400px) {
        grid-template-columns: repeat(7, 1fr);
    }

    @media screen and (min-width: 2400px) and (max-width: 2800px) {
        grid-template-columns: repeat(8, 1fr);
    }
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