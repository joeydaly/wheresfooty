import styled from 'styled-components'

const Section = styled.section`
  display: inline-block;
`

const Photo = styled.input`
  display: none;
`

const PhotoBtn = styled.label`
  display: inline-block;
  position: relative;
  text-transform: uppercase;
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: solid 2px white;
  padding: 5px;
  background: red;
  border-radius: 10px;
`

export {Section, Photo, PhotoBtn}