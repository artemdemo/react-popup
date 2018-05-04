/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '../Button';

describe('<Button>', () => {
    it('Render empty', () => {
        const tree = renderer.create(
            <Button />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('With text', () => {
        const tree = renderer.create(
            <Button>
                Some text
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('With type', () => {
        const tree = renderer.create(
            <Button type='button'>
                Some text
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('With className', () => {
        const tree = renderer.create(
            <Button className='some-class'>
                Some text
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('onClick', () => {
        let clicked = false;
        const wrapper = mount(
            <Button onClick={() => clicked = true}>
                Some text
            </Button>,
        );

        wrapper.find('.button').simulate('click');
        expect(clicked).toBe(true);
    });
});
