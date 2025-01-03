import styled from "styled-components";

const Login = (props) => {
    return (
        <Container>
            <Content>
                <CTA>
                    {/* Image added here */}
                    <HeaderImage src="/images/landing.png" alt="Header Image" />
                    <br/>
                    <Description>
                        Welcome to
                    </Description>
                    <SignUp>Empower Shield</SignUp>
                </CTA>
                <BgImage />
            </Content>
        </Container>
    );
};

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

const Content = styled.div`
    margin-bottom: 10vm;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 25px;
    height: 100%;
`;

const BgImage = styled.div`
    height: 100%;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/images/home-background.png");
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
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
    background: linear-gradient(135deg, #C30E59, #f9f9f9); /* Gradient background */
    border-radius: 30px; /* Rounded corners */
    padding: 40px; /* Add spacing inside */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Optional shadow for depth */
    position: relative;
    overflow: hidden; /* Ensures content stays within the curved section */
`;


const HeaderImage = styled.img`
    max-width: 400px; /* Increased size */
    width: 100%; /* Ensures responsiveness */
    height: auto; /* Maintains aspect ratio */
    margin-bottom: 20px; /* Add spacing below the image */
    display: block; /* Centers the image */
`;

const SignUp = styled.a`
    font-weight: bold;
    color: #f9f9f9;
    background-color:rgb(249, 58, 138);
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
    color: #C30E59;
    font-size: 28px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
    font-weight: bold; /* Added for boldness */
`;

export default Login;
