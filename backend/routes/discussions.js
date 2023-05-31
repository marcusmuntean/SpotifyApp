

var express = require('express');
var router = express.Router();

var cors = require('cors');

router.use(cors());

const db = require("./firebase");
const {collection, getDocs, addDoc, doc, getDoc} = require("firebase/firestore");

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

router.get('/:boardId/messages', async function(req, res, next) {
    try {
        
      const { boardId } = req.params;
      const modifiedBoardId = boardId.substring(1);
      
      const boardRef = doc(db, "DiscussionBoards", modifiedBoardId);
      console.log({boardRef});
      const boardSnapshot = await getDoc(boardRef);
  
      if (!boardSnapshot.exists()) {
        console.log('Board does not exist');
        return res.status(404).json({ error: 'Board not found.' });
      }

      console.log('got past snapshot existing');
      const messagesRef = collection(boardRef, 'Messages');
      const snapshot = await getDocs(messagesRef);
  
      const messages = [];
      snapshot.forEach((message) => {
        messages.push({ id: message.id, ...message.data() });
      });
      res.json({ messages });
    } catch (error) {
      console.error('Error retrieving messages: ', error);
      res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  });

router.post('/discussions', async function(req, res, next) {
    
})

module.exports = router;