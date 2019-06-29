import styled from 'styled-components'

const Photo = styled.input`
  display: none;
`

const PhotoBtn = styled.label`
  display: inline-block;
  position: relative;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: solid 2px white;
  padding: 5px;
  background: red;
  border-radius: 10px;
`

export {Photo, PhotoBtn}