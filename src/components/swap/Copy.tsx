import React from 'react';
import styled from 'styled-components';
import useCopyClipboard from '../../hooks/useCopyClipboard'
import CopySvg from '../../assets/svg/copy.svg';

const CopyWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CopyImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  cursor: pointer;
`;

interface CopyProps {
  children: React.ReactNode;
  toCopy: string | number;
  onCopy?: (data: boolean) => void;
}

export default function Copy({ children, toCopy, onCopy }: CopyProps) {
  const [isCopied, setCopied] = useCopyClipboard()

  const handleClick = () => {
    setCopied(toCopy as string); 
    onCopy?.(isCopied);
  }

  return (
    <CopyWrapper onClick={handleClick}>
      {children}
      <CopyImg src={CopySvg} />
    </CopyWrapper>
  );
}