function press_key(command) {
    const cmd = command.toLowerCase();
    // use ternary operator to check if the command is 'up', 'down', 'left', or 'right'
    const key = cmd == 'up' ? 'w' : cmd == 'down' ? 's' : cmd == 'left' ? 'a' : cmd == 'right' ? 'd' : null;
    var keyboardEvent = new KeyboardEvent('keydown', {'key': key});
    document.dispatchEvent(keyboardEvent);
}

function makeRequest() {
  // Use the XMLHttpRequest object to make a GET request to the server
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8000', true);

  // Set up a callback function to handle the response from the server
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // If the response is successful, execute the command received from the server
      press_key(xhr.responseText);
    }
  }

  xhr.send();
}

setInterval(makeRequest, 200);
