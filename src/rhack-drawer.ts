import { html, LitElement, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './rhack-drawer.css';

@customElement('rhack-drawer')
export class RhackDrawer  extends LitElement {
  static styles = [styles];

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel = '';

  @property({ reflect: true }) placement: 'block-start' | 'block-end' | 'inline-start' | 'inline-end' = 'inline-end';

  @property({ type: Boolean, reflect: true }) contained = false;


  render() {
    const { placement = '', contained = '' } = this;
    const classes = { 'open': this.open, 'closed': !this.open, [placement]: !!placement, contained: !!contained };
    return html`
      <div id="container" class="${classMap(classes)}" ?hidden="${!this.open}">
        <div
          id="panel"
          tabindex="0"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${this.accessibleLabel}>
          <div part="header"><slot name="header"></slot></div>
          <slot></slot>
          <div part="footer"><slot name="footer"></slot></div>
        </div>
        <div id="overlay" @click="${() => this.close()}" tabindex="-1"></div>
      </div>
    `;
  }

  close() {
    this.open = false;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rhack-drawer': RhackDrawer;
  }
}
