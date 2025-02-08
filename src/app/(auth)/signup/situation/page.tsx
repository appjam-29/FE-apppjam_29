'use client';

import { Sound, useMagic } from '@/stores/useMagic';
import {
  GlyphIcon,
  Icon,
  IconName,
  Label,
  LabelSize,
  Typo,
  Weight,
} from '@tapie-kr/inspire-react';
import * as s from './style.css';

export default function SignupPurposePage() {
  const { sound, setSound } = useMagic((state) => state);

  const purposes: { id: Sound; icon: IconName; text: string; desc: string }[] =
    [
      {
        id: 'silent',
        icon: GlyphIcon.BLOCK,
        text: '무소음',
        desc: '아무 소리 나지 않는 조용한 공간이에요.',
      },
      {
        id: 'calm',
        icon: GlyphIcon.SCHEDULE,
        text: '잔잔한',
        desc: '클래식과 같은 잔잔한 음악을 들을 수 있는 공간이에요.',
      },
      {
        id: 'white',
        icon: GlyphIcon.LIGHT_MODE,
        text: '백색 소음',
        desc: '일상의 소음을 들으며 Chill해질 수 있는 공간이에요.',
      },
      {
        id: 'noisy',
        icon: GlyphIcon.NOTIFICATIONS,
        text: '시끄러운',
        desc: '사람들의 대화를 같이 들을 수 있는 곳이에요.',
      },
    ];

  const selectedPurposeDesc = purposes.find(
    (purpose) => purpose.id === sound,
  )?.desc;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Icon name={GlyphIcon.ARROW_BACK} />
        <Typo.Micro className={s.headerText}>회원가입</Typo.Micro>
      </div>
      <div className={s.title}>
        <div className={s.order}>2/2</div>
        <Typo.Moderate weight={Weight.SEMIBOLD} className={s.titleText}>
          {'어떤 소음에서\n집중이 잘되시나요?'}
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
                sound === purpose.id ? s.purposeSelected : ''
              }`}
              onClick={() => setSound(purpose.id)}>
              <Icon name={purpose.icon} />
              <Typo.Petite>{purpose.text}</Typo.Petite>
            </div>
          ))}
        </div>
        {sound && <Typo.Petite>{selectedPurposeDesc}</Typo.Petite>}
      </div>
    </div>
  );
}
