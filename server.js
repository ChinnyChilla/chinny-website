const express = require('express');
const path = require('path')
const ytdl = require('ytdl-core')
const rateLimit = require('express-rate-limit')
const fs = require('fs')
const https = require('https')
const ws = require('ws')
const validator = require('validator');
const parseUrl = require('parse-url')
var request = require('request');
const randomToken = require('random-token')
require('dotenv').config()
const app = express();

app.use(express.json({limit: '50mb'}));

if (!fs.existsSync('./data/foodi/nutrients')) {
	fs.mkdirSync('./data/foodi/nutrients', {recursive: true});
}

const queueToken = process.env.QUEUE_TOKEN
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
	if (req.body.token != queueToken) return res.sendStatus(401)
	if (!req.body.id || !validator.isInt(req.body.id) || !req.body.queue) return res.sendStatus(400)
	const queue = req.body.queue
	if (req.body.action == 'delete') {
		serverQueues.set(req.body.id, undefined)
	} else if (!queue.firstTrack) {
		queue.firstTrack = serverQueues.get(req.body.id).firstTrack
		queue.timeSongFinish = serverQueues.get(req.body.id).timeSongFinish
		serverQueues.set(req.body.id, queue)
	} else {serverQueues.set(req.body.id, queue)}
	
	res.sendStatus(200)
	wss.clients.forEach(ws => {
		if (ws.queueId != req.body.id) return
		ws.send(JSON.stringify({category: 'queue', data: queue}))
	})
})

app.post('/api/foodi/getNutrients', function (req, res) {
	request.post('http://localhost:3000/predict', {
		json: {
			image: req.body.image,
		},
	}, (error, response, body) => {
		if (error) {
			console.error('Error during API call:', error);
			res.status(500).send('Error during API call');
		} else {
			
			const path = './data/foodi/nutrients/' + body.prediction + '.json';
			if (fs.existsSync(path)) {
				res.status(200).send(fs.readFileSync(path, 'utf8'));
				return;
			}

			request.post({
				url: "https://trackapi.nutritionix.com/v2/natural/nutrients",

				headers: {
					'Content-Type': 'application/json',
					'x-app-id': process.env.NUTRITIONIX_APP_ID,
					'x-app-key': process.env.NUTRITIONIX_API_KEY,
				},
				body: JSON.stringify({
					query: body.prediction,
				}),
			}, function (error, response, body) {
				if (error) {
					console.error('Error during API call:', error);
					res.status(500).send('Error during API call');
				}
				fs.writeFileSync(path, body);
				res.status(200).send(body);
			})
		};
	});

});




wss.on('connection', (ws, inc_req) => {
	const params = parseUrl("http://testing.com" + inc_req.url).query
	if (!params.id) {
		ws.send(JSON.stringify({category: 'error', data: 'Invalid id'}))
		setTimeout(() => {ws.terminate()}, 1)
		return
	}
	ws.isAlive = true;
	ws.queueId = params.id
	ws.on('pong', () => {
		ws.isAlive = true;
	})
	ws.send(JSON.stringify({category: 'handshake', data: "Connection successful"}))
	if (!validator.isInt(params.id)) {
		ws.send(JSON.stringify({category: 'error', data: 'Invalid id'}))
		setTimeout(() => {ws.terminate()}, 1)
		return
	}
	ws.send(JSON.stringify({category: 'queue', data: serverQueues.get(ws.queueId)}))
})

setInterval(() => {
	wss.clients.forEach(ws => {
		if (!ws.isAlive) return ws.terminate();
		ws.isAlive = false
		ws.ping(null, false, () => {return true})
	})
}, 10000)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});