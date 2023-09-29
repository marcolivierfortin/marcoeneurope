'use client';

import Image from 'next/image';
import React, { Component } from 'react';

/**
 * The `flag` component.
 */
export default class Flag extends Component<FlagProps, FlagState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <Image
        src={ `https://hatscripts.github.io/circle-flags/flags/${ this.props.path }.svg` }
        alt={ this.props.title }
        title={ this.props.title }
        width={ 120 }
        height={ 120 }
        quality={ 100 }
      />
    );
  }

}

/**
 * The `flag` component props.
 */
export interface FlagProps {
  title: string;
  path: string;
}

/**
 * The `flag` component state.
 */
export interface FlagState {}
