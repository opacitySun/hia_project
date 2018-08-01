import * as React from 'react';

export interface IFilterGroupProps {
  onChange?: (resultVals: string[]) => void;
  rowTypes?: string[];
  style?: React.CSSProperties;
}

export default class FilterGroup extends React.Component<IFilterGroupProps, any> {}
