'use client';

import React, { Component } from 'react';
import { TripInterface } from '../interfaces';

/**
 * The `switch` component.
 */
export default class Switch extends Component<SwitchProps, SwitchState> {

  /**
   * The current trip.
   *
   * @type {TripInterface}
   */
  public currentTrip: TripInterface = this.props.currentTrip;

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div className="switch">
        <ul>
          { this.props.trips.reverse().map((item, index) => (
            <li key={ 'switch ' + index }>
              <button onClick={ () => this.setCurrentTrip(item) } className={ this.currentTrip.title === item.title ? 'active' : '' } title={ item.title }>{ item.title }</button>
            </li>
          )) }
        </ul>
      </div>
    );
  }

  /**
   * Set the curent trip.
   *
   * @param {TripInterface} trip
   *   The trip to set as the current trip.
   *
   * @return {void}
   */
  private setCurrentTrip(trip: TripInterface): void {
    this.currentTrip = trip;

    // Force update the component.
    this.forceUpdate();
  }

}

/**
 * The `switch` component props.
 */
export interface SwitchProps {
  trips: TripInterface[];
  currentTrip: TripInterface;
}

/**
 * The `switch` component state.
 */
export interface SwitchState {}
