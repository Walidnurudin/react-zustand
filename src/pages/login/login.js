import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useUser from '../../store/useUser';
import { InputText } from '../../components/input/inputText';

const dataSelect = [
  {
    label: 'label1',
    value: 'value1',
  },
  {
    label: 'label2',
    value: 'value2',
  },
];

function login() {
  const isLogin = useUser((state) => state.isLogin);

  const [showPhoto, setShowPhoto] = useState('');
  const [photo, setPhoto] = useState('');
  const [search, setSearch] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      text: '',
      email: '',
      number: '',
      password: '',
      date: '',
      select: { label: '', value: '' },
      textarea: '',
    },
  });

  const handleSelect = (newValue, actionMeta) => {
    if (actionMeta.action === 'select-option') {
      if (newValue) {
        setValue('select', newValue);
      }
    } else if (actionMeta.action === 'clear') {
      setValue('select', { label: '', value: '' });
    }
  };

  const onSubmit = (data) => {
    console.log({ ...data, photo });
  };

  return (
    <React.Fragment>
      <div>login</div>
      <div>isLogin : {isLogin ? 'yess' : 'no'}</div>

      <InputText
        register={register}
        label='Text'
        name='text'
        errors={errors}
        isReqMsg='Text is required'
        type='text'
        minLength={3}
        minLengthMsg='Text is too short'
      />

      <InputText
        register={register}
        label='Email'
        name='email'
        errors={errors}
        isReqMsg='Email is required'
        type='email'
        patternMsg='Email is not valid'
      />

      <InputText
        register={register}
        label='Number'
        name='number'
        errors={errors}
        isReqMsg='Number is required'
        minLength={6}
        minLengthMsg='Number is too short'
        maxLength={16}
        maxLengthMsg='Number is too long'
        type='number'
      />

      <InputText
        register={register}
        label='Password'
        name='password'
        errors={errors}
        isReqMsg='Password is required'
        type='password'
      />

      <InputText
        register={register}
        label='Date'
        name='date'
        errors={errors}
        isReqMsg='Date is required'
        type='date'
      />

      <InputText
        register={register}
        label='Select'
        name='select.value'
        isReqMsg='Select is required'
        controller={Controller}
        type='select'
        errors={errors}
        dataSelect={dataSelect}
        handleSelect={handleSelect}
        nameParent='select'
        control={control}
        isClearable={true}
      />

      <InputText
        register={register}
        label='Textarea'
        name='textarea'
        errors={errors}
        isReqMsg='Textarea is required'
        type='textarea'
        minLength={10}
        minLengthMsg='Textarea is too short'
      />

      <InputText
        register={register}
        label='Photo'
        name={photo}
        errors={errors}
        isReqMsg='Photo is required'
        type='image'
        showPhoto={showPhoto}
        setShowPhoto={setShowPhoto}
        setPhoto={setPhoto}
      />

      <button onClick={handleSubmit(onSubmit)}>submit</button>
    </React.Fragment>
  );
}

export default login;
