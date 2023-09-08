'use client';

import Day from './Day';
import Filters from './Filters';
import React, { Component } from 'react';
import fr from 'date-fns/locale/fr';
import { EventInterface, SiteInterface } from '../interfaces';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * The `timeline` component.
 */
export default class Timeline extends Component<TimelineProps, TimelineState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <main className="timeline">
        <div className="summary">
          <p className={ 'events' }>
            { this.props.site.events.length } { this.props.site.settings.events }
            <button title={ this.props.site.filters.description.shift() }>{ this.props.site.filters.title }</button></p>

          <Filters
            filters={ this.props.site.filters }
          />
        </div>

        { Object.entries(this.groupEventsByDays()).map(day => (
          <Day
            key={ 'day ' + day[0] }
            day={ day[0] }
            events={ day[1] }
            countries={ this.props.site.countries }
            companies={ this.props.site.companies }
            settings={ this.props.site.settings }
          />
        )) }
      </main>
    );
  }

  /**
   * Group events by days.
   *
   * @return {EventInterface}
   *   The events grouped by days.
   */
  private groupEventsByDays(): EventInterface {
    return this.props.site.events.reduce((group, event) => {
      const date = formatInTimeZone(new Date(event.timeStamp), 'America/Montreal', 'PP', {
        locale: fr,
      });

      group[date] = group[date] ?? [];
      group[date].push(event);

      return group;
    }, {} as EventInterface);
  }

}

/**
 * The `timeline` component props.
 */
export interface TimelineProps {
  site: SiteInterface;
}

/**
 * The `timeline` component state.
 */
export interface TimelineState {}
