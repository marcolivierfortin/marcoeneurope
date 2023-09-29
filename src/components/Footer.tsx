'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import { AuthorInterface, BrandInterface, PartnerInterface, SettingsInterface } from '../interfaces';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * The `footer` component.
 */
export default class Footer extends Component<FooterProps, FooterState> {

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    const now = this.props.settings.currentDate ? new Date(this.props.settings.currentDate) : new Date();

    return (
      <footer>
        { this.props.partners.length > 0 && (
          <p>
            { this.props.partners.map(partner => (
              <span key={ 'partner ' + partner.id }>
                <span>{ partner.title }</span>

                <Link href={ partner.link.path } target={ partner.link.target } title={ partner.link.title }>
                  { this.props.brands.filter(brand => brand.id === partner.id).map(brand => (
                    <Image
                      key={ 'partner ' + partner.id + ' image ' + brand.id }
                      src={ brand.image.path }
                      alt={ brand.title }
                      title={ partner.link.title }
                      width={ brand.image.width }
                      height={ brand.image.height }
                      quality={ 100 }
                    />
                  )) }
                </Link>
              </span>
            )) }
          </p>
        ) }

        <p>
          ©{ formatInTimeZone(now, 'America/Montreal', 'Y') } <Link href={ this.props.author.link.path } target={ '_blank' } title={ this.props.author.link.title }>{ this.props.author.title }</Link>
        </p>
      </footer>
    );
  }

}

/**
 * The `footer` component props.
 */
export interface FooterProps {
  author: AuthorInterface;
  partners: PartnerInterface[];
  brands: BrandInterface[];
  settings: SettingsInterface;
}

/**
 * The `footer` component state.
 */
export interface FooterState {}
