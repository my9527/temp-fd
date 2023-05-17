import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAddUserToken } from '../state/user/hooks'
import { CommonBaseTokens } from '../constants'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state'
import { selectList } from '../state/lists/actions'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  padding: 1rem;
  border: 2px solid rgba(0,0,0,0.12);
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...props }: { children: React.ReactNode }) {

  const addToken = useAddUserToken()
  const dispatch = useDispatch<AppDispatch>()

  // 配置默认token， 配置list
  useEffect(() => {
    // addToken(FILEDOGEH);
    // addToken(FILEDOGE);
    // addToken(FLD);
    // addToken(FILDAO);
    CommonBaseTokens.forEach(tk => {
      addToken(tk);
    })
    // addToken(FSB);
    dispatch(selectList(`${window.location.origin}/tokens/list.json`));
  }, []);


  return <BodyWrapper {...props}>{children}</BodyWrapper>
}
