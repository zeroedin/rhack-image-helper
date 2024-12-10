import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';

import styles from './rhack-image-helper.css';

@customElement('super-clippy')
export class RhackImageHelper extends LitElement {
  static styles = [styles];

  render() {
    return html`
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rhack-image-helper': RhackImageHelper;
  }
}
