const express = require('express');
const path = require('path')

const ytdl = require('ytdl-core')

const PORT = process.env.PORT || 80

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));


app.get('/api/getYoutubeData', async (req, res) => {
	console.log("Recieve api call for getYoutubeData")
    ytdl.getBasicInfo(req.query.link).then(info => {

        console.log(info)
        res.send({videoData: JSON.stringify(info)})
    }).catch(err => {
		res.status(400)
		res.send(err)
	})
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})
