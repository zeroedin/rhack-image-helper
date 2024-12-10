import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';

import styles from './rhack-image-helper.css';

@customElement('rhack-image-helper')
export class RhackImageHelper extends LitElement {
  static styles = [styles];

  connectedCallback(): void {
    super.connectedCallback();
  }



  render() {
    return html`
      <div id="container">
        Contents
      </div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rhack-image-helper': RhackImageHelper;
  }
}
