'use client';

import { api } from '@/api/base';
import { Mode, useMagic } from '@/stores/useMagic';
import {
  GlyphIcon,
  Icon,
  IconName,
  Label,
  LabelSize,
  Typo,
  Weight,
} from '@tapie-kr/inspire-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as s from './style.css';

export default function SignupPurposePage() {
  const { mode, setMode } = useMagic((state) => state);

  const purposes: { id: Mode; icon: IconName; text: string }[] = [
    { id: 'work', icon: GlyphIcon.DESCRIPTION, text: '작업' },
    { id: 'rest', icon: GlyphIcon.SCHEDULE, text: '휴식' },
    { id: 'change-ambiance', icon: GlyphIcon.SYNC, text: '분위기 전환' },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');

  useEffect(() => {
    api(false)
      .post('/auth/login', { code })
      .then((res) => {
        localStorage.setItem('token', res.data.data.access_token);

        if (!res.data.data.new_register) {
          router.push('/');
        }
      });
  }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Icon name={GlyphIcon.ARROW_BACK} />
        <Typo.Micro className={s.headerText}>회원가입</Typo.Micro>
      </div>
      <div className={s.title}>
        <div className={s.order}>1/2</div>
        <Typo.Moderate weight={Weight.SEMIBOLD} className={s.titleText}>
          {'공간을 찾는 목적이 \n주로 무엇인가요?'}
        </Typo.Moderate>
      </div>
      <div className={s.purposeBox}>
        <div className={s.purposeText}>
          <Typo.Petite>목적</Typo.Petite>
          <Label isEssential size={LabelSize.LARGE} />
        </div>
        <div className={s.purposes}>
          {purposes.map((purpose) => (
            <div
              key={purpose.id}
              className={`${s.purpose} ${
                mode === purpose.id ? s.purposeSelected : ''
              }`}
              onClick={() => setMode(purpose.id)}>
              <Icon name={purpose.icon} />
              <Typo.Petite>{purpose.text}</Typo.Petite>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
