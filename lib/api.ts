import { decode } from 'base64-arraybuffer';

import { supabase } from '@/lib/supabase';
import { PetProps } from '@/types/pet';
import { Session } from '@/types/session';
import { UserProfileProps } from '@/types/user';

export const getPetList = async (userId: string | null) => {
  let petList: PetProps[] = [];
  const { data, error } = await supabase
    .from('pets')
    .select(
      `
      id,
      inserted_at,
      pet_image,
      pet_age,
      pet_breed,
      pet_gender,
      pet_medical_condition,
      pet_name,
      pet_type,
      user_id,
      profiles (
        id,
        email,
        country_code,
        phone
      )
      `,
    )
    .eq('user_id', userId);

  // if (error) return { data, error };
  // if (data) {
  petList = data;
  return { data: petList, error };
  // }
  // return { data, error };
};

export const getPetById = async (petId: string) => {
  const { data, error } = await supabase
    .from<any, 'public'>('pets')
    .select(
      `
      id,
      inserted_at,
      pet_image,
      pet_age,
      pet_breed,
      pet_gender,
      pet_medical_condition,
      pet_name,
      pet_type,
      user_id,
      profiles (
        id,
        email,
        country_code,
        phone
      )
    `,
    )
    .eq('id', petId)
    .single();
  return { data, error };
};

export const deletePetById = async (petId: string) => {
  const { error } = await supabase.from('pets').delete().eq('id', petId);
  return { error };
};

export const insertPet = async (newPet: any) => {
  const { error } = await supabase.from('pets').upsert(newPet);
  return { error };
};

export const storePetImage = async (filePath: string, code: any, contentType: string) => {
  const { data, error } = await supabase.storage
    .from('pets')
    .upload(filePath, decode(code), { contentType });
  return { data, error };
};

export const deletePetImage = async (petImage: string) => {
  const { data, error } = await supabase.storage.from('pets').remove([petImage]);
  return { data, error };
};

export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmailPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

export const saveUserProfile = async (user: UserProfileProps) => {
  const { data, error } = await supabase.from('profiles').upsert(user);
  return { data, error };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const onAuthStateChange = (setSession: (session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
};
