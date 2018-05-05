import React from 'react';
import Button from './Button/Button';
import Container from './Container/Container';

class AppView extends React.PureComponent {
    render() {
        return (
            <Container>
                <Button>Show popup</Button>
            </Container>
        );
    }
}

export default AppView;
