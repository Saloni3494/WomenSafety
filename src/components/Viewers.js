import styled from "styled-components";

const Viewers = (props) => {
  return (
    <Container>
       <h5> The "Empower Shield" android application is designed to address 
      the safety concerns faced by women in various situations such as 
      harassment or threats. </h5>
      <h3>Features We Provide:</h3>
      {/* <li>Emergency Call Function</li>
      <li>Emergency SMS with Live Coordinates</li> */}
      <Wrap>
        <img src="/images/viewers-1.jpg" alt="" />
      </Wrap>
      <Wrap>
        <img src="/images/viewers-2.jpg" alt="" />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  text-align: center; /* Centers the h3 element */

  h5, li {
    color: #C30E59;
  }

  h3 {
    font-size: 1.5rem; /* Increase font size */
    color:rgb(122, 2, 52); /* Change color to black */
    
    text-transform: uppercase; /* Optional: make text uppercase for emphasis */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;


const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
        opacity:1;
    }
  }
`;



export default Viewers;
