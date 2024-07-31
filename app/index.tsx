import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PetView } from '@/components/PetView';
import PetCard from './pet/petCard';

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{flex:1,alignItems:'center', justifyContent: 'center'}}>
        <PetCard />
      </PetView>
    </PetView>
  );
}
