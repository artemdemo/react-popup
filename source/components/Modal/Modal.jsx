import React from 'react';
import PropTypes from 'prop-types';
import _isString from 'lodash/isString';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import isElement from '../../props/isElement';
import ModalClickOutside from './ModalClickOutside';

import './Modal.less';

/**
 * This is base <Modal /> element for other "popup like" elements.
 * It doesn't provide any styling, only basic functionality.
 */
class Modal extends React.PureComponent {
    constructor(props) {
        super(props);

        // In same <Modal /> could appear more than one modals,
        // Therefore it make sense to separate them in the same base.
        // (This variable will be used only if "base" is defined before mounting)
        this.el = null;

        this.state = {
            entering: false,
            open: false,
            leaving: false,
            style: null,
        };
    }

    componentWillMount() {
        const { base } = this.props;
        this.mountBase(base);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.style !== nextProps.style && !this.state.leaving) {
            // I don't want to change style if modal is leaving.
            // User could set `top` and `left`
            // And this styles could change, while modal is leaving the stage
            // It will case not desired "jump" of modal just before disappearing
            this.setState({
                style: nextProps.style,
            });
        }
        if (this.props.base !== nextProps.base) {
            this.mountBase(nextProps.base);
        }
    }

    componentWillUnmount() {
        const { base } = this.props;
        if (base && this.el) {
            base.removeChild(this.el);
        }
    }

    onClickOutside = () => {
        const { onClose } = this.props;
        if (!this.state.entering && this.state.open) {
            this.hide();
            onClose && onClose();
        }
    };

    mountBase(base) {
        if (base) {
            if (this.el) {
                base.removeChild(this.el);
            }
            this.el = document.createElement('div');
            base.appendChild(this.el);
        }
    }

    /**
     * @public
     */
    show() {
        const { onOpen } = this.props;
        this.setState({
            entering: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    open: true,
                });
                onOpen && onOpen();
            }, 10);
        });
    }

    /**
     * @public
     */
    hide() {
        if (this.state.open && !this.state.leaving) {
            this.setState({
                leaving: true,
            });
        }
    }

    handleTransitionEnd = () => {
        if (this.state.entering) {
            this.setState({
                entering: false,
            });
        }
        if (this.state.leaving) {
            this.setState({
                open: false,
                leaving: false,
            });
        }
    };

    renderContent() {
        const { hideClickOutside } = this.props;
        if (hideClickOutside) {
            return (
                <ModalClickOutside onClickOutside={this.onClickOutside}>
                    {this.props.children}
                </ModalClickOutside>
            );
        }
        return this.props.children;
    }

    render() {
        const { base, baseClass, className } = this.props;
        if (!_isString(baseClass) || baseClass.replace(/\s+/, ' ').split(' ').length > 1) {
            throw new Error('baseClass may contain one class at most');
        }
        const modalClass = classnames(baseClass, className, {
            [`${baseClass}_entering`]: this.state.entering,
            [`${baseClass}_open`]: this.state.open,
            [`${baseClass}_leaving`]: this.state.leaving,
        });
        const modal = (
            <div
                style={this.state.style}
                className={modalClass}
                onTransitionEnd={this.handleTransitionEnd}
            >
                {this.renderContent()}
            </div>
        );
        if (base) {
            return createPortal(
                modal,
                this.el
            );
        }
        return modal;
    }
}

Modal.propTypes = {
    // eslint-disable-next-line react/no-typos
    base: isElement,
    baseClass: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    hideClickOutside: PropTypes.bool,
    onOpen: PropTypes.func,
    /*
     * onCloses callback will be called only when modal is closed by click outside
     * otherwise it may cause stack overflow
     */
    onClose: PropTypes.func,
};

Modal.defaultProps = {
    base: null,
    baseClass: 'modal',
    className: null,
    style: null,
    hideClickOutside: true,
    onOpen: null,
    onClose: null,
};

export default Modal;
