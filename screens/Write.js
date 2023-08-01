import React, { useState } from "react";
import styled from 'styled-components/native';
import colors from "../colors";
import { Alert } from "react-native";
import { useDB } from "../context";

const View = styled.View`
    background-color: ${colors.bgColor};
    flex: 1;
    padding: 0 30px;
`;
const Title = styled.Text`
    color: ${colors.textColor};
    margin: 50px 0;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
`;

const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 18px;
`

const Btn = styled.TouchableOpacity`
    width: 100%;
    margin-top: 30px;
    background-color: ${colors.btnColor};
    padding: 10px 20px;
    align-items: center;
    border-radius: 20px;
`;
const BtnText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`;
const Emotions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity`
    background-color: white;
    elevation: 5;
    padding: 10px 5px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ selected }) => selected ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
`;

const EmotionText = styled.Text`
    font-size: 24px;
`;

const emotions = ["🤯", "🥲", "🤬", "🤗", "🥰", "😊", "🤩"];

const Write = ({navigation: {goBack}}) => {
    const realm = useDB();
    const [selectedEmotion, setEmotion] = useState(null);
    const [feelings, setFeelings] = useState("");
    const onChangeText = (text) => setFeelings(text);
    const onEmotionPress = (face) => setEmotion(face);
    const onSubmit = () => {
        if(feelings === "" || selectedEmotion == null) {
            return Alert.alert("Please complete form.")
        }
        realm.write(() => {
            realm.create('Feeling', {
                _id: Date.now(),
                emotion: selectedEmotion,
                message: feelings
            })
        })
        goBack();
    }
    return (
        <View>
            <Title>How do you feel today?</Title>
            <Emotions>
                {emotions.map((emotion, index) => <Emotion selected={emotion === selectedEmotion} onPress={() => onEmotionPress(emotion)} key={index}><EmotionText>{emotion}</EmotionText></Emotion>)}
            </Emotions>
            <TextInput returnKeyLabel="done" onSubmitEditing={onSubmit} onChangeText={onChangeText} value={feelings} placeholder="Write your feelings..." />
            <Btn onPress={onSubmit}><BtnText>Save</BtnText></Btn>
        </View>

    )
}
export default Write;