import React from 'react';
import { TextInput } from 'react-native';

interface ITextareaProps {
  text: string;
  onChangeText: any;
  placeholder: string;
}

const Textarea: React.FC<ITextareaProps> = ({ text, onChangeText, placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      multiline={true}
      onChangeText={onChangeText}
      style={{ height: '85%', textAlignVertical: 'top' }}
      className='font-rethink text-xl'
      value={text}/>
  );
}

export default Textarea;
