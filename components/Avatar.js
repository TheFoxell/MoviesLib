// Components/Avatar.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { connect } from 'react-redux'

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatar: require('../Images/ic_tag_faces.png')
    }
    this._avatarClicked = this._avatarClicked.bind(this)
  }

  _avatarClicked() {
    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
        return;
        }
        else {
            console.log('Photo : ', pickerResult.uri )
            let requireSource = { localUri: pickerResult.uri }
            const action = { type: "SET_AVATAR", value: requireSource }
            this.props.dispatch(action)
        }
  }
}




  render() {
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
          <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)