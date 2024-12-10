import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { RhackImageHelper } from '../src/rhack-image-helper.js';

describe('<rhack-image-helper>', function() {
  let element: RhackImageHelper;

  describe('simply instantiating', function() {
    beforeEach(async function() {
      element = await fixture<RhackImageHelper>(html`<rhack-image-helper></rhack-image-helper>`);
    });

    it('should upgrade', function() {
      const klass = customElements.get('rhack-image-helper');
      expect(element)
          .to.be.an.instanceof(klass)
          .and
          .to.be.an.instanceOf(RhackImageHelper);
    });

    it('passes the a11y audit', async function() {
      await Promise.resolve(expect(element).to.be.accessible());
    });
  });
});
