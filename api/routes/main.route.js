import express from "express"

const router = express.Router()

router.get('/',(request, response) => {
    StarterId.find({}).then(id => {
        response.json(id[0])
    })
      .catch()
  })

export default router;