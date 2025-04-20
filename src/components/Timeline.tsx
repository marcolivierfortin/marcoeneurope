'use client';

import Day from './Day';
import Filters from './Filters';
import React, { Component } from 'react';
import { EventInterface, SiteInterface } from '../interfaces';
import { formatDuration } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { frCA } from 'date-fns/locale';

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
            {/* <button title={ this.props.site.filters.description.shift() }>{ this.props.site.filters.title }</button> */}
          </p>

          <Filters />
        </div>

        { Object.entries(this.groupEventsByDays()).map(day => (
          <Day
            key={ 'day ' + day[0] }
            day={ day[0] }
            events={ day[1] }
            countries={ this.props.site.countries }
            brands={ this.props.site.brands }
            settings={ this.props.site.settings }
          />
        )) }

        <div className="summary">
          <p className={ 'events' } dangerouslySetInnerHTML={ { __html: this.props.site.settings.eventTotal.replace('%flight', this.getDurationByType('flight')).replace('%train', this.getDurationByType('train')) } }></p>
        </div>
      </main>
    );
  }

  /**
   * Get the duration of all events by type.
   *
   * @param {string} type
   *   The event type.
   *
   * @return {string}
   */
  private getDurationByType(type: string): string {
    const events = this.props.site.events.filter(event => event.type.search(`${ type }`) === 0);

    if (events.length === 0) {
      return formatDuration({
        hours: 0,
      }, {
        format: [
          'hours',
        ],
        zero: true,
        locale: frCA,
      });
    }

    const duration = events.map(event => {
      return event.duration || 0;
    }).reduce((first, second) => first + second);

    return formatDuration({
      hours: Math.floor(duration / 60),
      minutes: duration % 60,
    }, {
      format: [
        'days',
        'hours',
        'minutes',
      ],
      locale: frCA,
    });
  }

  /**
   * Group events by days.
   *
   * @return {EventInterface}
   *   The events grouped by days.
   */
  private groupEventsByDays(): EventInterface {
    return this.props.site.events.sort((first, second) => {
      // Sort all events by time stamp before grouping them by day.
      return new Date(first.timeStamp).valueOf() - new Date(second.timeStamp).valueOf();
    }).reduce((group, event) => {
      const date = formatInTimeZone(new Date(event.timeStamp), event.timeZone, 'PP', {
        locale: frCA,
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
