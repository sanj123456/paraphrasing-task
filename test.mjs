import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { paraphraseText, validateOption } from './paraphrasing.mjs';


describe('Paraphrasing', () => {
  describe('validateOption', () => {
    it('should return true for valid option', () => {
      const result = validateOption('professional');
      expect(result).to.be.true;
    });

    it('should return false for invalid option', () => {
      const result = validateOption('invalid');
      expect(result).to.be.false;
    });
  });

  describe('paraphraseText', () => {
    beforeEach(() => {
      sinon.stub(axios, 'post');
    });

    afterEach(() => {
      axios.post.restore();
    });

    it('should return paraphrased text from the API', async () => {
      const expectedParaphrasedText = 'Paraphrased text';
      axios.post.resolves({ data: { paraphrasedText: expectedParaphrasedText } });

      const result = await paraphraseText('Original text', 'professional');
      // console.log('---res d', result);

      expect(result?.data?.paraphrasedText).to.equal(expectedParaphrasedText);
    });

    it('should return original text in case of API error', async () => {
      const expectedError = new Error('API error');
      axios.post.rejects(expectedError);

      const result = await paraphraseText('Original text', 'professional');
      // console.log(result);
      expect(result).to.equal('Original text');
    });
  });
});
