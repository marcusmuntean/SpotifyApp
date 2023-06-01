var express = require('express');
var router = express.Router();
const db = require("./firebase");
const { doc, collection, getDocs, where, query, and, addDoc, deleteDoc } = require("firebase/firestore");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get_inbox', async function(req, res, next) {
  const allDocData = []
  const q = query(collection(db, "Inboxes"), where("users", "array-contains", req.body.username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (inboxDocument) => {
    if (inboxDocument.data().users.includes(req.body.otherUsername)) {
      const q2 = query(collection(db, "Inboxes", inboxDocument.id, "Messages"));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((messagesDocument) => {
        allDocData.push(messagesDocument.data())
        console.log(messagesDocument.data())
      })
      res.json({result: allDocData});
    }
  })
});

router.get('/:username', async function(req, res, next) {
  const allDocData = []
  const q = query(collection(db, "Inboxes"), where("users", "array-contains", req.params.username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    allDocData.push({id: document.id,
    data: document.data()});
  })
  res.json({result: allDocData});
});

router.post('/add_message', async function(req, res, next) {
  const q = query(collection(db, "Inboxes"), where("users", "array-contains", req.body.username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (inboxDocument) => {
    if (inboxDocument.data().users.includes(req.body.otherUsername)) {
      await addDoc(collection(db, "Inboxes", inboxDocument.id, "Messages"), {
        user: req.body.username,
        content: req.body.content,
        time: req.body.time
      })
    }
  })
});

router.post('/add_channel', async function(req, res, next) {
  const newChat = await addDoc(collection(db, "Inboxes"), {
    users: [req.body.username, req.body.otherUsername],
  })

  // const fakeDoc = await addDoc(collection(db, "Inboxes", newChat.id, "Messages"), {
  //   test: "test"
  // })

  // await deleteDoc(doc(db, "Inboxes", newChat.id, "Messages", fakeDoc.id))

  console.log(newChat.id)
  res.send(200);
});

module.exports = router;
