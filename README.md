# Junior Home Assignment

## Overview

An implemented Junior Home Assignment. </br>
The task includes writing a simple service with two endpoints and deploy it to [[Heroku](https://www.heroku.com/)] </br>
with a Docker container. </br>

## Service Details
The service has 2 endpoints:
1.  **Video Endpoint** (GET / videos): </br>
    Get a list of 10 videos with Autodesk from YouTube api with confirmation details: title, length, views.</br> 'Topic' set to Autodesk.
2. **Health Endpoint** (GET / health): </br>
   This endpoint should return a health check of your service with the following data: </br>
OS name, Language/platform version, Memory usage of your machine (Percentage value) and CPU usage of your machine (Percentage value).

## Run The Service using Heroku
The service is hosted [here](https://autodesk-assignment-e0c7cdb33351.herokuapp.com/).
Click the link or copy the address below:
```sh
   https://autodesk-assignment-e0c7cdb33351.herokuapp.com/
   ```
you will see `Cannot Get /` message on your browser, </br>
due to the fact the `/` is not define as an endpoint of the service.

## Usage
1. YouTube API videos service - </br>
add `/videos` to the address above. </br> In case of a failure - an Error will be returned.
<div align="center">
<img src="https://i.ibb.co/zGL3p6x/videos.png" alt="videos">
<br/> an example of one video-service endpoint usage
</div>  

2. Health service - </br>
add `/health` to the address above. <br>
<div align="center">
<img src="https://i.ibb.co/YR0hGK1/health.png" alt="health">
<br/> an example of health-service endpoint usage
</div>

## Run the service locally with a Docker
### Prerequisites
1. **NodeJS** - Make sure you have NodeJS installed.
2. **YouTubeAPI** -
   * Create a Google Cloud Platform (GCP) project.
   * Enable the YouTube Data API v3.
   * Create API key
3. **Docker** - Install Docker.

### Usage
1. Download the Code directory. </br> Open your terminal and change to the folder.
2. Paste your API key to `.env` file and save it.
3. Docker -
   * Build the docker: </br>
    ```sh
       $ docker build . -t <your-docker-image>
    ```
    * Run the docker:
   ``` sh
     $ docker run -p <PORT>:3000 -it <your-docker-image>
   ```
   `<Port>` can be any port number you like.
    * Use the service:
      * paste `http://localhost:<PORT>/videos` for the **videos service**.
      * paste `http://localhost:<PORT>/health` for the **health service**.
    * Stop the docker: </br> use the command:
   ```sh
    $ docker ps 
   ```
   copy your Docker's <_CONTAINER ID_>. </br> Run the following command:
    ```sh
    $ docker stop <_CONTAINER_ID_>
    ```