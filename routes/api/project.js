const auth = require('../../middleware/auth');
const Project = require('../../models/Project');
const validator = require('../../validation/projects');

const router = require('express').Router();

router.post('/', auth, (req, res) => {
  const { errors, isValid } = validator.createProject(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { title, publicDescription, privateDescription, interests, skills, private } = req.body;

  Project.findOne({ title, ownerId: req.account.id })
    .then((project) => {
      if (project) {
        res.status(400).json({ msg: 'You have already created a project with that title! Please use another one' });
        return;
      }

      const newProject = new Project({
        title,
        publicDescription,
        privateDescription,
        interests,
        skills,
        private,
        members: [],
        ownerId: req.account.id,
      })

      newProject.save()
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Something went wrong in the server' });
        console.log(err);
        return;
      })
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something has gone wrong with the server' });
      console.log(err);
      return;
    })
});

module.exports = router;