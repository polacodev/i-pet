import React from 'react';
import { Image, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Pet } from '../details/[id]';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { localization } from '@/localizations/localization';

const expoApiUrl = process.env.EXPO_PUBLIC_API_URL;
const whatsappApiUrl = process.env.EXPO_PUBLIC_WHATSAPP_API_URL;

type PetDetailsProps = {
  pet: Pet | undefined;
};

const PetCard: React.FC<PetDetailsProps> = ({ pet }) => {
  const iPetUrl = `${expoApiUrl}/details/${pet?.id}`;

  const callWhatsappOwner = () => {
    Linking.openURL(`${whatsappApiUrl}/591${pet?.ownerPhone}`);
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
          {localization.t('info_pet_name')}: {pet?.petName}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_type')} {pet?.petType}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_gender')}: {pet?.petGender}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_breed')}: {pet?.petBreed}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_age')}: {pet?.petAge}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_medical_condition')}: {pet?.petMedicalCondition}
        </PetText>

        {/** OWNER INFO */}
        <PetTitle type="subtitle" style={{ paddingTop: 8 }}>
          {localization.t('info_owner_contact')}
        </PetTitle>
        <PetText type="default">
          {localization.t('info_owner_name')}: {pet?.ownerName}
        </PetText>
        <PetText type="default">
          {localization.t('info_owner_phone')}: {pet?.ownerPhone}
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
