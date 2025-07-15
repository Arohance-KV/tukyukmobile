import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutUsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <TouchableOpacity
        onPress={() => router.push('/home/settings')}
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 10,
          padding: 6,
        }}
      >
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          color: 'black',
          marginTop: 40,
          marginBottom: 20,
          fontFamily: 'Nunito',
        }}
      >
        About Us
      </Text>

      
      <Image
        source={require('../tuktuk.png')} 
        style={{
          width: '100%',
          height: 300,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        resizeMode="cover"
      />

      <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: 'black',
            marginBottom: 12,
            textAlign: 'left',
            fontFamily: 'Nunito',
          }}
        >
          About Us
        </Text>

        <Text
          style={{
            fontSize: 17,
            lineHeight: 30,
            color: 'black',
            marginBottom: 35,
            fontWeight: '500',
            fontFamily: 'Nunito',
          }}
        >
          Tuk Tuk Ads is revolutionizing the way brands connect with their audience by leveraging
          the unique and vibrant presence of tuk tuks as advertising platforms. We offer a dynamic
          and cost-effective solution for businesses to reach a broader audience.
        </Text>

        
        <TouchableOpacity
          onPress={() => {
          }}
          style={{
            backgroundColor: '#000',
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: 'Nunito' }}>
            Get in Touch
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
