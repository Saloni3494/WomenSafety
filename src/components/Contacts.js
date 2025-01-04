import React, { useState } from 'react';
import styled from "styled-components";

const Contacts = () => {
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('');  // New state to track form type
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        isSms: false,
        isCall: false,
        message: "", // For the message form
    });

    const [contacts, setContacts] = useState([
        { id: 1, name: "Friend 1", phone: "1234567890", isSms: true, isCall: false, isEditing: false },
        { id: 2, name: "Friend 2", phone: "9876543210", isSms: false, isCall: true, isEditing: false },
    ]);

    const handleInputChange = (e, id) => {
        const { name, value, type, checked } = e.target;
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.id === id
                    ? { ...contact, [name]: type === "checkbox" ? checked : value }
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        setShowForm(false);
    };

    const handleDelete = (id) => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    };

    return (
        <Container>
            <CTA>
                <Description>Emergency Contacts</Description>
                <HeaderImage src="/images/contacts-1.png" alt="Header Image" />
            </CTA>

            <div className="addContact addMessage" onClick={() => { setShowForm(true); setFormType('message'); }}>
                <button type="button" class="btn btn-success">
                    <i className="fa-solid fa-edit"></i>
                    <span className="contactLabel boldTitle">Message</span>
                </button>
            </div>

            <div className="addContact" onClick={() => { setShowForm(true); setFormType('contact'); }}>
                <button type="button" class="btn btn-success">
                    <i className="fa-solid fa-square-plus"></i>
                    <span className="contactLabel boldTitle">Add Contact</span>
                </button>
            </div>

            {showForm && (
                <FormOverlay>
                    <FormContainer>
                        {formType === 'contact' ? (
                            <>
                                <h2>Add Contact</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            required
                                        />
                                    </label>
                                    <label>
                                        Phone Number:
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            required
                                        />
                                    </label>
                                    <div>
                                        <label>
                                            SMS
                                            <input
                                                type="radio"
                                                name="isSms"
                                                checked={formData.isSms}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, isSms: e.target.checked })
                                                }
                                            />
                                        </label>
                                        <label>
                                            Call
                                            <input
                                                type="radio"
                                                name="isCall"
                                                checked={formData.isCall}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, isCall: e.target.checked })
                                                }
                                            />
                                        </label>
                                    </div>
                                    <ButtonWrapper>
                                        <CircleButton type="submit">Save</CircleButton>
                                        <CircleButton type="button" onClick={() => setShowForm(false)}>
                                            Cancel
                                        </CircleButton>
                                    </ButtonWrapper>
                                </form>
                            </>
                        ) : formType === 'message' ? (
                            <>
                                <h2>Message</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <label>
                                        Message:
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            required
                                        />
                                    </label>
                                    <ButtonWrapper>
                                        <CircleButton type="submit">Send</CircleButton>
                                        <CircleButton type="button" onClick={() => setShowForm(false)}>
                                            Cancel
                                        </CircleButton>
                                    </ButtonWrapper>
                                </form>
                            </>
                        ) : null}
                    </FormContainer>
                </FormOverlay>
            )}

            <table>
                <thead>
                    <tr>
                        <th class="centerAlign">#</th>
                        <th>Name /<br/> Number</th>
                        <th class="centerAlign">SMS</th>
                        <th class="centerAlign">Call</th>
                        <th class="centerAlign">Edit</th>
                        <th class="centerAlign">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td><span class="userBlock centerAlign"><i className="fa-solid fa-user"></i></span></td>
                           <td class="boldTitle">
                                {contact.isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={contact.name}
                                        className={contact.isEditing ? "editing" : ""}
                                        onChange={(e) => handleInputChange(e, contact.id)}
                                    />
                                ) : (
                                    contact.name
                                )}

                                <br/>
                                {contact.isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={contact.phone}
                                        className={contact.isEditing ? "editing" : ""}
                                        onChange={(e) => handleInputChange(e, contact.id)}
                                    />
                                ) : (
                                    contact.phone
                                )}
                            </td>
                            <td class="centerAlign">
                                <input
                                    type="checkbox"
                                    name="isSms"
                                    checked={contact.isSms}
                                    disabled={!contact.isEditing}
                                    onChange={(e) => handleInputChange(e, contact.id)}
                                />
                            </td>
                            <td class="centerAlign">
                                <input
                                    type="checkbox"
                                    name="isCall"
                                    checked={contact.isCall}
                                    disabled={!contact.isEditing}
                                    onChange={(e) => handleInputChange(e, contact.id)}
                                />
                            </td>
                            <td class="centerAlign">
                                <i
                                    className={`fa-solid ${contact.isEditing ? "fa-save" : "fa-pen"}`}
                                    onClick={() => toggleEdit(contact.id)}
                                ></i>
                            </td>
                            <td class="centerAlign">
                                <i className="fa-solid fa-trash"
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


const FormOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;

            input {
                width: 60%; /* Adjust the width as needed */
                padding: 8px;
                font-size: 14px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
`;


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

  .addContact {
    float: right;
    color: #C30E59;
    padding: 20px 0 20px 20px;
  }
  .addContact .fa-square-plus, .addContact .fa-edit {
    padding-right: 10px;
    font-size: 30px;
  }
  .addContact .contactLabel {
    line-height: 34px;
    vertical-align: top;
    margin-top: 10px;
  }
    .addMessage {
    float: left;
    padding: 20px 20px 20px 0;
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
    .btn-success {
    background-color: #C30E59;
    border: none;
    }
    .btn-success: hover {
    background-color: #E82561;
    }

  tr:nth-child(even) {
    border-bottom: #C30E59;
  }

  tr:nth-child(odd) {
    border-bottom: #E82561;
  }
  
  input.editing {
    width: 80%; /* Smaller width when editing */
    padding: 5px; /* Adjust padding */
    font-size: 14px; /* Optional: Adjust font size */
    border: 1px solid #c30e59; /* Highlight border */
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
  padding: 40px 40px 5px 40px;
  position: relative;
  overflow: hidden;
`;

const Description = styled.p`
  color: #c30e59;
  font-size: 28px;
  margin: 0 0 24px;
  line-height: 1.5;
  
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
  gap: 10px; /* Space between the buttons */
  justify-content: center;
  margin-top: 20px;
`;

const CircleButton = styled.button`
  width: 150px;
  height: 70px;
  border-radius: 15px;
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

const Number = styled.div`
    background: linear-gradient(135deg,rgb(249, 146, 189), #f9f9f9); /* Gradient background */
    border-radius: 25px; /* Rounded corners */
    padding: 40px; /* Add spacing inside */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Optional shadow for depth */
    position: relative;
    overflow: hidden; /* Ensures content stays within the curved section */
`;

  
export default Contacts;