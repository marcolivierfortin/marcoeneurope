'use client';

import React, { Component } from 'react';

/**
 * The `line` component.
 */
export default class Line extends Component<LineProps, LineState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div className={ 'line' }></div>
    );
  }

}

/**
 * The `line` component props.
 */
export interface LineProps {}

/**
 * The `line` component state.
 */
export interface LineState {}
