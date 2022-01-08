import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from '@/components/common/molecules';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  page: 1,
  pages: 100,
}
Default.decorators = [
  (story) => {
    const props = story().props as { page: number, pages: number };
    const [page, setPage] = useState<number>(props.page);

    const getNextDatas = () => {
      const next = page + 1
      props.pages < next || setPage(next);
    };

    const getPrevDatas = () => {
      const prev = page - 1;
      1 > prev || setPage(prev);
    }

    const changePage = (nextPage: number) => setPage(nextPage);

    return (
      <Pagination
        page={page}
        pages={props.pages}
        getNextDatas={getNextDatas}
        getPrevDatas={getPrevDatas}
        changePage={changePage}
      />
    );
  }
]