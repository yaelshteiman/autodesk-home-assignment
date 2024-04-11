require('dotenv').config();
const express = require('express')
// const request = require('request');
const os = require('os');
const app = express()
const PORT = process.env.PORT || 3000;

// endpoints
// GET request to YouTube API
app.get('/videos', (req, res) => {
    const apiKey = process.env.API_KEY;
    const request = require('request');

    // constructing the URL to fetch videos related to Autodesk
    const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=Autodesk&type=video&key=${apiKey}`;

    // making a GET request to YouTube API
    request(searchUrl, (err, response, body) => {
        if(!err && response.statusCode === 200) {
            const searchData = JSON.parse(body);
            const videoItems = searchData.items.filter(item => item.id.kind === 'youtube#video');
            const videosIds = videoItems.map(item => item.id.videoId).join(',');

            const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videosIds}&part=snippet&part=contentDetails&part=statistics`;

            request(videosUrl, (err, response, body) => {
                if (!err && response.statusCode === 200){
                    const videoData = JSON.parse(body);
                    const videos = videoData.items.map(item => ({
                        title: item.snippet.title,
                        length: item.contentDetails.duration,
                        views: item.statistics.viewCount
                    }));
                    res.json(videos);
                } else{
                    res.status(500).json({
                        error: "Failed to fetch videos"
                    });
                }
            });
        } else {
            res.status(500).json({
                error: 'Failed to fetch videos'
            });
        }

    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    // Get total memory and free memory in bytes
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    // Calculate memory usage percentage
    const memoryUsagePercentage = ((totalMemory - freeMemory) / totalMemory) * 100;
    // Get total CPU cores
    const totalCpuCores = os.cpus().length;
    // Calculate total CPU usage in milliseconds
    const cpuUsage = process.cpuUsage();
    // Calculate total CPU usage in milliseconds
    const totalCpuUsage = (cpuUsage.user + cpuUsage.system) / 1000;
    // Calculate CPU usage percentage
    const cpuUsagePercentage = (totalCpuUsage / totalCpuCores) * 100;

    const healthData = {
        os: process.platform,
        nodeVersion: process.versions.node,
        memoryUsage: `${memoryUsagePercentage.toFixed(2)} %`,
        cpuUsage: `${cpuUsagePercentage.toFixed(2)} %`
    };
    res.json(healthData);
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost: ${PORT}`);
});

app.all('/*', (req, res) => {
    res.status(404).send({ 'message': 'You should go to /videos or /health' });
});
