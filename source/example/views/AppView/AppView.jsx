import React from 'react';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Popup from '../../../components/Popup/Popup';

class AppView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.popupRef = React.createRef();
    }

    showPopup() {
        this.popupRef.current.show();
    }

    render() {
        return (
            <Container>
                <Button
                    onClick={this.showPopup.bind(this)}
                >
                    Show popup
                </Button>
                <Popup ref={this.popupRef}>
                    Some text
                </Popup>
            </Container>
        );
    }
}

export default AppView;
