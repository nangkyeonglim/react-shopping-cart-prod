import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.secondary};
  margin-bottom: 20px;
  padding: 16px 30px;
`;

export const Text = styled.div`
  padding-right: 24px;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

export const CouponWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

export const PointWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding-right: 20px;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  flex: 1;
  text-align: end;
  padding: 8px 15px 9px;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  border-radius: 4px;
`;

export const AllPointButton = styled.button`
  flex: 0 0 80px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.light};
`;

export const UserPoint = styled.p`
  padding: 4px 0 0 56px;
  font-size: 12px;
`;