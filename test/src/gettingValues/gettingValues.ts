import gettingString from './string';
import gettingNumbers from './number';
import gettingBoolean from './boolean';
import gettingDate from './date';
import gettingWithWrongType from './wrongType';

export default function() {
  describe('Value definition', () => {
    gettingString();
    gettingNumbers();
    gettingBoolean();
    gettingDate();
    gettingWithWrongType();
  });
}