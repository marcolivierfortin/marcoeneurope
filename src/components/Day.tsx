'use client';

import Event from './Event';
import React, { Component } from 'react';
import fr from 'date-fns/locale/fr';
import { BrandInterface, CountryInterface, EventInterface, SettingsInterface } from '../interfaces';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * The `day` component.
 */
export default class Day extends Component<DayProps, DayState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div className="day" data-day={ formatInTimeZone(new Date(this.props.events[0].timeStamp), 'America/Montreal', 'yyyy-LL-dd', {
        locale: fr,
      }) }>
        <div className="events">

          <div className={ 'event event-day-change' }>
            <h2 tabIndex={ -1 }>{ this.props.day }</h2>
          </div>

          { Object.values(this.props.events).map((event, index) => (
            <Event
              key={ 'event ' + this.props.day + ' ' + event.timeStamp + ' ' + index }
              event={ event }
              countries={ this.props.countries }
              brands={ this.props.brands }
              settings={ this.props.settings }
            />
          )) }
        </div>

      </div>
    );
  }

}

/**
 * The `day` component props.
 */
export interface DayProps {
  day: string;
  events: EventInterface[];
  countries: CountryInterface[];
  brands: BrandInterface[];
  settings: SettingsInterface;
}

/**
 * The `day` component state.
 */
export interface DayState {}
