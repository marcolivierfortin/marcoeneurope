'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import fr from 'date-fns/locale/fr';
import { CircleFlag } from 'react-circle-flags';
import { CompanyInterface, CountryInterface, EventInterface, SettingsInterface } from '../interfaces';
import { formatDuration } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * The `event` component.
 */
export default class Event extends Component<EventProps, EventState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div className={ 'event event-' + this.props.event.type }>
        { !['time-change', 'activity', 'city'].includes(this.props.event.type) && (
          <time dateTime={ this.props.event.timeStamp }>
            { formatInTimeZone(new Date(this.props.event.timeStamp), this.props.event.timeZone, 'k \'h\' mm', {
              locale: fr,
            }) }
          </time>
        ) }

        <span className="event-content">
          <h3>
            <CircleFlag
              className={ 'event-country' }
              countryCode={ this.props.event.country }
              alt={ this.props.countries.filter(country => country.id === this.props.event.country).shift()?.title }
              title={ this.props.countries.filter(country => country.id === this.props.event.country).shift()?.title }
              width={ 120 }
              height={ 120 }
              data-testid={ null }
            />

            { this.props.event.title }
          </h3>

          { this.props.event.location && (
            <p className={ 'event-location' }>
              { this.props.event.location }
            </p>
          ) }

          <p>
            { this.props.event.company && (
              <span>
                { this.props.companies.filter(company => company.id === this.props.event.company).map(company => (
                  <span key={ 'event ' + this.props.event.timeStamp + ' company ' + company.id }>
                    <Image
                      className={ 'company-logo company-logo-' + company.id }
                      src={ company.image.path }
                      alt={ company.title }
                      title={ company.title }
                      width={ company.image.width }
                      height={ company.image.height }
                      quality={ 100 }
                    />

                    <span className={ 'company-tag' }>
                      { company.title }
                    </span>

                    { this.props.event.number && (
                      <span className={ 'company-tag' }>{ this.props.event.number }</span>
                    ) }

                    { this.props.event.seat && (
                      <span className={ 'company-tag' }>{ this.props.event.seat }</span>
                    ) }

                    { this.props.event.fleet && (
                      <span className={ 'company-tag' }>{ this.props.event.fleet }</span>
                    ) }
                  </span>
                )) }
              </span>
            ) }

            { this.props.event.duration && (
              <span className={ 'company-tag' }>
                { formatDuration({
                  hours: Math.floor(this.props.event.duration / 60),
                  minutes: this.props.event.duration % 60,
                }, {
                  format: [
                    'days',
                    'hours',
                    'minutes',
                  ],
                  locale: fr,
                }) }
              </span>
            ) }
          </p>

          { this.props.event.description.map((item, index) => (
            <p key={ 'event ' + this.props.event.timeStamp + ' description ' + index }>{ item }</p>
          )) }

          { this.props.event.type === 'activity' && (
            <p dangerouslySetInnerHTML={ { __html: this.props.settings.eventNote.replace('%location', this.props.event.location) } }></p>
          ) }

          { this.props.event.links?.map((link, index) => (
            <Link key={ 'event ' + this.props.event.timeStamp + ' link ' + index } target="_blank" className={ 'button' } href={ link.path }>{ link.title }</Link>
          )) }
        </span>
      </div>
    );
  }

}

/**
 * The `event` component props.
 */
export interface EventProps {
  event: EventInterface;
  countries: CountryInterface[];
  companies: CompanyInterface[];
  settings: SettingsInterface;
}

/**
 * The `event` component state.
 */
export interface EventState {}
