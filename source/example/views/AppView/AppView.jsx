import React from 'react';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Popup from '../../../components/Popup/Popup';

class AppView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.infoPopupRef = React.createRef();
        this.popupWithButtonsRef = React.createRef();
    }

    render() {
        return (
            <Container>
                <Button
                    onClick={() => this.infoPopupRef.current.show()}
                >
                    Info popup
                </Button>
                &nbsp;
                <Button
                    onClick={() => this.popupWithButtonsRef.current.show()}
                >
                    Popup with buttons
                </Button>
                <Popup
                    title='Info popup'
                    ref={this.infoPopupRef}
                >
                    Some text
                </Popup>
                <Popup
                    title='Popup with buttons'
                    ref={this.popupWithButtonsRef}
                    buttons={[
                        {
                            text: 'Cancel',
                        },
                        {
                            text: 'Accept',
                        },
                    ]}
                >
                    Some text
                </Popup>
            </Container>
        );
    }
}

export default AppView;
