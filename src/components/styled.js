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
const noteColor = note => {
  if (note.muted) return neutralBg;
  const hue = note.degree;
  const saturation = note.isActive ? 50 : 30;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const StyledNote = styled.div`
  border-right: 1px solid #ccc;
  width: 60px;
  text-align: center;
  font-size: 1.3em;
  background-color: ${noteColor};
`;

export const StyledTheramin = styled.div`
  display: flex;
  width: 100%;
  height: 7vh;
`;
