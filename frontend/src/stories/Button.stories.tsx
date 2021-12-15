import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@/components/atoms';

export default {
  title: 'Button',
  component: Button
} as ComponentMeta<typeof Button>;

const onClickHello = alert.bind(null, 'Hello World');

const Template: ComponentStory<typeof Button> = args => <Button {...args} onClick={onClickHello} >Button</Button>

export const Default = Template.bind({});

export const Ancher = Template.bind({});
Ancher.args = {
  href: 'https://google.com',
  target: '_blank',
  onClick: () => { }
}

export const Div = Template.bind({});

export const Outline = Template.bind({});
Outline.args = { outline: true };