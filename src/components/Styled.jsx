import styled, {css} from 'styled-components'


export const FlexContainer = styled.div`
  display: flex;
`


export const ProductCard = styled(FlexContainer)`
  width: 100%;
`
export const ColumnDir = styled(FlexContainer)`
  flex-direction: column;
`
export const IMG = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
`

export const NameDesc = styled(ColumnDir)`
  flex: 1;
  align-items: start;
  text-align: left;
`
export const GridContainer = styled.div`
  display: grid;
`

export const FlexColumnContainer = styled(FlexContainer)`
  flex-direction: column;
`

export const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 4rem;
  background: transparent;
  color: white;
  font-weight: bold;
  border: 2px solid white;

  ${props => props.primary && css`
    background: white;
    color: lightskyblue;

    :hover {
      background: lightskyblue;
      color: white;
      cursor: pointer;
    }
  `}
  ${props => props.secondary && css`
    background: white;
    color: palevioletred;

    :hover {
      cursor: pointer;
      background: palevioletred;
      color: white;
    }
  `}
`
export const Img = styled.img`
  object-fit: contain;
  width: 10rem;
  height: auto;
  margin-right: 2rem;
  // display: inline-block;
`