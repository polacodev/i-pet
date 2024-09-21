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
  toast: ToastProps;
  setToast: (toast: ToastProps) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toast: { isVisible: false, message: '' },
  setToast: (state: ToastProps) => set({ toast: state }),
}));
