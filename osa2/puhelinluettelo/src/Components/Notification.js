const Notification = ({
  addMessage,
  removeMessage,
  updateMessage,
  errorMessage,
}) => {
  // const [boxStyle, setBoxStyle] = useState({})

  if (
    addMessage === null &&
    removeMessage === null &&
    updateMessage === null &&
    errorMessage === null
  ) {
    return null;
  }
  const acceptedStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    border: "2px solid green",
    padding: "10px 10px",
    backgroundColor: "lightgrey",
    margin: "20px 0",
  };
  //setBoxStyle(acceptedStyle)

  let message = "";
  if (addMessage !== null) {
    console.log("oikea paikka", message);
    message = addMessage;
  } else if (removeMessage !== null) {
    message = removeMessage;
  } else if (updateMessage !== null) {
    message = updateMessage;
  } else if (errorMessage !== null) {
    message = errorMessage;
    const errorStyle = {
      color: "red",
      fontStyle: "italic",
      fontSize: 16,
      border: "2px red",
      padding: "10px 10px",
      backgroundColor: "lightgrey",
      margin: "20px 0",
    };

    return <div style={errorStyle}>{message}</div>;
  }
  //setBoxStyle(acceptedStyleRed)
  return <div style={acceptedStyle}>{message}</div>;
};

export default Notification;
