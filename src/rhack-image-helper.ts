import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';

import '@rhds/elements/rh-button/rh-button.js';

import './rhack-drawer.js';

import styles from './rhack-image-helper.css';
import { RhackDrawer } from './rhack-drawer.js';

@customElement('rhack-image-helper')
export class RhackImageHelper extends LitElement {
  static styles = [styles];

  @query('rhack-drawer') drawer!: RhackDrawer;
  @query('rh-button') trigger!: RhackDrawer;

  connectedCallback(): void {
    super.connectedCallback();
  }

  render() {
    return html`
      <rh-button @click=${() => this.toggle()} aria-expanded="false" aria-controls="drawer">Help</rh-button>
      <rhack-drawer id="drawer">
        Contents
      </rhack-drawer>

    `;
  }

  toggle() {
    this.drawer.open = !this.drawer.open;
    this.trigger.ariaExpanded = String(this.drawer.open);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rhack-image-helper': RhackImageHelper;
  }
}
