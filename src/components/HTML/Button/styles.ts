import styled from 'styled-components';

import button_background_1 from '@/assets/svg/button_background_1.svg';

export const Container = styled.button`
  background: url(${button_background_1}) no-repeat center;
  background-size: contain;

  padding: 1.6rem;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.035em;
  text-align: center;
`;