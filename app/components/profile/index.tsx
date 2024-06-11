import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {launchImageLibrary} from 'react-native-image-picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import ProfileInput from '../profileInput';
import Button from '../submitButton';
import {ProfileData} from '../../hooks/useProfileData';
interface ProfileImageProps {
  uri: string;
  type: string | undefined;
  name: string | undefined;
}
interface ProfileFormProps {
  initialValues: ProfileData;
  updateProfileData: (updatedData: any) => Promise<boolean>;
}
const Profile: React.FC<ProfileFormProps> = ({
  initialValues,
  updateProfileData,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    initialValues?.profile_pic!,
  );
  const [profilePicFile, setProfilePicFile] =
    useState<ProfileImageProps | null>(null);
  const [name, setName] = useState<string>(initialValues?.name);
  const [mobileNumber, setMobileNumber] = useState<string | null>(
    initialValues?.mobile_number!,
  );
  const [address, setAddress] = useState<string | null>(initialValues?.address);
  const [zipcode, setZipcode] = useState<string | null>(initialValues?.zipcode);
  const [city, setCity] = useState<string | null>(initialValues?.city);
  const [state, setState] = useState<string | null>(initialValues?.state);
  const [country, setCountry] = useState<string | null>(initialValues?.country);
  // const handleChoosePhoto = () => {
  //   const options: any = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response?.error) {
  //       console.log('ImagePicker Error: ', response?.error);
  //     } else if (response.assets && response.assets[0].uri) {
  //       const source = response.assets[0].uri;
  //       const FileName = response.assets[0].fileName;
  //       const type = response.assets[0].type;
  //       setProfilePicFile({uri: source, name: FileName, type});
  //       setProfileImage(source); // For UI
  //     }
  //   });
  // };
  const handleFormSubmit = async () => {
    const updatedData = {
      profile_pic: profilePicFile, // Assuming this is the URI string you mentioned
      name,
      mobile_number: mobileNumber,
      address,
      zipcode,
      city,
      state,
      country,
    };
    // Assuming you have a function similar to `updateProfileData` that
    // updates the profile data and returns a boolean indicating success/failure.
    const isSuccess = await updateProfileData(updatedData);
    if (isSuccess) {
      // console.log('Profile updated successfully');
      Alert.alert('Message', 'Profile updated successfully');
    } else {
      // console.error('Failed to update profile');
      Alert.alert('Message', 'Failed to update profile');
    }
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.profileImageContainer}>
        {profileImage ? (
          <>
            <Image
              source={{
                uri: profilePicFile
                  ? profilePicFile.uri
                  : `http://10.0.2.2:8000/profile_pic/${profileImage}`,
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={handleChoosePhoto}>
              <Icon name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.profileImagePlaceholder}
            onPress={handleChoosePhoto}>
            <Icon name="camera-alt" size={20} color="#fff" />
            <Text style={styles.placeholderText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View> */}

      <ProfileInput
        value={name}
        onChangeText={text => setName(text)}
        label="Name"
        placeholder="John Doe"
      />
      <ProfileInput
        value={mobileNumber as string}
        onChangeText={text => setMobileNumber(text)}
        label="Phone"
        placeholder="+1234567890"
      />
      <ProfileInput
        value={address as string}
        onChangeText={text => setAddress(text)}
        label="Address"
        placeholder="123 Main St"
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="12345"
            value={zipcode as string}
            onChangeText={text => setZipcode(text)}
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Anytown"
            value={city as string}
            onChangeText={text => setCity(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Anystate"
            value={state as string}
            onChangeText={text => setState(text)}
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Any Country"
            value={country as string}
            onChangeText={text => setCountry(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* {<Button title="Cancel" />} */}
        <Button title="Update" onPress={handleFormSubmit} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: rh(2),
  },
  profileImageContainer: {
    marginBottom: rh(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileImagePlaceholder: {
    width: rw(30),
    height: rh(12),
    borderRadius: rw(2),
    backgroundColor: '#e1e4e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    marginTop: rh(1),
  },
  profileImage: {
    width: rw(30),
    height: rh(12),
    borderRadius: rw(2),
    backgroundColor: '#e1e4e8',
  },
  cameraIcon: {
    position: 'absolute',
    right: rw(2),
    bottom: rh(1),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: rw(1),
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '100%',
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
  half: {
    width: '48.5%',
  },
  buttonContainer: {
    marginVertical: rh(1),
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // marginHorizontal: rw(2),
  },
});
