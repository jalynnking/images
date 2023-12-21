To start app:
Open terminal > cd into file > npm start
Open new terminal tab > cd into src (you must be in same directory server.js is located) > node server.js
(The second command is needed to start the backend)

Approximate time to complete: 5 hours

I added tests for the header component, just testing some of the UI and basic functionality. If I had more time I would add more detailed tests for all of the components as well as API tests. To run tests use the command "npm test".

If I had more time I think the main thing I would like to change about my code is doing most of the styling in the css file rather than inline as it tends to add a lot of bulk to the script files. But for the sake of time I stuck with inline as it is quicker. One thing I would like to add would be a title field that would take a custom input rather than just using the filename and maybe even adding a textfield for a description if it benefited the user, in that case I would create a popup dialog instead of just the upload button and I would display the images and their information in card form.

*For the delete button, if you are in a larger screen then hover over image, if you are in a smaller (touch) screen then the bar displaying filename and delete button will be shown automatically*