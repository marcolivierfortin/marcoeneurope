'use client';

import React, { Component } from 'react';
import { SettingsInterface } from '../interfaces';

/**
 * The `modal` component.
 */
export default class Modal extends Component<ModalProps, ModalState> {

  /**
   * The modal status.
   *
   * @type {boolean}
   */
  public status: boolean;

  /**
   * @inheritDoc
   */
  constructor(props: ModalProps) {
    super(props);

    this.status = props.status;
  }

  /**
   * When the component is mounted.
   *
   * @return {void}
   */
  public componentDidMount(): void {
    // Set the body overflow.
    this.setBodyOverflow();

    document.addEventListener('keyup', (event) => this.closeModalOnEscape(event));
  }

  /**
   * When the component is updated.
   *
   * @return {void}
   */
  public componentDidUpdate(): void {
    // Set the body overflow.
    this.setBodyOverflow();
  }

  /**
   * When the component is unmounted.
   *
   * @return {void}
   */
  public componentWillUnmount(): void {
    // Set the body overflow.
    this.setBodyOverflow();

    document.removeEventListener('keyup', (event) => this.closeModalOnEscape(event));
  }

  /**
   * Render the component.
   *
   * @return {React.JSX.Element}
   */
  public render(): React.JSX.Element {
    return (
      <div style={ { display: this.status ? 'block' : 'none' } }>
        <div className={ 'modal-overlay' } onClick={ () => this.closeModal() }></div>

        <div className={ 'modal modal-size-' + this.props.size }>
          <button onClick={ () => this.closeModal() } title={ ' ' }>{ this.props.settings.close }</button>

          <h2>{ this.props.title }</h2>

          <div className={ 'modal-content' }>
            { this.props.content }
          </div>
        </div>
      </div>
    );
  }

  /**
   * Close the modal.
   *
   * @return {void}
   */
  private closeModal(): void {
    this.status = false;

    // Set the body overflow.
    this.setBodyOverflow();

    // Force update the component.
    this.forceUpdate();
  }

  /**
   * Set the body overflow to `hidden` when the modal is opened and to `auto`
   * when the modal in closed.
   *
   * @return {void}
   */
  private setBodyOverflow(): void {
    document.body.style.overflow = this.status ? 'hidden' : 'auto';
  }

  /**
   * Close the modal on the `Escape` key of a keyboard event.
   *
   * @param {KeyboardEvent} event
   *   The keyboard event.
   *
   * @return {void}
   */
  private closeModalOnEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

}

/**
 * The `modal` component props.
 */
export interface ModalProps {
  settings: SettingsInterface;
  title: string;
  content: React.JSX.Element;
  size: string;
  status: boolean;
}

/**
 * The `modal` component state.
 */
export interface ModalState {}
