<div align="center">
  <img src="https://thumbs.dreamstime.com/z/asian-food-emblem-japanese-mochi-onigiri-ramen-poster-mascot-character-chinese-baozi-fortune-cookie-cartoon-vector-266108355.jpg?ct=jpeg" alt="W4L" height="250">
  <h1 align="center"> What's for lunch? </h1>

  <p align="center">
    A simple food application to use when you dont know what to eat.
    </br>
  </p>
</div>

## Prerequisites

W4L was built using [React](https://react.dev/learn/installation) for front-end development, and [Python3](https://www.python.org/downloads/) with the [Flask](https://pypi.org/project/Flask/) web 
application framework running as a virtual environment for the back-end. [Google API](https://console.cloud.google.com/apis/library) was used to pull location information based on user location and input.

## Usage

Clone the repository by running the following command in the command prompt:

### [```https://github.com/rjeata/W4L.git```](https://github.com/rjeata/W4L)
In the project directory, run:

### ```npm start```

This will launch the react app to display API information pulled from the Google API calls.

Create another terminal and move back into the project directory if not already open.

Move into the API folder of the repository by running the command:

### ```cd api```

We now need to start the virtual environment by running the command:

### ```. .\venv\bin\activate\```

You should now see ```venv``` on the far left of the project directory.

After verifying if the virtual environment is properly running, run the command:

### ```flask run```

This should start the web application framework to host the API calls.
