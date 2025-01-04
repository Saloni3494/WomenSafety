import React, { useState } from 'react';
import styled from "styled-components";

const CustomMessage = () => {
    const [contacts, setContacts] = useState([
        { id: 1, message: "Hello, Friend 1!", active: true, isEditing: false },
        { id: 2, message: "Hi, Friend 2!", active: false, isEditing: false },
    ]);
    
    // State for toggle switch
    const [isLiveCoordinates, setIsLiveCoordinates] = useState(false);

    const handleInputChange = (e, id) => {
        const { name, value, type, checked } = e.target;
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.id === id
                    ? { ...contact, [name]: type === "checkbox" || type === "radio" ? checked : value }
                    : contact
            )
        );
    };

    const toggleEdit = (id) => {
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.id === id ? { ...contact, isEditing: !contact.isEditing } : contact
            )
        );
    };

    const handleDelete = (id) => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    };

    // Toggle function for live coordinates
    const handleLiveCoordinatesToggle = () => {
        setIsLiveCoordinates((prev) => !prev);
    };

    return (
        <Container>
            <CTA>
                <Description>Custom Message</Description>
            </CTA>

            {/* Label and Toggle for Live Coordinates */}
            <LiveCoordinatesWrapper>
                <label>Send Live Coordinates</label>
                <ToggleSwitch>
                    <input
                        type="checkbox"
                        checked={isLiveCoordinates}
                        onChange={handleLiveCoordinatesToggle}
                    />
                    <span className="slider"></span>
                </ToggleSwitch>
            </LiveCoordinatesWrapper>

            <table>
                <thead>
                    <tr>
                        <th className="centerAlign">#</th>
                        <th>Message</th>
                        <th className="centerAlign">Active</th>
                        <th className="centerAlign">Edit</th>
                        <th className="centerAlign">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td className="centerAlign">
                                <span className="userBlock centerAlign">
                                    <i className="fa-solid fa-user"></i>
                                </span>
                            </td>
                            <td className="boldTitle">
                                {contact.isEditing ? (
                                    <input
                                        type="text"
                                        name="message"
                                        value={contact.message}
                                        className={contact.isEditing ? "editing" : ""}
                                        onChange={(e) => handleInputChange(e, contact.id)}
                                    />
                                ) : (
                                    contact.message
                                )}
                            </td>
                            <td className="centerAlign">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={contact.active}
                                    disabled={!contact.isEditing}
                                    onChange={(e) => handleInputChange(e, contact.id)}
                                />
                            </td>
                            <td className="centerAlign">
                                <i
                                    className={`fa-solid ${contact.isEditing ? "fa-save" : "fa-pen"}`}
                                    onClick={() => toggleEdit(contact.id)}
                                ></i>
                            </td>
                            <td className="centerAlign">
                                <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handleDelete(contact.id)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
};

// Styles for the new toggle feature
const LiveCoordinatesWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  color: #C30E59;

  label {
    font-weight: bold;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  input:checked + .slider {
    background-color: #C30E59;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const Container = styled.main`
  /* Styles remain unchanged */
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

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border-bottom: 1px solid #ffffff;
    text-align: left;
    padding: 8px;
    color: #C30E59;
  }
  th {
    color: #FFFFFF;
    background-color: #C30E59;
    font-variant: uppercase;
  }

  .centerAlign {
    text-align: center;
  }
.boldTitle {
    font-weight: bold;
}
`;

const CTA = styled.div`
  /* Styles remain unchanged */
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
  padding: 40px 40px 5px 40px;
  position: relative;
  overflow: hidden;
`;

const Description = styled.p`
  /* Styles remain unchanged */
  color: #c30e59;
  font-size: 28px;
  margin: 0 0 24px;
  line-height: 1.5;
  font-weight: bold;
`;

export default CustomMessage;
