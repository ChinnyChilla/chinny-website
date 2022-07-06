const express = require('express');
const path = require('path')
const ytdl = require('ytdl-core')
const rateLimit = require('express-rate-limit')
const fs = require('fs')
const https = require('https')
const ws = require('ws')
const validator = require('validator')
require('dotenv').config()
const app = express();

var limiter = rateLimit({
	
	windowsMs: 60000,
	max: 10,
	message: "too many api queries"
})

const privateKey = fs.readFileSync('./.ssl/private_key.pem')
const certificate = fs.readFileSync('./.ssl/certificate.pem')

var serverQueues = new Map();

const server = https.createServer({key: privateKey, cert: certificate}, app)

var wss = new ws.Server({server: server, path: "/music-queues", host:"0.0.0.0"})

server.listen(process.env.PORT || 443, function() {
	console.log(`Server listening on ${server.address().port}`)
})

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use('/api/get', limiter)

app.get('/api/get/YoutubeData', async (req, res) => {
    ytdl.getBasicInfo(req.query.link).then(info => {
        res.send({videoData: JSON.stringify(info.videoDetails)})
    }).catch(err => {
		res.status(400)
		res.send(err)
		console.log("ERROR")
	})
})

app.get('/api/get/downloadYoutubeVideo', async (req, res) => {
	try {
		var url = req.query.link;
		console.log(url)
		if(!ytdl.validateURL(url)) {
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
})
app.post('/api/post/updateQueue', async (req, res) => {

})
wss.on('connection', (ws) => {
	ws.isAlive = true;

	ws.on('pong', () => {
		ws.isAlive = true;
	})
	ws.on('message', (msg) => {
		ws.send(`Hello! you said ${msg}`)
	})
	ws.send("Websocket connected")
})

setInterval(() => {
	wss.clients.forEach(ws => {
		if (!ws.isAlive) return ws.terminate();
		ws.isAlive = false
		ws.ping(null, false, true)
	})
}, 10000)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});