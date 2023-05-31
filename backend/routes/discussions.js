

var express = require('express');
var router = express.Router();

var cors = require('cors');

router.use(cors());

const db = require("./firebase");
const {collection, getDocs, addDoc, doc, getDoc, updateDoc} = require("firebase/firestore");

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

router.get('/:boardId/', async function(req, res, next) {
    try {
        const { boardId } = req.params;
        const modifiedBoardId = boardId.substring(1);
        console.log('got into get');
        const discRef = doc(db, "DiscussionBoards", modifiedBoardId);
        const snapshot = await getDoc(discRef);

        res.json({name: snapshot.data().name});
        
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

  //adds a new discussion board
router.post('/', async function(req, res, next) {
    try {
        const {name, content} = req.body;

        if( name === '' || content === '') {
            throw new Error('Post title and initial message are BOTH required.');
        }

        const boardRef = collection(db, "DiscussionBoards");
        const newBoardRef = await addDoc(boardRef, {name});

        const messagesRef = collection(newBoardRef, "Messages");
        await addDoc(messagesRef, {content, likes: 0});

        res.status(201).json({id: newBoardRef.id});
    } catch (error) {
        console.error('Error adding post: ', error);
        res.status(500).json({error: 'Failed to add post.'});
    }
    
})

//adds a new message to an existing discussion board
router.post('/:boardId/messages', async function(req, res, next) {
    try {
        console.log('got into here');
      const { boardId } = req.params;
      const { content } = req.body;
  
      if (!content) {
        throw new Error('Message content is required.');
      }
  
      const modifiedBoardId = boardId.substring(1);
      const boardRef = doc(db, 'DiscussionBoards', modifiedBoardId);
  
      const messageRef = await addDoc(collection(boardRef, 'Messages'), {
        content,
        likes: 0
      });
  
      res.status(201).json({ id: messageRef.id });
    } catch (error) {
      console.error('Error adding message: ', error);
      res.status(500).json({ error: 'Failed to add message.' });
    }
  });
  


router.put('/:boardId/messages/:messageId/like', async function(req, res, next) {
    try {
      const { boardId, messageId } = req.params;
      const modifiedBoardId = boardId.substring(1);
      const modifiedMessageId = messageId.substring(1);
  
      const boardRef = doc(db, 'DiscussionBoards', modifiedBoardId);
      const messageRef = doc(boardRef, 'Messages', modifiedMessageId);
      const messageSnapshot = await getDoc(messageRef);
  
      if (!messageSnapshot.exists()) {
        return res.status(404).json({ error: 'Message not found.' });
      }
  
      const currentLikes = messageSnapshot.data().likes || 0;
      const newLikes = currentLikes + 1;
  
      await updateDoc(messageRef, { likes: newLikes });
  
      res.status(200).json({ likes: newLikes });
    } catch (error) {
      console.error('Error updating likes: ', error);
      res.status(500).json({ error: 'Failed to update likes.' });
    }
  });

module.exports = router;