import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Button.less';

const Button = (props) => {
    const { className } = props;
    const buttonClass = classnames('button', className);
    return (
        <button
            {...props}
            className={buttonClass}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};

export default Button;
