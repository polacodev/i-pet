import '@testing-library/react-native/extend-expect';

import { usePetStore, useToastStore } from '@/store/store';

describe('store', () => {
  const petsListData = [
    {
      id: 'pet id',
      inserted_at: 'test inserted at',
      pet_image: 'test image',
      pet_age: 'test age',
      pet_breed: 'test breed',
      pet_gender: 'test gender',
      pet_medical_condition: 'test medical condition',
      pet_name: 'test name',
      pet_type: 'test type',
      profiles: {
        country_code: 'test',
        email: 'test email',
        id: 'test profile id',
        phone: 'test phone',
      },
      user_id: 'test user id',
    },
  ];

  beforeEach(() => {
    // initial usePetStore
    usePetStore.setState({
      pets: [],
    });

    // initial useToastStore
    useToastStore.setState({ toast: { isVisible: false, message: 'test toast message false' } });
  });

  describe('usePetStore', () => {
    test('usePetStore should have the initial state', () => {
      const { pets } = usePetStore.getState();
      expect(pets).toEqual([]);
    });

    test('usePetStore should set a new pet on the PetList', () => {
      usePetStore.getState().setPetList(petsListData);
      const { pets } = usePetStore.getState();
      expect(pets).toEqual(petsListData);
    });

    test('usePetStore should remove the pet with `pet id`', () => {
      usePetStore.getState().setPetList(petsListData);
      usePetStore.getState().removePetFromStore('pet id');
      const { pets } = usePetStore.getState();
      expect(pets).toEqual([]);
    });
  });

  describe('useToastStore', () => {
    test('useToastStore should have the initial state', () => {
      const { toast } = useToastStore.getState();
      expect(toast).toEqual({ isVisible: false, message: 'test toast message false' });
    });

    test('useToastStore should have the new state', () => {
      useToastStore.getState().setToast({ isVisible: true, message: 'test toast message true' });
      const { toast } = useToastStore.getState();
      expect(toast).toEqual({ isVisible: true, message: 'test toast message true' });
    });
  });
});
