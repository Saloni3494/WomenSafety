import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  return (
    <Container>
      <CTA>
        <Description>Welcome to</Description>
        <SignUp>Empower Shield</SignUp>
        <HeaderImage src="/images/Home-1.png" alt="Header Image" /><br/>
        <Description>Facing Some Issue? Want Help?</Description>
        <ButtonWrapper>
          <CircleButton>SMS</CircleButton>
          <CircleButton>CALL</CircleButton>
        </ButtonWrapper>
      </CTA>
      <br/><br/>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const CTA = styled.div`
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  align-items: center;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  transition-timing-function: ease-out;
  transition: opacity 0.2s;
  width: 100%;
  padding: 40px;
  position: relative;
  overflow: hidden;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: rgb(249, 58, 138);
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 30px;
  padding: 16.5px 10px;
  border: 1px solid transparent;
  border-radius: 20px;

  &:hover {
    background-color: rgba(231, 6, 100, 0.61);
  }
`;

const Description = styled.p`
  color: #c30e59;
  font-size: 28px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  font-weight: bold;
`;

const HeaderImage = styled.img`
  max-width: 400px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px; /* Space between the buttons */
  justify-content: center;
  margin-top: 20px;
`;

const CircleButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(249, 58, 138);
  color: white;
  font-size: 22px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(231, 6, 100, 0.61);
  }
`;

export default Home;
