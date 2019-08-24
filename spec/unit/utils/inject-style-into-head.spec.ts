import { injectStyleIntoHead } from '../../../src/utils';

describe('injectStyleIntoHead', () => {
  it('should inject style into document head', () => {
    const style  = 'p { color: #000; }';
    injectStyleIntoHead(style);
    expect(document.head.innerHTML)
      .toContain('<style>p { color: #000; }</style>');
  });
});
