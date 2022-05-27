const express = require('express');
const path = require('path')
const cors = require('cors')
const ytdl = require('ytdl-core')

const PORT = process.env.PORT || 80

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(cors())

app.get('/api/getYoutubeData', async (req, res) => {
	console.log("Recieve api call for getYoutubeData")
    ytdl.getBasicInfo(req.query.link).then(info => {
        res.send({videoData: JSON.stringify(info)})
		console.log("SUCCESS")
    }).catch(err => {
		res.status(400)
		res.send(err)
		console.log("ERROR")
	})
})

app.get('/api/downloadYoutubeVideo', async (req, res) => {
	console.log("Recieve api call for downloadYoutubeVideo")
	try {
		var url = req.query.link;
		console.log(url)
		if(!ytdl.validateURL(url)) {
			console.log("invalud url")
			return res.sendStatus(400);
		}
		let title = 'audio'
		title = (await ytdl.getBasicInfo(url)).videoDetails.title
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).on("response", response => {
			res.setHeader("Content-Disposition", `attachment; filename=${title}.mp3`)
			res.setHeader("Content-Length", response.headers["content-length"])
			res.setHeader("Content-Type", "audio/mpeg")
		})
		.pipe(res)

	} catch (err) {
		console.error(err);
	}
	console.log("Request over")
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})
