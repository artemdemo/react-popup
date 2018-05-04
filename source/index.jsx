import React from 'react';
import { render } from 'react-dom';

import './styles/general.less';

import AppView from './views/AppView/AppView';

render(
    <AppView />,
    document.getElementById('app'),
);
