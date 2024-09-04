import React from 'react';
import { Image, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { localization } from '@/localizations/localization';
import { PetProps } from '@/types/pet.type';

const expoApiUrl = process.env.EXPO_PUBLIC_API_URL;
const whatsappApiUrl = process.env.EXPO_PUBLIC_WHATSAPP_API_URL;

const PetCard: React.FC<PetProps> = (petInfo) => {
  const iPetUrl = `${expoApiUrl}/details/${petInfo?.id}`;

  const callWhatsappOwner = () => {
    Linking.openURL(
      `${whatsappApiUrl}/${petInfo?.profiles.country_code + petInfo?.profiles.phone}`,
    );
  };

  return (
    <PetView style={{ width: '100%', flex: 1, justifyContent: 'flex-start' }}>
      <PetView style={{ alignItems: 'center' }}>
        {/* PET IMAGE */}
        <PetView style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/Y2WtUyRRcQkDizOjI8FsJPtqqtVfzi0KqTMD5hoanls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg1/MzMwMzMzL3Bob3Rv/L2RhY2hzaHVuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0FrMTE5RjhMWWNP/NXl6N0x3N3pHSE1U/aTJaQUlrQjI5anp4/TVJkRlpuQT0',
            }}
            resizeMode="cover"
            style={{ width: 80, height: 80, borderRadius: 9999 }}
          />
        </PetView>

        {/** PET DETAIL */}
        <PetTitle type="subtitle" style={{ paddingTop: 8 }}>
          {localization.t('info_pet_details')}
        </PetTitle>
        <PetText type="default">
          {localization.t('info_pet_name')}: {petInfo?.pet_name}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_type')} {petInfo?.pet_type}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_gender')}: {petInfo?.pet_gender}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_breed')}: {petInfo?.pet_breed}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_age')}: {petInfo?.pet_age}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_medical_condition')}: {petInfo?.pet_medical_condition}
        </PetText>

        {/** OWNER INFO */}
        <PetTitle type="subtitle" style={{ paddingTop: 8 }}>
          {localization.t('info_owner_contact')}
        </PetTitle>
        <PetText type="default">
          {localization.t('info_owner_name')}: {petInfo?.profiles.email}
        </PetText>
        <PetText type="default">
          {`${localization.t('info_owner_phone')}: +${petInfo?.profiles.country_code}-${petInfo?.profiles.phone}`}
        </PetText>

        {/** BUTTONS */}
        <PetButton
          onPress={callWhatsappOwner}
          iconName="logo-whatsapp"
          color="#075E54"
          buttonName={localization.t('info_button_owner_whatsapp')}
        />
        {/* <PetButton
          onPress={goToQRPet}
          iconName="camera"
          buttonName={localization.t('info_button_new_qr')}
        /> */}

        {/** FOOTER */}
        {/* <PetTitle type="link" onPress={goToHome} style={{ textDecorationLine: 'underline' }}>
          {localization.t('info_back_to_home')}
        </PetTitle> */}
        <QRCode value={iPetUrl} />
      </PetView>
    </PetView>
  );
};

export default PetCard;
