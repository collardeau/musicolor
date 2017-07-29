import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Select = styled.select`
  width: 200px;
  height: 40px;
`;

export const StyledNote = styled.div`
  position: relative;
  border-right: 1px solid #ccc;
  width: 60px;
  text-align: center;
  background-color: ${props => props.color};
  border-radius: 5px;
`;

export const StyledTheramin = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
`;
