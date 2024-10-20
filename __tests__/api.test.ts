import {
  getPetList,
  getPetById,
  deletePetById,
  insertPet,
  storePetImage,
  deletePetImage,
  signInWithPassword,
  signUpWithEmailPassword,
  saveUserProfile,
  signOut,
  getSession,
  onAuthStateChange,
} from '@/lib/api';
import { supabase } from '@/lib/supabase';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      delete: jest.fn(() => ({
        eq: jest.fn(),
      })),
      select: jest.fn(() => ({
        eq: jest.fn(),
      })),
      upsert: jest.fn(),
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        remove: jest.fn(),
      })),
    },
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe('api', () => {
  describe('getPetList', () => {
    it('should getPetList by user id return no error on success', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: {}, error: null }),
        }),
      });

      const result = await getPetList('user-id-123');
      expect(result.data).not.toBeNull();
    });

    it('should getPetList return an error', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: 'getPetList error' }),
        }),
      });

      const result = await getPetList('user-id-123');
      expect(result.error).toBe('getPetList error');
    });
  });

  describe('deletePetById', () => {
    it('should delete a pet by id and return no error on success', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      const result = await deletePetById('pet-id-123');
      expect(result.error).toBeNull();
    });

    it('should deletePetById return an error', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: 'Deletion failed' }),
        }),
      });

      const result = await deletePetById('pet-id-123');
      expect(result.error).toBe('Deletion failed');
    });
  });

  describe('insertPet', () => {
    const newPet = {
      user_id: 'user-id-test',
      pet_image: 'http://fakeurl/details/test.png',
      pet_name: 'pet-name-test',
      pet_type: 'pet-type-test',
      pet_gender: 'pet-gender-test',
      pet_breed: 'pet-breed-test',
      pet_age: 'pet-age-test',
      pet_medical_condition: 'pet-medical-condition-test',
      inserted_at: new Date(),
    };

    it('should insert a pet and return no error on success', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        upsert: jest.fn().mockReturnValue({ error: null }),
      });

      const result = await insertPet(newPet);
      expect(result.error).toBeNull();
    });

    it('should insertPet return an error', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        upsert: jest.fn().mockReturnValue({ error: 'insertPet error' }),
      });

      const result = await insertPet(newPet);
      expect(result.error).toBe('insertPet error');
    });
  });

  describe('storePetImage', () => {
    it('should storePetImage and return no error on success', async () => {
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockReturnValue({
          data: { id: 'pet-image-id', path: 'pet-image-path', fullPath: 'pat-image-full-path' },
          error: null,
        }),
      });

      const result = await storePetImage(
        'pet-image-path',
        'pet-image-code',
        'pet-image-content-type',
      );
      expect(result.error).toBeNull();
    });

    it('should storePetImage return an error', async () => {
      (supabase.storage.from as jest.Mock).mockReturnValue({
        upload: jest.fn().mockReturnValue({
          data: null,
          error: 'storePetImage error',
        }),
      });

      const result = await storePetImage(
        'pet-image-path',
        'pet-image-code',
        'pet-image-content-type',
      );
      expect(result.error).toBe('storePetImage error');
    });
  });

  describe('deletePetImage', () => {
    it('should deletePetImage and return no error on success', async () => {
      (supabase.storage.from as jest.Mock).mockReturnValue({
        remove: jest.fn().mockReturnValue({
          data: [],
          error: null,
        }),
      });

      const result = await deletePetImage('pet-image');
      expect(result.error).toBeNull();
    });

    it('should deletePetImage return an error', async () => {
      (supabase.storage.from as jest.Mock).mockReturnValue({
        remove: jest.fn().mockReturnValue({
          data: null,
          error: 'deletePetImage error',
        }),
      });

      const result = await deletePetImage('pet-image');
      expect(result.error).toBe('deletePetImage error');
    });
  });

  describe('signInWithPassword', () => {
    it('should signInWithPassword and return no error on success', async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockReturnValue({
        data: { user: '', session: '' },
        error: null,
      });

      const result = await signInWithPassword('user-email', 'user-password');
      expect(result.error).toBeNull();
    });

    it('should signInWithPassword return an error', async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockReturnValue({
        data: null,
        error: 'signInWithPassword error',
      });

      const result = await signInWithPassword('user-email', 'user-password');
      expect(result.error).toBe('signInWithPassword error');
    });
  });

  describe('signUpWithEmailPassword', () => {
    it('should signUpWithEmailPassword and return no error on success', async () => {
      (supabase.auth.signUp as jest.Mock).mockReturnValue({
        data: { user: '', session: '' },
        error: null,
      });

      const result = await signUpWithEmailPassword('user-email', 'user-password');
      expect(result.error).toBeNull();
    });

    it('should signUpWithEmailPassword return an error', async () => {
      (supabase.auth.signUp as jest.Mock).mockReturnValue({
        data: null,
        error: 'signUpWithEmailPassword error',
      });

      const result = await signUpWithEmailPassword('user-email', 'user-password');
      expect(result.error).toBe('signUpWithEmailPassword error');
    });
  });

  describe('saveUserProfile', () => {
    const userProfile = {
      id: 'user-id',
      email: 'user-email',
      country_code: 'country-code',
      phone: 'user-phone',
      updated_at: new Date(),
    };

    it('should saveUserProfile and return no error on success', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        upsert: jest.fn().mockReturnValue({ data: null, error: null }),
      });

      const result = await saveUserProfile(userProfile);
      expect(result.error).toBeNull();
    });

    it('should saveUserProfile return an error', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        upsert: jest.fn().mockReturnValue({ data: null, error: 'saveUserProfile error' }),
      });

      const result = await saveUserProfile(userProfile);
      expect(result.error).toBe('saveUserProfile error');
    });
  });

  describe('signOut', () => {
    it('should signOut and return no error on success', async () => {
      (supabase.auth.signOut as jest.Mock).mockReturnThis();

      await signOut();
    });
  });

  describe('getSession', () => {
    it('should getSession and return no error on success', async () => {
      (supabase.auth.getSession as jest.Mock).mockReturnValue({
        data: { session: '' },
        error: null,
      });

      const result = await getSession();
      expect(result.error).toBeNull();
    });

    it('should getSession return an error', async () => {
      (supabase.auth.getSession as jest.Mock).mockReturnValue({
        data: null,
        error: 'getSession error',
      });

      const result = await getSession();
      expect(result.error).toBe('getSession error');
    });
  });

  describe('onAuthStateChange', () => {
    it('should onAuthStateChange and return no error on success', async () => {
      const mockSetSession = jest.fn();
      const mockSession = { user: { id: 'user-123', email: 'test@example.com' } };
      (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
        callback('SIGNED_IN', mockSession);
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      });
      const subscription = onAuthStateChange(mockSetSession);
      expect(mockSetSession).toHaveBeenCalledWith(mockSession);
      expect(supabase.auth.onAuthStateChange).toHaveBeenCalled();
      expect(subscription.data.subscription.unsubscribe).toBeDefined();
    });
  });
});
