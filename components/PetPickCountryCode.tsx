import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';

import { PetText } from './PetText';
import { PetView } from './PetView';

type PickProps = {
  onChange: (text: string) => void;
  value: string;
};

export const PetPickCountryCode = ({ onChange, value }: PickProps) => {
  const defaultCountryCode: string = '+1';
  const defaultCountryFlag: string = '🇺🇸';

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [countryFlag, setCountryFlag] = useState(defaultCountryFlag);

  useEffect(() => {
    onChange(defaultCountryCode);
    value = defaultCountryCode;
  }, []);

  return (
    <PetView style={{ width: '30%', height: 45, paddingRight: 2 }}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderColor: 'rgb(34 211 238)',
        }}>
        <PetText
          style={{
            fontSize: 14,
          }}>
          {countryFlag} {countryCode}
        </PetText>
      </TouchableOpacity>
      <CountryPicker
        style={{ modal: { height: '90%' } }}
        show={show}
        lang="en"
        pickerButtonOnPress={(item) => {
          value = item.dial_code;
          onChange(item.dial_code);
          setCountryCode(item.dial_code);
          setCountryFlag(item.flag);
          setShow(false);
        }}
      />
    </PetView>
  );
};
