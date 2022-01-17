import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  max-height: 42rem;
  overflow: auto;

  margin-top: 16px;
  padding: 0 16px 16px;

  @media(min-width: 1024px) {
    max-height: 96rem;
  }
`;

export const Content = styled.section`
  
  @media(min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 64px;
  }

  @media(min-width: 1400px) {
    padding: 0 64px;
    margin-top: 108px;
  }
`;

export const Card = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:not(:first-child) {
    margin-top: 24px;
  }
  
  .stock {
    text-align: center;

    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.035em;

    color: ${COLORS.colors.primary_0};

    margin-top: 8px;
  }

  @media(min-width: 768px) {
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`;

export const CardContainer = styled.div`
  border: 1px solid ${COLORS.colors.primary_0};
  background: #062043;
  
  .card_title {
    width: 100%;
    border-bottom: 1px solid ${COLORS.colors.primary_0};

    padding: 8px;

    font-size: 13px;
    font-weight: 700;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const CardContent = styled.div`
  padding: 12px;

  img {
    height: 200px;
    width: 100%;

    object-fit: contain;
  }
`;