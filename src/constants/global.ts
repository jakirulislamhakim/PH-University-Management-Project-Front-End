import { TSelectOptionsType } from '../types';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthsOptions: TSelectOptionsType = months.map(month => ({
  label: month,
  value: month,
}));
