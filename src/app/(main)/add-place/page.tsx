'use client';

import * as s from './page.css';

import {
  FormField,
  HStack,
  Input,
  spacingVars,
  StackJustify,
  VStack,
} from '@tapie-kr/inspire-react';
import { useEffect, useState } from 'react';

type Place = {
  name: string;
  tags: string[];
};

export default function AddPlacePage() {
  const [placeName, setPlaceName] = useState('');
  const [data, setData] = useState<Place[]>([]);
  const [searchedData, setSearchedData] = useState<Place[]>([]);

  useEffect(() => {
    fetch('/data/_data.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    if (placeName === '') {
      setSearchedData([]);
      return;
    }

    setSearchedData(
      data.filter((item) => {
        return item.name.includes(placeName) || item.tags.includes(placeName);
      }),
    );
  }, [placeName]);

  return (
    <VStack
      fullWidth
      fullHeight
      className={s.base}
      spacing={spacingVars.petite}>
      <FormField label={'장소 이름 검색'}>
        <Input.Text
          placeholder={'장소 이름'}
          onChange={(e) => {
            setPlaceName(e.target.value);
          }}
        />
      </FormField>
      <VStack
        fullWidth
        fullHeight
        justify={StackJustify.START}
        spacing={spacingVars.micro}>
        {searchedData.map((item) => {
          return (
            <HStack
              key={item.name}
              fullWidth
              justify={StackJustify.START}
              className={s.searchResult}>
              {item.name}
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
