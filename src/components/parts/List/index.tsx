import { type PropsWithChildren } from 'react';

import Styled from './styled';

type ListItem = { id: string } & Record<string, unknown>;

type Props<T> = {
  data: T[];
  ['data-test']?: string;
  onSelectItem?: (item: T) => void;
  onRenderItemContent: (item: T) => JSX.Element;
} & PropsWithChildren;

function List<T extends ListItem>(props: Props<T>) {
  return (
    <Styled.List role="list" data-test={props['data-test'] || 'list'}>
      {props.data.map((item) => (
        <Styled.Item
          role="listitem"
          data-test="list-item"
          key={item.id}
          onClick={() => props.onSelectItem?.(item)}
        >
          {props.onRenderItemContent(item)}
        </Styled.Item>
      ))}
    </Styled.List>
  );
}

export default List;
