import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

const CustomMessage = () => {
    const [customMessage, setcustomMessage] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [formData, setFormData] = useState({
        message: "",
        isActive: false,
    });

    // State for toggle switch
    const [isLiveCoordinates, setIsLiveCoordinates] = useState(() => {
        // Retrieve the stored value from localStorage, default to false if not found
        return JSON.parse(localStorage.getItem('isLiveCoordinates')) || false;
    });

    useEffect(() => {
        // Fetch custom messages from the backend when the component is mounted
        fetch("http://localhost:5000/customMessage")
            .then((response) => response.json())
            .then((data) => {
                // Map over the data to ensure active is a boolean
                const formattedData = data.map(customMessage => ({
                    ...customMessage,
                    active: customMessage.active === "true" || customMessage.active === true, // Convert to boolean
                }));
                setcustomMessage(formattedData);  // Set the fetched data in the state
            })
            .catch((error) => console.error("Error fetching custom messages:", error));
    }, []);  // Empty dependency array means it runs once when the component is mounted

    const handleInputChange = (e, id) => {
        const { name, value, type, checked } = e.target;
        setcustomMessage((prevcustomMessage) =>
            prevcustomMessage.map((customMessage) =>
                customMessage.id === id
                    ? { 
                        ...customMessage, 
                        [name]: type === "checkbox" || type === "radio" ? checked : value
                    }
                    : customMessage
            )
        );
    };

    const toggleEdit = (id) => {
        setcustomMessage((prevcustomMessage) =>
            prevcustomMessage.map((customMessage) =>
                customMessage.id === id ? { ...customMessage, isEditing: !customMessage.isEditing } : customMessage
            )
        );
    };

    const handleSave = async (customMessage) => {
        try {
            const { id, message, isActive } = customMessage;
            
            console.log("Sending PUT request with data:", { message, isActive });
    
            const response = await axios.put(`http://localhost:5000/customMessage/${id}`, {
                message,
                isActive
            });
    
            if (response.status === 200) {
                setAlertMessage("Custom Message updated Successfully!");
                setAlertVisible(true);
                setcustomMessage((prevcustomMessage) =>
                    prevcustomMessage.map((messageItem) =>
                        messageItem.id === id
                            ? { ...messageItem, isEditing: false, message, isActive }
                            : messageItem
                    )
                );
            } else {
                alert("Error updating message.");
            }
        } catch (error) {
            console.error("Failed to update message:", error);
            alert("Error updating message.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/customMessage/${id}`);
            setcustomMessage((prevcustomMessage) => prevcustomMessage.filter((customMessage) => customMessage.id !== id));
            setAlertMessage("Custom Message deleted Successfully!");
            setAlertVisible(true);
        } catch (error) {
            console.error("Failed to delete Message:", error);
        }
    };

    const handleFormInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/add-message", formData);
            
                setAlertMessage("Custom Message added Successfully!");
                setAlertVisible(true);
                setcustomMessage((prevcustomMessage) => [...prevcustomMessage, response.data]);
                setShowForm(false);  // Close the form after successful submission
                setFormData({ message: "", isActive: false });  // Clear the form data
           
        } catch (error) {
            console.error("Failed to add message:", error);
            alert("Error adding message.");
        }
    };

    // Toggle function for live coordinates
    const handleLiveCoordinatesToggle = () => {
        setIsLiveCoordinates((prev) => {
            const newState = !prev;
            // Store the new state in localStorage
            localStorage.setItem('isLiveCoordinates', JSON.stringify(newState));
            return newState;
        });
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

            {alertVisible && (
                <Alert variant="danger" onClose={() => setAlertVisible(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>{alertMessage}</p>
                </Alert>
            )}

            {/* Button to open the form */}
            
                <AddButton onClick={() => setShowForm(true)}> Add New Message</AddButton>
           

            {/* Popup Form */}
            {showForm && (
                <FormWrapper>
                    <h2>Add New Message</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Message:
                            <input
                                type="text"
                                name="message"
                                value={formData.message}
                                onChange={handleFormInputChange}
                                required
                            />
                        </label>
                        <label>
                            Active:
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleFormInputChange}
                            />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </FormWrapper>
            )}

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
                    {customMessage.map((customMessage) => (
                        <tr key={customMessage.id}>
                            <td className="centerAlign">
                                <span className="userBlock centerAlign">
                                    <i className="fa-solid fa-user"></i>
                                </span>
                            </td>
                            <td className="boldTitle">
                                {customMessage.isEditing ? (
                                    <input
                                        type="text"
                                        name="message"
                                        value={customMessage.message}
                                        className={customMessage.isEditing ? "editing" : ""}
                                        onChange={(e) => handleInputChange(e, customMessage.id)}
                                    />
                                ) : (
                                    customMessage.message
                                )}
                            </td>
                            <td className="centerAlign">
                                <input
                                    type="radio"
                                    name="isActive"
                                    checked={customMessage.isActive}  // This will now work as `active` is a boolean
                                    disabled={!customMessage.isEditing}
                                    onChange={(e) => handleInputChange(e, customMessage.id)}
                                />
                            </td>
                            <td className="centerAlign">
                                {customMessage.isEditing ? (
                                            <i
                                                className="fa-solid fa-save"
                                                onClick={() => handleSave(customMessage)}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fa-solid fa-pen"
                                                onClick={() => toggleEdit(customMessage.id)}
                                            ></i>
                                    )}
                            </td>
                            <td className="centerAlign">
                                <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handleDelete(customMessage.id)}
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

// Styles for the form popup
const FormWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 100;

  h2 {
    margin-bottom: 20px;
    color: #C30E59;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }

    input {
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px;
      background-color: #C30E59;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    button[type="button"] {
      background-color: #ccc;
    }
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #C30E59;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
`;

export default CustomMessage;
