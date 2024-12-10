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

  connectedCallback(): void {
    super.connectedCallback();
  }

  render() {
    return html`
      <rhack-drawer>
        Contents
      </rhack-drawer>
      <rh-button @click=${() => this.toggle()}>Help</rh-button>
    `;
  }

  toggle() {
    this.drawer.open = !this.drawer.open;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rhack-image-helper': RhackImageHelper;
  }
}
