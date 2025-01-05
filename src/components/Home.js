import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const [contact, setContact] = useState(null);
  const [smsMessage, setSmsMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLiveCoordinates, setIsLiveCoordinates] = useState(() => {
    const storedValue = localStorage.getItem('isLiveCoordinates');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    fetchContactToCall();
    fetchActiveMessage();
    if (isLiveCoordinates) {
      fetchLocation();
    }
  }, [isLiveCoordinates]);

  const fetchContactToCall = async () => {
    try {
      const response = await fetch("http://localhost:5000/contacts");
      const data = await response.json();
      const callContact = data.find(contact => contact.isCall === 1);
      setContact(callContact);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  const fetchActiveMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/customMessage");
      const data = await response.json();
      const activeMessage = data.find(message => message.isActive === 1);
      setSmsMessage(activeMessage ? activeMessage.message : null);
    } catch (error) {
      console.error("Error fetching active message:", error.message);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = await getLocationFromCoordinates(latitude, longitude);
          setLocation(location);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getLocationFromCoordinates = async (latitude, longitude) => {
    const apiKey = ''; // Replace with your actual API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted;
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error("Error fetching location:", error.message);
      return 'Location not available';
    }
  };

  const handleCall = () => {
    if (contact) {
      const phoneNumber = contact.phone;
      console.log(`Making a call to ${phoneNumber}`);
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.error("No contact found to call.");
    }
  };

  const handleSms = async () => {
    if (smsMessage) {
      try {
        const response = await fetch("http://localhost:5000/contacts");
        const contacts = await response.json();
        const smsContacts = contacts.filter(contact => contact.isSms === 1);

        if (smsContacts.length > 0) {
          const phoneNumbers = smsContacts.map(contact => contact.phone).join(",");
          const encodedMessage = isLiveCoordinates && location
            ? `${smsMessage} Location: ${location}`
            : smsMessage;
          const smsLink = `sms:${phoneNumbers}?body=${encodeURIComponent(encodedMessage)}`;

          console.log(`Sending SMS to ${phoneNumbers}: ${encodedMessage}`);
          window.location.href = smsLink;
        } else {
          console.error("No contacts available to send SMS.");
        }
      } catch (error) {
        console.error("Error sending SMS:", error.message);
      }
    } else {
      console.error("No active message found to send.");
    }
  };

  return (
    <Container>
      <CTA>
        <Description>Welcome to</Description>
        <SignUp>Empower Shield</SignUp>
        <HeaderImage src="/images/Home-1.png" alt="Header Image" /><br/>
        <Description>Facing Some Issue? Want Help?</Description>
        <ButtonWrapper>
          <CircleButton onClick={handleSms}>SMS</CircleButton>
          <CircleButton onClick={handleCall}>CALL</CircleButton>
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
