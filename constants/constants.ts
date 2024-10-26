import { localization } from '@/localizations/localization';
import { DropdownProps } from '@/types/dropdown';

export const petTypeData: { [key: string]: DropdownProps } = {
  1: { label: localization.t('pet_register_form_pet_type_dog'), value: '1' },
  2: { label: localization.t('pet_register_form_pet_type_cat'), value: '2' },
};

export const petGenderData: { [key: string]: DropdownProps } = {
  1: { label: localization.t('pet_register_form_pet_gender_male'), value: '1' },
  2: { label: localization.t('pet_register_form_pet_gender_female'), value: '2' },
};
