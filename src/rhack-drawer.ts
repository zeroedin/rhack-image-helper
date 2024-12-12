import { html, LitElement, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { classMap } from 'lit/directives/class-map.js';

import '@rhds/elements/rh-button/rh-button.js';
import '@rhds/elements/rh-icon/rh-icon.js';

import styles from './rhack-drawer.css';

@customElement('rhack-drawer')
export class RhackDrawer  extends LitElement {
  static styles = [styles];

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel = '';

  @property({ reflect: true }) placement: 'block-start' | 'block-end' | 'inline-start' | 'inline-end' = 'inline-end';

  @property({ type: Boolean, reflect: true }) contained = false;

  @query('#close-btn') private _closeBtn!: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.#onKeydown.bind(this));
  }

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
          <rh-button id="close-btn" @click=${() => this.close()}>
            <rh-icon icon="close" set="ui" aria-label="Close"></rh-icon>
          </rh-button>
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

  #onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape': {
        if (!this.open) {
          return;
        }
        this.close();
        break;
      }
      default:
        break;
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rhack-drawer': RhackDrawer;
  }
}
