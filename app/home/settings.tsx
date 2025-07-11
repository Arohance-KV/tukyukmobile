import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import type { AppDispatch } from '../redux/store';

export default function SettingsScreen() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  const phone = user?.phoneNumber ?? '';
  const vehicleNumber = user?.vehicleNumber ?? 'DL 00 XX 0000';

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../profile.jpg')} style={styles.profileImage} />

        {/* Dynamic vehicle number plate */}
        <View style={styles.numberPlate}>
          <Text style={styles.plateCountry}>IND</Text>
          <Text style={styles.plateText}>{vehicleNumber}</Text>
        </View>
      </View>

      <View style={styles.options}>
        <MenuItem
          icon={<FontAwesome5 name="user-edit" size={20} color="gray" />}
          label="Edit Profile"
          onPress={() => router.push('/profile/edit')}
        />
        <MenuItem
          icon={<MaterialIcons name="assessment" size={20} color="gray" />}
          label="Performance Status"
          onPress={() => router.push('/home/analytics')}
        />
        <MenuItem
          icon={<AntDesign name="infocirlceo" size={20} color="gray" />}
          label="About US"
          onPress={() => router.push('/profile/about-us')}
        />
        <MenuItem
          icon={<MaterialIcons name="qr-code" size={20} color="gray" />}
          label="Pair Device"
          onPress={() => router.push('/home/pair')}
        />
        <MenuItem
          icon={<Entypo name="log-out" size={20} color="red" />}
          label="Log out"
          labelStyle={{ color: 'red' }}
          onPress={() => {
            dispatch(logout());
            router.replace('/');
          }}
        />
      </View>
    </View>
  );
}

function MenuItem({ icon, label, onPress, labelStyle = {} }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuIcon}>{icon}</View>
      <Text style={[styles.menuLabel, labelStyle]}>{label}</Text>
      <AntDesign name="right" size={16} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  topSection: {
    backgroundColor: '#4B6EF6',
    paddingTop: 100,
    paddingBottom: 100,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  name: {
    fontSize: 35,
    color: '#fff',
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Nunito',
  },
  phone: {
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'Nunito',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
    gap: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },

  numberPlate: {
    backgroundColor: '#f6cc06',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
  },
  plateCountry: {
    position: 'absolute',
    top: 4,
    left: 4,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
  },
  plateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  options: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    flex: 1,
    color: '#555',
    fontFamily: 'Nunito',
  },
});
