import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';

import '@rhds/elements/rh-button/rh-button.js';
import '@rhds/elements/rh-icon/rh-icon.js';

import './rhack-drawer.js';

import styles from './rhack-image-helper.css';
import { RhackDrawer } from './rhack-drawer.js';


export interface WebSocketInterface {
  action: string;
  body: string;
  size?: string;
  quality?: string;
  response_format?: string;
}

@customElement('rhack-image-helper')
export class RhackImageHelper extends LitElement {
  static styles = [styles];

  #response: string | undefined;

  #connection = false;

  #socket: WebSocket | undefined;

  #loading = false;

  #waitMessage = 'Loading...';

  /**
   * Representation of the page html textContent as a deduped string
   */
  #content: string | null = null;

  #showTranslate = false;

  #showImageOptions = false;

  #showCustom = false;

  @property() endpoint?: string;

  @property() apiKey?: string;

  @query('rhack-drawer') drawer!: RhackDrawer;

  @query('rh-button') trigger!: RhackDrawer;

  get #promptSelect(): HTMLSelectElement | undefined {
    return this.shadowRoot?.querySelector('#prompts') as
      | HTMLSelectElement
      | undefined;
  }

  get #textArea(): HTMLTextAreaElement | undefined {
    return this.shadowRoot?.querySelector('#askAnything') as
      | HTMLTextAreaElement
      | undefined;
  }

  get #languageSelect(): HTMLSelectElement | undefined {
    return this.shadowRoot?.querySelector('#language') as
      | HTMLSelectElement
      | undefined;
  }

  get #languageTextArea(): HTMLTextAreaElement | undefined {
    return this.shadowRoot?.querySelector('#languageContent') as
      | HTMLTextAreaElement
      | undefined;
  }

  get #imagePrompt(): HTMLTextAreaElement | undefined {
    return this.shadowRoot?.querySelector('#imagePrompt') as
      | HTMLTextAreaElement
      | undefined;
  }

  get #imageSize(): HTMLSelectElement | undefined {
    return this.shadowRoot?.querySelector('#imageSize') as
      | HTMLSelectElement
      | undefined;
  }

  get #imageQuality(): HTMLSelectElement | undefined {
    return this.shadowRoot?.querySelector('#imageQuality') as
      | HTMLSelectElement
      | undefined;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#socket = new WebSocket(
      'wss://7w4j1v3rz7.execute-api.us-east-1.amazonaws.com/production/'
    );

    this.#socket.addEventListener('open', this.#socketOpen.bind(this));
    this.#socket.addEventListener('close', this.#socketClosed.bind(this));
    this.#socket.addEventListener('message', this.#socketMessage.bind(this));
  }

  disconnectedCallback(): void {
    this.#socket?.removeEventListener('open', this.#socketOpen);
    this.#socket?.removeEventListener('close', this.#socketClosed);
    this.#socket?.removeEventListener('message', this.#socketMessage);
  }

  render() {
    return html`
      <rh-button @click=${() => this.toggle()} aria-expanded="false" aria-controls="drawer" icon="ai-ml" icon-set="standard">
        Help
      </rh-button>
      <rhack-drawer id="drawer">
        <rh-icon slot="header" icon="ai-ml"></rh-icon>
        <h2 slot="header">
          How can I help?</h2>
        <details name="ai-suggest">
          <summary>Suggest Page Title</summary>
          <div>
            <rh-button @click=${() => this.#query('title')}>Read Page</rh-button>
            <p>Select åa specific content region</p>
            <rh-button>Content Region</rh-button>
          </div>
        </details>
        <details name="ai-suggest">
          <summary>Suggest Page Summary</summary>
          <div>
            <rh-button @click=${() => this.#query('summary')}>Read Page</rh-button>
            <p>Select a specific content region</p>
            <rh-button>Content Region</rh-button>
          </div>
        </details>
        <details name="ai-suggest">
          <summary>Suggest Taxonomy</summary>
          <div>
            <rh-button @click=${() => this.#query('taxonomy')}>Read Page</rh-button>
            <p>Select a specific content region</p>
            <rh-button>Content Region</rh-button>
          </div>
        </details>
        <details name="ai-suggest">
          <summary>Generate Image</summary>
          <div>
            <textarea rows="10" placeholder="Add a custom prompt.\n\nExample: An image of a user standing at a desktop computer analyzing chart data in line art design using only 4 colors, white, black, red, and grey."></textarea>
            <rh-button @click=${() => this.#query('image')}>Generate</rh-button>
            <p>Select a specific content region</p>
            <rh-button>Content Region</rh-button>
          </div>
        </details>
        <details name="ai-suggest">
          <summary>Translate</summary>
          <div>
            <label for="language">Select language to translate to</label>
            <select id="language" ?disabled="${this.#loading}">
              <option value="">Select an option</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Spanish">Spanish</option>
            </select>
            <label for="content">Copy Text to translate</label>
            <textarea id="content" rows="10" placeholder="Copy text to translate"></textarea>
            <rh-button @click=${() => this.#query('translate')}>Translate</rh-button>
          </div>
        </details>
      </rhack-drawer>
    `;
  }

  toggle() {
    this.drawer.open = !this.drawer.open;
    this.trigger.ariaExpanded = String(this.drawer.open);
  }

  #socketOpen() {
    this.#connection = true;
    this.requestUpdate();
    const ping = JSON.stringify({ action: 'ping' });
    // set an interval of pings to keep connection alive
    setInterval(() => {
      if (this.#connection) {
        this.#socket?.send(ping);
      }
    }, 30000);
  }

  #socketClosed(event: CloseEvent) {
    // TODO: handle close of connection, add a reconnect feature?
    console.log('connection closed', event);
  }

  #socketMessage(event: MessageEvent) {
    console.log('message received');
    this.#updateResponse(event);
  }

  #query(type: 'image' | 'translate' | 'taxonomy' | 'summary' | 'title') {
    console.log(type);
  }

  #updateResponse(event: MessageEvent) {
    console.log(event);
    console.log(event.data);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rhack-image-helper': RhackImageHelper;
  }
}
