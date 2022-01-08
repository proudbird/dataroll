import gettingString from './string';
import gettingNumbers from './number';
import gettingBoolean from './boolean';
import gettingDate from './date';

export default function() {
  describe('Value transformation', () => {
    gettingString();
    gettingNumbers();
    gettingBoolean();
    gettingDate();
  });
}