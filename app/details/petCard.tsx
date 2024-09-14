import React, { useState } from 'react';
import { Alert, Image, Linking, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { PetButton } from '@/components/PetButton';
import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { localization } from '@/localizations/localization';
import { PetProps } from '@/types/pet';

const expoApiUrl = process.env.EXPO_PUBLIC_API_URL;
const whatsappApiUrl = process.env.EXPO_PUBLIC_WHATSAPP_API_URL;

interface PetCardProps {
  petInfo: PetProps;
}

const PetCard: React.FC<PetCardProps> = ({ petInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const iPetUrl = `${expoApiUrl}/details/${petInfo?.id}`;

  const callWhatsappOwner = () => {
    if (petInfo?.profiles?.country_code && petInfo?.profiles?.phone) {
      Linking.openURL(
        `${whatsappApiUrl}/${petInfo?.profiles.country_code + petInfo?.profiles.phone}`,
      );
    } else {
      Alert.alert(
        localization.t('info_alert_contact_info_title'),
        localization.t('info_alert_contact_info_message'),
      );
    }
  };

  return (
    <PetView style={{ width: '100%', flex: 1, justifyContent: 'flex-start' }}>
      <PetView style={{ alignItems: 'center' }}>
        {/* PET IMAGE */}
        <PetView style={{ alignItems: 'center' }}>
          {petInfo?.pet_image ? (
            <Image
              source={{
                uri: `${petInfo.pet_image}`,
              }}
              resizeMode="cover"
              style={{ width: 80, height: 80, borderRadius: 9999 }}
            />
          ) : (
            <PetIcon name="image" size={80} />
          )}
        </PetView>

        {/** PET DETAIL */}
        <PetTitle type="subtitle" style={{ paddingTop: 8 }}>
          {localization.t('info_pet_details')}
        </PetTitle>
        <PetText type="default">
          {localization.t('info_pet_name')}: {petInfo?.pet_name}
        </PetText>
        <PetText type="default">
          {localization.t('info_pet_type')}: {petInfo?.pet_type}
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
        <PetButton
          onPress={() => setModalVisible(!modalVisible)}
          iconName="qr-code"
          buttonName="QR Code"
        />

        {/** QR CODE */}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <PetView style={styles.modalContainer}>
            <PetView style={styles.modalView}>
              <QRCode value={iPetUrl} size={200} />
            </PetView>
            <TouchableOpacity style={{ marginTop: 20 }}>
              <PetIcon
                name="close-circle"
                size={50}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </TouchableOpacity>
          </PetView>
        </Modal>
      </PetView>
    </PetView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PetCard;
