import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Select = styled.select`
  width: 300px;
  height: 50px;
`;

const neutralBg = 'hsl(0, 0%, 70%)';

export const StyledNote = styled.div`
  border-right: 1px solid #ccc;
  width: ${1 / 12 * 100}%;
  text-align: center;
  font-size: 1.3em;
  background-color: ${props =>
    props.muted ? neutralBg : `hsl(${props.degree}, ${props.isActive ? 50 : 30}%, 50%)`};
`;

export const StyledTheramin = styled.div`
  display: flex;
  width: 100%;
  height: 7vh;
`;
