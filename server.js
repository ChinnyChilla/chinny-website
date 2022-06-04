const express = require('express');
const path = require('path')
const ytdl = require('ytdl-core')
const rateLimit = require('express-rate-limit')
const fs = require('fs')
const https = require('https')
const app = express();

var limiter = rateLimit({
	windowsMs: 1 * 60 * 1000,
	max: 5,
	message: "too many api queries"
})

const privateKey = fs.readFileSync('./.ssl/private_key.pem')
const certificate = fs.readFileSync('./.ssl/certificate.pem')

https.createServer({key: privateKey, cert: certificate}, app).listen(443, function() {
	console.log(`Server listening on 443`)
})

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(limiter)

app.get('/api/getYoutubeData', async (req, res) => {
	console.log("Recieve api call for getYoutubeData")
    ytdl.getBasicInfo(req.query.link).then(info => {
        res.send({videoData: JSON.stringify(info.videoDetails)})
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
			console.log("invalid url")
			return res.sendStatus(400);
		}
		let title = 'audio'
		title = (await ytdl.getBasicInfo(url)).videoDetails.title
		console.log(title	)
		const video = await ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).on("response", response => {
			res.setHeader("Content-Disposition", `attachment; filename=${title}.mp3`)
			res.setHeader("Content-Length", response.headers["content-length"])
			res.setHeader("Content-Type", "audio/mpeg")
			video.pipe(res)
		})

	} catch (err) {
		console.error(err);
	}
	console.log("Request over")
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});