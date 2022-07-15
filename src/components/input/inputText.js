import React, { useRef, useState } from 'react';
import Select from 'react-select';

// TEXT, EMAIL, NUMBER, PASSWORD, DATE, SELECT, TEXTAREA, SEARCH, IMAGE
const InputText = ({
  register,
  label,
  name,

  // validation
  errors,
  isReqMsg,

  // length,
  minLength,
  minLengthMsg,
  maxLength,
  maxLengthMsg,

  // pattern,
  pattern,
  patternMsg,

  // type
  type,

  // if type is SELECT, then use this
  controller: Controller,
  dataSelect,
  handleSelect,
  nameParent,
  control,
  isClearable,

  // if type is SEARCH, then use this
  placeholder,
  setSearch, //state
  setCurrentPage,
  refetch,

  // if type is IMAGE, then use this
  showPhoto, // state
  setShowPhoto, // state
  setPhoto, // state
}) => {
  const [isPassword, setIsPassword] = useState(true);
  const inputRef = useRef(null);

  // for search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      refetch();
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file.size > 1048576) {
      Swal('Ukuran file terlalu besar, maksimal 1MB', '', 'error');
    } else if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg'
    ) {
      Swal(
        'File format tidak sesuai, format yang diterima harus jpg, jpeg, png',
        '',
        'error'
      );
    } else if (file) {
      getBase64(file).then((data) => {
        setShowPhoto(URL.createObjectURL(file));
        setPhoto(data);
      });
    }
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}</label>
      <label style={{ color: 'red', marginLeft: '5px' }}>
        {isReqMsg ? '*' : ''}
      </label>

      {type === 'text' ||
      type === 'email' ||
      type === 'number' ||
      type === 'password' ||
      type === 'date' ? (
        <div>
          <input
            {...register(name, {
              required: isReqMsg,
              minLength: {
                value: minLength,
                message: minLengthMsg,
              },
              maxLength: {
                value: maxLength,
                message: maxLengthMsg,
              },
              pattern: {
                value:
                  type === 'email'
                    ? /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    : pattern,
                message: patternMsg,
              },
            })}
            type={
              isPassword && type === 'password'
                ? 'password'
                : type === 'date'
                ? 'date'
                : 'text'
            }
            onKeyPress={
              type === 'number'
                ? (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                : null
            }
            onKeyDown={type === 'date' ? (e) => e.preventDefault() : null}
          />

          {type === 'password' && (
            <button onClick={() => setIsPassword(!isPassword)}>
              {isPassword ? '+' : '-'}
            </button>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* IF TYPE SEARCH */}
      {type === 'search' && (
        <input
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          onChange={handleSearch}
        />
      )}

      {/* IF TYPE TEXTAREA */}
      {type === 'textarea' && (
        <textarea
          {...register(name, {
            required: isReqMsg,
            minLength: {
              value: minLength,
              message: minLengthMsg,
            },
            maxLength: {
              value: maxLength,
              message: maxLengthMsg,
            },
          })}
        />
      )}

      {/* IF TYPE SELECT */}
      {type === 'select' && (
        <Controller
          render={({ field }) => (
            <Select
              {...register(name, {
                required: isReqMsg,
              })}
              {...field}
              options={dataSelect}
              onChange={handleSelect}
              isClearable={isClearable}
            />
          )}
          name={nameParent}
          control={control}
        />
      )}

      {/* IF TYPE IMAGE */}
      {type === 'image' && (
        <>
          <img
            src={
              showPhoto
                ? showPhoto
                : 'http://repo.lyrid.id:9500/uploads/-/system/appearance/header_logo/1/favicon.png'
            }
            width='300px'
            onClick={() => inputRef.current.click()}
            style={{ cursor: 'pointer' }}
          />
          <input
            ref={inputRef}
            type='file'
            style={{ display: 'none' }}
            onChange={handleFile}
          />
        </>
      )}

      {/* MSG ERRORS */}
      {type === 'select' ? (
        <p style={{ color: 'red', margin: 0 }}>
          {errors[nameParent]?.value && errors[nameParent]?.value?.message}
        </p>
      ) : (
        <p style={{ color: 'red', margin: 0 }}>
          {errors[name] && errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export { InputText };
