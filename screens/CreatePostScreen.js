import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { dark, darkLighten } from "../config/variables";
import stringUrlExtractor from "string-url-extractor";
import { Feather, AntDesign } from "@expo/vector-icons";
import { togglePostCreating, createPost } from "../store/actions/post";
import { ActivityIndicator, Platform, StatusBar } from "react-native";

class CreatePostScreen extends React.Component {
  state = {
    post: {},
    colors: ["#70595F", "#0D6294", "#445257", "#02661D", "#FF3D44"],
    selectedColor: "#70595F",
    selectedPicture: null,
    content: "",
  };

  handleColorSelected(color) {
    this.setState({
      selectedColor: color,
    });
  }

  handleInputChange(text) {
    this.setState({
      content: text,
    });
  }

  async handleCameraButton() {
    let permissionResponse = await ImagePicker.requestCameraPermissionsAsync();
    const { granted } = permissionResponse;
    if (granted) {
      let pickerResponse = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!pickerResponse.cancelled) {
        this.setState({
          selectedPicture: pickerResponse,
        });
      } else {
        this.setState({
          selectedPicture: null,
        });
      }
    }
  }

  async handleImagePickerButton() {
    let permissionResponse = await ImagePicker.requestCameraRollPermissionsAsync();
    const { granted } = permissionResponse;
    if (granted) {
      let pickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!pickerResponse.cancelled) {
        this.setState({
          selectedPicture: pickerResponse,
        });
      } else {
        this.setState({
          selectedPicture: null,
        });
      }
    }
  }

  handleCancelImage() {
    this.setState({
      selectedPicture: null,
    });
  }

  handleSubmit() {
    const { selectedColor, selectedPicture, content } = this.state;
    const { navigation } = this.props;
    let formData = new FormData();
    if (selectedColor) {
      formData.append("post_color", selectedColor);
    }
    if (content) {
      let extractedUrls = stringUrlExtractor(content);
      let parsedContent = content;
      extractedUrls.forEach((item) => {
        parsedContent = content.replace(item, `<a href='${item}'>${item}</a>`);
      });

      parsedContent = `<p>${parsedContent}</p>`;
      formData.append("content", parsedContent);
    }

    if (selectedPicture) {
      let arr = selectedPicture.uri.split("/");
      let name = arr[arr.length - 1];
      let arrExt = name.split(".");
      let ext = arrExt[arrExt.length - 1];
      formData.append("image_path", {
        name,
        type: `${selectedPicture.type}/${ext}`,
        uri:
          Platform.OS === "android"
            ? selectedPicture.uri
            : selectedPicture.uri.replace("file://", ""),
      });
    }
    this.props.createPost(formData).then(() => {
      this.setState({
        selectedColor: this.state.colors[0],
        selectedPicture: null,
        content: "",
      });
      navigation.navigate("Explorer");
    });
  }

  render() {
    const { colors, selectedColor, selectedPicture, content } = this.state;
    const { navigation, post_creating } = this.props;
    let colorMode = !selectedPicture && selectedColor && content.length < 144;
    let canSubmit = content || selectedPicture;
    return (
      <Container>
        <StickyHeader>
          <TouchableIcon onPress={() => navigation.dismiss()}>
            <AntDesign name="close" size={24} color="#fff" />
          </TouchableIcon>
          <TouchableIcon
            disabled={!canSubmit || post_creating}
            onPress={this.handleSubmit.bind(this)}
          >
            {post_creating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="check" size={24} color="#fff" />
            )}
          </TouchableIcon>
        </StickyHeader>

        <PostFormHeader>
          <PostInputWrapper
            removeClippedSubviews={true}
            colorMode={colorMode}
            bgColor={selectedColor}
          >
            <PostInput
              onChangeText={this.handleInputChange.bind(this)}
              colorMode={colorMode}
              multiline={true}
              autofocus={true}
              value={content}
              placeholder="Quoi de neuf ?"
            />
            {selectedPicture ? (
              <PostPictureWrapper>
                <PostPicture source={{ uri: selectedPicture.uri }} />
                <PostPictureCancelButton onPress={this.handleCancelImage.bind(this)}>
                  <AntDesign name="close" size={20} color="#fff" />
                </PostPictureCancelButton>
              </PostPictureWrapper>
            ) : null}
          </PostInputWrapper>
        </PostFormHeader>
        <ColorPickerWrapper>
          <ImagePickerButton onPress={this.handleCameraButton.bind(this)}>
            <Feather name="camera" size={30} color="#fff" />
          </ImagePickerButton>

          <ImagePickerButton onPress={this.handleImagePickerButton.bind(this)}>
            <Feather name="image" size={30} color="#fff" />
          </ImagePickerButton>
          {colors.map((item) => {
            return (
              <ColorPickerItem
                key={item}
                onPress={() => this.handleColorSelected(item)}
                bgColor={item}
              />
            );
          })}
        </ColorPickerWrapper>
      </Container>
    );
  }
}
const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  margin-top: 24px;
`;

const StickyHeader = styled.View`
  width: 100%;
  background: ${darkLighten};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 10px;
  padding: 10px 15px;
`;
const PostFormHeader = styled.View`
  flex-direction: row;
  padding: 0;
`;
const PostInputWrapper = styled.View`
  background: ${(props) => (props.colorMode ? props.bgColor : "transparent")};
  padding: ${(props) => (props.colorMode ? 15 : 15)}px;
  height: ${(props) => (props.colorMode ? "220px" : "auto")};
  flex: 1;
  justify-content: center;
  margin-bottom: 10px;
`;
const PostInput = styled.TextInput`
  color: #fff;
  text-align: ${(props) => (props.colorMode ? "center" : "left")};
  font-size: ${(props) => (props.colorMode ? 23 : 14)}px;
  font-weight: ${(props) => (props.colorMode ? "bold" : 400)};
  padding: 15px 0px;
  line-height: 23px;
`;

const PostPictureWrapper = styled.View`
  position: relative;
`;
const PostPictureCancelButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 25px;
  background: ${darkLighten};
  border-radius: 12.5px;
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
`;
const PostPicture = styled.Image`
  width: 280px;
  height: 157.5px;
  border-radius: 5px;
`;
const ColorPickerWrapper = styled.View`
  flex-direction: row;
  padding: 0 15px;
  justify-content: center;
`;
const ColorPickerItem = styled.TouchableOpacity`
  background: ${(props) => props.bgColor};
  height: 35px;
  width: 35px;
  border-radius: 5px;
  margin-left: 10px;
`;
const ImagePickerButton = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  border-radius: 5px;
  margin-right: 10px;
  justify-content: center;
`;
const TouchableIcon = styled.TouchableOpacity``;

const mapStateToProps = ({ post }) => {
  return {
    post_creating: post.post_creating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (formData) => dispatch(createPost(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);
