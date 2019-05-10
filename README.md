# simple-upload-server
This is a super simple version of the image upload for app testing purposes.

# Setup
1. Install Node. (https://nodejs.org/en/)
2. Run `npm install` 
3. Run `node server.js`
4. Navigate to `http://localhost:3333` to ensure the server is running
    - You should see a JSON response `{ message: 'Hello, World!' }`
5. Send a form-data POST request to `http://localhost:3333/upload`
    - The fields are the same as the real project
    - `checksum` should be a non-empty string (this project doesn't actually test the checksum)
    - `image` should be an image file

The `/upload` endpoint expects a multipart/form-data POST request with two
fields.  You will receive a `400` error if the request is not structured
correctly.
