'use client';

import React, { Component } from 'react';
import { ElementInterface } from '../interfaces';

/**
 * The `filters` component.
 */
export default class Filters extends Component<FiltersProps, FiltersState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div>

      </div>
    );
  }

}

/**
 * The `filters` component props.
 */
export interface FiltersProps {
  filters: ElementInterface;
}

/**
 * The `filters` component state.
 */
export interface FiltersState {}
