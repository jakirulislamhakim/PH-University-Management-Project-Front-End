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

export const monthsOptions: TSelectOptionsType = months.map((month) => ({
  label: month,
  value: month,
}));

const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['male', 'female', 'other'];

export const bloodGroupOptions: TSelectOptionsType = bloodGroup.map((blood) => ({
  label: blood,
  value: blood,
}));

export const genderOptions: TSelectOptionsType = genders.map((gender) => ({
  label: gender,
  value: gender,
}));
