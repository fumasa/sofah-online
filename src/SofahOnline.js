import { LitElement, html, css } from 'lit';
import IPFS from 'ipfs';
import "ipfs-css";
import 'tachyons'

export class SofahOnline extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      _ipfs: {state: true},
      _id: {state: true},
      _version: {state: true},
      _agentVersion: {state: true}
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--sofah-online-background-color);
      }

      main {
        flex-grow: 1;
      }

      .logo {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Sofah Online!';
    this._ipfs = null;
    this._id = null;
    this._version = null;
    this._agentVersion = null;
  }

  connectedCallback() {
    super.connectedCallback()

    this.initIPFS();
  }

  async initIPFS() {
    const ipfs = await IPFS.create();
    const id = await ipfs.id();
    const version = await ipfs.version();

    this._ipfs = ipfs
    this._id = id.id;
    this._agentVersion = id.agentVersion;
    this._version = version.version;
  }

  render() {
    if (!this._ipfs) {
      return html`Loading...`;
    }

    const info = {
      'Id': this._id,
      'Agent Version': this._agentVersion,
      'Version': this._version,
    }

    return html`
      <section>
        <h1 data-test='title'>Connected to IPFS</h1>
        <div>
          ${Object.entries(info).map(([key, value]) => html`
              <div>
                <h2>${key}</h2>
                <div data-test=${key.replace(/\s+/g, '')}>${value}</div>
              </div>
              `
          )}
        </div>
      </section>
    `;
  }
}
