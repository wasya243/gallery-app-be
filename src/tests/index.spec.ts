import { expect } from 'chai';
import 'mocha';

function helloTest() {
  return true;
}

describe('First test', () => {
  it('should return true', () => {
    const result = helloTest();
    expect(result).to.equal(true);
  });
});
