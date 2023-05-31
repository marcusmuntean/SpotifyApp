

var express = require('express');
var router = express.Router();

var cors = require('cors');

router.use(cors());

const db = require("./firebase");
const {collection, getDocs, addDoc} = require("firebase/firestore");

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        console.log('got into get');
        const discRef = collection(db, "DiscussionBoards");
        const snapshot = await getDocs(discRef);

        const boards = [];
        snapshot.forEach((board) => {
            boards.push({id: board.id, ... board.data()});
        });
        res.json({boards});
        
    } catch (error) {
        console.error('Error retrieving discussion boards: ', error);
        res.status(500).json({error: 'Failed to retrieve discussion boards.'});
    }
});

router.post('/discussions', async function(req, res, next) {
    
})

module.exports = router;