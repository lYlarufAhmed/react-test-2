import styled from 'styled-components'


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
`