const express = require('express');
const router = express.Router();
const query = require('../safeticket_net/query.js');


/* GET users listing. */
router.get('/', async function(req, res) {
	let args = req.query.args;
	let fcn = req.query.fcn;
	let peer = req.query.peer;
	
	if(!fcn) {
		res.json(getErrorMessage('\'fcn\''));
		return;
	}
	if(!args) {
		res.json(getErrorMessage('\'args\''));
		return;
	}
	args = args.replace(/'/g, '"');
	args = JSON.parse(args);


	let message = await query.queryChaincode(peer, args, fcn, req.username, req.orgname);
	res.send(message);
	
});

/* POST buy ticket */
router.post('/channels/:channelName/chaincodes/:chaincodeName', async function(req, res) {
    console.log('==================== INVOKE ON CHAINCODE ==================');
    var peers = req.body.peers;
    var chaincodeName = req.params.chaincodeName;
    var channelName = req.params.channelName;
    var fcn = req.body.fcn;
    var args = req.body.args;
    console.log('channelName  : ' + channelName);
    console.log('chaincodeName : ' + chaincodeName);
    console.log('fcn  : ' + fcn);
    console.log('args  : ' + args);
    
});

/* PUT modify ticket info */
router.put('/', (req, res, next)=> {
    res.send('ModifyTicket');

	    /*
		    send to Blockchain Network using Fabric-sdk
		*/
});

/* PUT delete ticket */
router.delete('/',(req, res, next) =>{
	res.send('DeleteTicket');

	/*
		send to Blockchain Network using Fabric-sdk
	*/
});

module.exports = router;
