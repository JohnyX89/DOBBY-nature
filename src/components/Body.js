import React from 'react';
import styled from '@emotion/styled';

const BodyWrapper = styled.div`
    text-align: center;
    width: 100%;
    height: 1000px;
    background-color: green;
`;

const BodyContent = ({ itemName, des }) => {
    return (
        <BodyWrapper>
            <div>
                <h2>DOBBY Nat</h2>
                <p></p>
            </div>
        </BodyWrapper>
    );
};

export default BodyContent;