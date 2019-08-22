import { injectStyleIntoHead } from '../../../src/utils';

test('should inject style into document head', () => {
  const style  = 'p { color: #000; }';
  injectStyleIntoHead(style);
  expect(document.head.innerHTML).toEqual('<style>p { color: #000; }</style>');
});
