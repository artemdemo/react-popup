import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import isElement from '../../props/isElement';

import './Popup.less';

class Popup extends React.PureComponent {
    constructor(props) {
        super(props);

        this.modalRef = null;
        this.modalBgRef = null;
    }

    setModalRef = (ref) => {
        this.modalRef = ref;
    };

    setModalBgRef = (ref) => {
        this.modalBgRef = ref;
    };

    /**
     * @public
     */
    show() {
        this.modalRef.show();
        this.modalBgRef.show();
    }

    /**
     * @public
     */
    hide() {
        this.modalRef.hide();
        this.modalBgRef.hide();
    }

    handleClose = () => {
        const { onClose } = this.props;
        onClose && onClose();
        this.modalBgRef.hide();
        this.modalRef.hide();
    };

    renderTitle() {
        const { title, showCloseBtn } = this.props;
        const closeBtn = (() => {
            if (showCloseBtn) {
                return (
                    <button
                        onClick={this.handleClose}
                        className='popup-title-close'
                    >
                        ×
                    </button>
                );
            }
            return (
                <span>&nbsp;</span>
            );
        })();
        const titleContent = (() => {
            if (title) {
                return (
                    <div className='popup-title-text'>
                        {title}
                    </div>
                );
            }
            return (
                <span>&nbsp;</span>
            );
        })();
        if (showCloseBtn || title) {
            return (
                <div className='popup-title'>
                    <div className='popup-title-section'>
                        {titleContent}
                    </div>
                    <div className='popup-title-section'>
                        {closeBtn}
                    </div>
                </div>
            );
        }
        return null;
    }

    renderButtons() {
        const { buttons } = this.props;
        const onClickHandler = btnProps => () => {
            const noOnClick = !btnProps.hasOwnProperty('onClick');
            const onClickAllowHide = btnProps.hasOwnProperty('onClick') && btnProps.onClick() !== false;
            if (noOnClick || onClickAllowHide) {
                this.hide();
            }
        };
        if (buttons && buttons.length > 0) {
            return (
                <div className='popup-buttons'>
                    {buttons.map((btnProps, index) => (
                        <div
                            className='popup-buttons__button'
                            key={`popup-buttons-${index}`}
                        >
                            <button
                                {...btnProps}
                                onClick={onClickHandler(btnProps)}
                                key={`popup-buttons-${index}`}
                            >
                                {btnProps.text}
                            </button>
                        </div>
                    ))}
                </div>
            );
        } else if (buttons) {
            return (
                <div className='popup-buttons'>
                    <button
                        {...buttons}
                        onClick={onClickHandler(buttons)}
                    >
                        {buttons.text}
                    </button>
                </div>
            );
        }
        return null;
    }

    renderContent() {
        const { contentIcon } = this.props;
        if (contentIcon) {
            return (
                <div className='popup-content'>
                    <div className='popup-content__icon'>
                        {contentIcon}
                    </div>
                    <div className='popup-content__text'>
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return this.props.children;
    }

    render() {
        const { base, className, style, hideClickOutside } = this.props;
        return (
            <React.Fragment>
                <Modal
                    baseClass='popup-bg'
                    ref={this.setModalBgRef}
                    hideClickOutside={false}
                    base={base}
                >
                    <div />
                </Modal>
                <Modal
                    className={className}
                    baseClass='popup'
                    ref={this.setModalRef}
                    style={style}
                    hideClickOutside={hideClickOutside}
                    onClose={this.handleClose}
                    base={base}
                >
                    <div>
                        {this.renderTitle()}
                        <div className='popup-body'>
                            {this.renderContent()}
                            {this.renderButtons()}
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

const buttonProp = PropTypes.shape({
    text: PropTypes.text,
    className: PropTypes.text,
    type: PropTypes.text,
    disabled: PropTypes.bool,
});

Popup.propTypes = {
    // eslint-disable-next-line react/no-typos
    base: isElement,
    title: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    buttons: PropTypes.oneOfType([
        buttonProp,
        PropTypes.arrayOf(buttonProp),
    ]),
    onClose: PropTypes.func,
    hideClickOutside: PropTypes.bool,
    showCloseBtn: PropTypes.bool,
    contentIcon: PropTypes.element,
};

Popup.defaultProps = {
    base: null,
    title: null,
    className: null,
    style: null,
    buttons: null,
    onClose: null,
    hideClickOutside: false,
    showCloseBtn: true,
    contentIcon: null,
};

export default Popup;
