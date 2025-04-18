'use client';

import Flag from './Flag';
import Image from 'next/image';
import Link from 'next/link';
import Modal from './Modal';
import React, { Component, Fragment } from 'react';
import { AuthorInterface, CountryInterface, ElementInterface, EventInterface, LinkInterface, SettingsInterface } from '../interfaces';
import { formatInTimeZone } from 'date-fns-tz';
import { frCA } from 'date-fns/locale';

/**
 * The `header` component.
 */
export default class Header extends Component<HeaderProps, HeaderState> {

  /**
   * The `header` component state.
   *
   * @type {HeaderState}
   */
  public state: HeaderState = {
    modalStatus: false,
  };

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    // Create a context to share state values from a parent component to a child
    // component.
    const ModalContext = React.createContext(this.state.modalStatus);

    const contact = (
      <Fragment>
        { this.props.contact.description.map((item, index) => (
          <p key={ 'modal description ' + index } dangerouslySetInnerHTML={ { __html: item } }></p>
        )) }

        { this.props.events.filter(event => typeof event.phone === 'string').map((item, index) => (
          <p key={ 'modal event ' + index }>
            { item.location } : <br /><strong>{ item.phone }</strong>
          </p>
        )) }
      </Fragment>
    );

    return (
      <header>
        <div className={ 'images' }>
          <Image
            src={ '/images/marcolivierfortin-cossette.jpg' }
            alt={ this.props.author.title }
            title={ this.props.author.title }
            width={ 120 }
            height={ 120 }
            quality={ 100 }
          />

          <Flag
            title={ this.props.countries.filter(country => country.id === 'eu').shift()?.title as string }
            path={ 'eu' }
          />
        </div>

        <h1>{ this.props.title }</h1>

        { this.props.description.map((item, index) => (
          <p key={ 'description ' + index } dangerouslySetInnerHTML={ { __html: item } }></p>
        )) }

        { this.props.links.length > 0 && (
          <p>
            { this.props.links.map(item => (
              <Fragment key={ 'link ' + item.id }>
                { item.id === 'now' && (
                  <button onClick={ () => this.linkToNow() } title={ item.description?.shift() }>{ item.title }</button>
                ) }

                { item.id === 'contact' && (
                  <button onClick={ () => this.linkToContact() } title={ item.description?.shift() }>{ item.title }</button>
                ) }

                { !['now', 'contact'].includes(item.id as string) && (
                  <Link className={ 'button' } href={ item.path }>{ item.title }</Link>
                ) }
              </Fragment>
            )) }
          </p>
        ) }

        <ModalContext.Provider value={ this.state.modalStatus }>
          <Modal
            settings={ this.props.settings }
            title={ this.props.contact.title }
            content={ contact }
            size={ 'large' }
            status={ this.state.modalStatus }
          />
        </ModalContext.Provider>
      </header>
    );
  }

  /**
   * Scroll to the current day element (or the first day element if the current
   * day is not available) in the timeline component.
   *
   * @return {void}
   */
  private linkToNow(): void {
    const now = this.props.settings.currentDate ? new Date(this.props.settings.currentDate) : new Date();

    // Select the title of the current day or the title of the first day.
    const element = document.querySelector('.day[data-day="' + formatInTimeZone(now, 'America/Montreal', 'yyyy-LL-dd', {
      locale: frCA,
    }) + '"] h2') || document.querySelector('.day h2');

    if (element instanceof Element) {
      const position = window.scrollY + element.getBoundingClientRect().y - 40;

      // Scroll to the title of the current day.
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });

      // After the scroll animation.
      setTimeout(() => {
        // Make the HTML element act like a focusable element, then focus on it.
        (element as HTMLLabelElement).focus();
      }, 1000);
    }
  }

  /**
   * Open the contact modal.
   *
   * @return {void}
   */
  private linkToContact(): void {
    this.setState({
      modalStatus: true,
    });
  }

}

/**
 * The `header` component props.
 */
export interface HeaderProps {
  author: AuthorInterface;
  title: string;
  description: string[];
  links: LinkInterface[];
  contact: ElementInterface;
  events: EventInterface[];
  countries: CountryInterface[];
  settings: SettingsInterface;
}

/**
 * The `header` component state.
 */
export interface HeaderState {
  modalStatus: boolean;
}
