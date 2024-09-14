export type OwnerProps = {
  country_code: string;
  email: string;
  id: string;
  phone: string;
};

export type PetProps = {
  id: string;
  inserted_at: string;
  pet_image: string;
  pet_age: string;
  pet_breed: string;
  pet_gender: string;
  pet_medical_condition: string;
  pet_name: string;
  pet_type: string;
  profiles: OwnerProps;
  user_id: string;
};
