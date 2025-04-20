'use client';

import React, { Component } from 'react';
import Weather from '../data/weather.json';
import { ConditionInterface, NewsInterface, SettingsInterface, WeatherInterface } from '../interfaces';
import { formatInTimeZone } from 'date-fns-tz';
import { frCA } from 'date-fns/locale';

/**
 * The `breaking news` component.
 */
export default class BreakingNews extends Component<BreakingNewsProps, BreakingNewsState> {

  /**
   * The current news based on the current date.
   *
   * @type {NewsInterface[]}
   */
  private news: NewsInterface[] = [];

  /**
   * The interval timer.
   *
   * @type {NodeJS.Timeout}
   */
  private interval: NodeJS.Timeout;

  /**
   * @inheritDoc
   */
  constructor(props: BreakingNewsProps) {
    super(props);

    // Filter news based on the current date.
    this.filterNews();
  }

  /**
   * When the component is mounted.
   *
   * @return {void}
   */
  public componentDidMount(): void {
    // Animate the visibility.
    this.animateVisibility();

    // Make news refreshing each 5 seconds to add new or remove old items.
    this.interval = setInterval(() => {
      // Filter news based on the current date.
      this.filterNews();

      // Animate the visibility.
      this.animateVisibility();

      // Force update the component.
      this.forceUpdate();
    }, 5000);
  }

  /**
   * When the component is unmounted.
   *
   * @return {void}
   */
  public componentWillUnmount(): void {
    clearInterval(this.interval as NodeJS.Timeout);
  }

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div className={ 'breaking-news' }>
        { this.news.length > 0 && (
          <ul className="news">
            { this.news.map(item => (
              <li key={ 'news ' + item.title } className="news-item">{ item.formattedTitle || item.title }</li>
            )) }
          </ul>
        ) }
      </div>
    );
  }

  /**
   * Animate the visibility.
   *
   * @return {void}
   */
  private animateVisibility(): void {
    if (this.news.length > 0) {
      document.body.classList.add('body-breaking-news');
    }
    else {
      document.body.classList.remove('body-breaking-news');
    }
  }

  /**
   * Filter news based on the current date.
   *
   * @return {void}
   */
  private filterNews(): void {
    const now = this.props.settings.currentDate ? new Date(this.props.settings.currentDate) : new Date();

    this.news = this.props.news.filter(item => {
      return new Date(item.timeStampStart) <= now && new Date(item.timeStampEnd) > now;
    });

    // Format time in news title.
    this.formatTime();

    // Format weather in news title.
    this.formatWeather();
  }

  /**
   * Format time in news title.
   *
   * @return {void}
   */
  private formatTime(): void {
    for (const item of this.news) {
      // If the news item has a timezone, it's a time item.
      if (typeof item.timeZone === 'string') {
        const now = this.props.settings.currentDate ? new Date(this.props.settings.currentDate) : new Date();

        // Format time.
        item.formattedTitle = item.title.replace('%time', formatInTimeZone(now, item.timeZone, 'k \'h\' mm', {
          locale: frCA,
        }));
      }
    }
  }

  /**
   * Format weather in news title.
   *
   * @return {void}
   */
  private formatWeather(): void {
    for (const item of this.news) {
      // If the news item has a city, it's a weather item.
      if (typeof item.city === 'string') {
        const weather: ConditionInterface[] = Weather;

        // Fetch weather from the API.
        fetch(process.env.HOST ? process.env.HOST + '/api/weather' : '/api/weather', {
          method: 'POST',
          body: JSON.stringify({
            city: item.city,
          }),
        }).then(response => {
          if (response.status === 200) {
            response.json().then((data: WeatherInterface) => {
              // Select the right condition based on the code.
              const condition = weather.find(condition => condition.code === data.conditionCode);

              if (typeof condition !== 'undefined') {
                // Select the right condition based on the time of the day.
                const text = data.isDay ? condition.day.text : condition.night.text;

                // Format weather.
                item.formattedTitle = text.replace('%degree', data.celsius.toString()).replace('%city', item.city as string);
              }
            });
          }
        }, () => {
          // Nothing is done when the fetch fails, only the weather will not be
          // updated, but it will be on the next fetch.
        });
      }
    }
  }

}

/**
 * The `breaking news` component props.
 */
export interface BreakingNewsProps {
  news: NewsInterface[];
  settings: SettingsInterface;
}

/**
 * The `breaking news` component state.
 */
export interface BreakingNewsState {}
