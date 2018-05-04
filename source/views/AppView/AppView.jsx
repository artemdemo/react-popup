import React from 'react';
import Container from './Container/Container';

const AppView = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    );
};

export default AppView;
