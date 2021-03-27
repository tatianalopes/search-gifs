import styled from 'styled-components';

import colors from '../../resources/values/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 47px 144px 0 144px;
`;

export const Header = styled.div`
    margin-bottom: 80px;
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
    grid-row-gap: 10px;

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