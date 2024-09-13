import { create } from 'zustand';

import { PetProps } from '@/types/pet.type';

type PetStore = {
  pets: PetProps[];
  setPetList: (petList: PetProps[]) => void;
  removePetFromPetList: (petId: string) => void;
};

export const usePetStore = create<PetStore>((set) => ({
  pets: [],
  setPetList: (petList: PetProps[]) => set({ pets: petList }),
  removePetFromPetList: (petId: string) =>
    set((state) => ({ pets: state.pets.filter((pet) => pet.id !== petId) })),
}));
