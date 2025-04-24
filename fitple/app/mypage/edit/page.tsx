'use client';

import styles from './edit.module.scss';
import Label from '@/components/Input/Label';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import Button from '@/components/Button/Button';
import SkillSelectBox from '@/components/SkillSelectBox/SkillSelectBox';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { SkillDto } from '@/back/skill/application/usecases/dto/SkillDto';

const EditInfoPage = () => {
  const userNickname = useAuthStore((state) => state.nickname);
  const userCareer = useAuthStore((state) => state.career);
  const userPosition = useAuthStore((state) => state.position);

  const [nickname, setNickname] = useState(userNickname || '');
  const [career, setCareer] = useState<number | ''>(userCareer ?? '');
  const [position, setPosition] = useState<string>(userPosition || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [bottomText, setBottomText] = useState('닉네임을 입력해주세요');
  const [error, setError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [skillOptions, setSkillOptions] = useState<string[]>([]);
  const [isSkillOpen, setIsSkillOpen] = useState(false); // 기술스택 토글 상태

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skills');
        const skills: SkillDto[] = await res.json();
        setSkillOptions(skills.map((s) => s.skillName));
      } catch (e) {
        console.error('기술스택 불러오기 실패', e);
      }
    };
    fetchSkills();
  }, []);

  const handleCareerChange = (value: number) => {
    setCareer(value);
  };

  const handlePositionChange = (value: string) => {
    setPosition(value);
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      setBottomText('닉네임을 입력해주세요.');
      setError(true);
      setIsCompleted(false);
      return;
    }

    try {
      const response = await fetch('/api/namecheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      if (!response.ok) throw new Error('서버 오류');

      const data = await response.json();

      if (data.exists) {
        setBottomText('이미 존재하는 닉네임입니다.');
        setError(true);
        setIsCompleted(false);
      } else {
        setBottomText('사용 가능한 닉네임입니다.');
        setError(false);
        setIsCompleted(true);
      }
    } catch (e) {
      setBottomText('서버 오류가 발생했습니다.');
      setError(true);
      setIsCompleted(false);
    }
  };

  return (
    <div className={styles.myInfoContainer}>
      <div className={styles.imageBox}></div>
      <div className={styles.editForm}>
        <form>
          <div className={styles.formGroup}>
            <Label
              label="닉네임"
              direction="row"
              bottomText={bottomText}
              hasError={error}
            >
              <Input
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                renderRight={
                  <Button size="sm" onClick={handleNicknameCheck}>
                    중복 확인
                  </Button>
                }
              />
            </Label>
          </div>

          <div className={styles.formGroup}>
            <Label label="경력" />
            <Select
              onChange={(value) => handleCareerChange(Number(value))}
              value={career}
              placeholder="경력을 선택해주세요"
              options={careerOptions}
            >
              {careerOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.formGroup}>
            <Label label="직무" />
            <Select
              onChange={(value) => handlePositionChange(value)}
              value={position}
              placeholder="직무를 선택해주세요"
              options={positionOptions}
            >
              {positionOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.formGroup} style={{ position: 'relative' }}>
            <Label
              label="기술스택"
              onClick={() => setIsSkillOpen((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            />
              <div className={styles.skillDropdown}>
                <SkillSelectBox
                  options={skillOptions}
                  handler={setSelectedSkills}
                />
              </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelButton}>
              취소
            </button>
            <button type="submit" className={styles.submitButton}>
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfoPage;

// 셀렉트 옵션 정의
const careerOptions = Array.from({ length: 6 }, (_, i) => ({
  value: i,
  label: i === 0 ? '신입' : `${i}년차`,
}));

const positionOptions = [
  { value: '프론트엔드', label: '프론트엔드' },
  { value: '백엔드', label: '백엔드' },
  { value: 'UI/UX 디자이너', label: 'UI/UX 디자이너' },
  { value: 'PM', label: 'PM' },
  { value: '기획자', label: '기획자' },
];
