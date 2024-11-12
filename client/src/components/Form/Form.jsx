import React, { useEffect, useState, useCallback } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    };
    tg.SendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Send data'
    });
  }, [tg]);

  useEffect(() => {
    if (!street || !country || !subject) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, subject, tg]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Enter your data</h3>
      <input
        className={'input'}
        type="text"
        placeholder={'country'}
        value={country}
        onChange={onChangeCountry}
        required
      />
      <input
        className={'input'}
        type="text"
        placeholder={'street'}
        value={street}
        onChange={onChangeStreet}
        required
      />
      <select
        value={subject}
        onChange={onChangeSubject}
        className={'select'}
        required
      >
        <option value={'physical'}>Private</option>
        <option value={'legal'}>Business</option>
      </select>
    </div>
  );
};

export default Form;
