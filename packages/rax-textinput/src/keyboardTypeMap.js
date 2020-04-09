import { isQuickApp } from 'universal-env';

const keyboardTypeMap = {
  default: 'text',
  'ascii-capable': 'text',
  'numbers-and-punctuation': 'number',
  url: isQuickApp ? 'text' : 'url',
  'number-pad': 'number',
  'phone-pad': 'tel',
  'name-phone-pad': 'text',
  'email-address': 'email',
  'decimal-pad': 'number',
  twitter: 'text',
  'web-search': isQuickApp ? 'text' : 'search',
  numeric: 'number'
};

export default keyboardTypeMap;