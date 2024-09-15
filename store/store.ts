import { create } from 'zustand';

import { PetProps } from '@/types/pet';

type PetStore = {
  pets: PetProps[];
  setPetList: (petList: PetProps[]) => void;
  removePetFromStore: (petId: string) => void;
};

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  setPetList: (petList: PetProps[]) => set({ pets: petList }),
  removePetFromStore: (petId: string) =>
    set((state) => ({ pets: state.pets.filter((pet) => pet.id !== petId) })),
}));

type ToastProps = {
  isVisible: boolean;
  message: string;
};

type ToastStore = {
  isToastVisible: boolean;
  toastMessage: string;
  setToast: (toast: ToastProps) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  isToastVisible: false,
  toastMessage: '',
  setToast: (state: ToastProps) =>
    set({ isToastVisible: state.isVisible, toastMessage: state.message }),
}));
