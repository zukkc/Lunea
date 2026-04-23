import { OptionType } from '@/src/core/types/settings.types';

export const convertToOptionType = <T,>( 
  value: T,
): OptionType<T> => {
  return { label: String(value), value: value };
};
