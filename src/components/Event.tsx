'use client';

import Flag from './Flag';
import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import { BrandInterface, CountryInterface, EventInterface, SettingsInterface } from '../interfaces';
import { formatDuration } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { frCA } from 'date-fns/locale';

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
              locale: frCA,
            }) }
          </time>
        ) }

        <span className="event-content">
          <h3>
            <span className={ 'event-country' }>
              <Flag
                title={ this.props.countries.filter(country => country.id === this.props.event.country).shift()?.title as string }
                path={ this.props.event.country }
              />
            </span>

            { this.props.event.title }
          </h3>

          { this.props.event.location && (
            <p className={ 'event-location' }>
              { this.props.event.location }
            </p>
          ) }

          <p>
            { this.props.event.brand && (
              <span>
                { this.props.brands.filter(brand => brand.id === this.props.event.brand).map(brand => (
                  <span key={ 'event ' + this.props.event.timeStamp + ' brand ' + brand.id }>
                    <Image
                      className={ 'brand brand-' + brand.id }
                      src={ brand.image.path }
                      alt={ brand.title }
                      title={ brand.title }
                      width={ brand.image.width }
                      height={ brand.image.height }
                      quality={ 100 }
                    />

                    <span className={ 'tag' }>
                      { brand.title }
                    </span>

                    { this.props.event.number && (
                      <span className={ 'tag' }>
                        { this.props.event.number }
                      </span>
                    ) }

                    { this.props.event.fleet && (
                      <span className={ 'tag' }>
                        { this.props.event.fleet }
                      </span>
                    ) }

                    { this.props.event.seat && (
                      <span className={ 'tag' }>
                        { this.props.event.seat }
                      </span>
                    ) }
                  </span>
                )) }
              </span>
            ) }

            { this.props.event.duration && (
              <span className={ 'tag' }>
                { formatDuration({
                  hours: Math.floor(this.props.event.duration / 60),
                  minutes: this.props.event.duration % 60,
                }, {
                  format: [
                    'days',
                    'hours',
                    'minutes',
                  ],
                  locale: frCA,
                }) }
              </span>
            ) }
          </p>

          { this.props.event.description.map((item, index) => (
            <p key={ 'event ' + this.props.event.timeStamp + ' description ' + index } dangerouslySetInnerHTML={ { __html: item } }></p>
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
  brands: BrandInterface[];
  settings: SettingsInterface;
}

/**
 * The `event` component state.
 */
export interface EventState {}
