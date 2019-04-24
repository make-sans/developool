const auth = require('../../middleware/auth');
const Project = require('../../models/Project');
const validator = require('../../validation/projects');

const router = require('express').Router();

router.get('/:id', auth, (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ msg: 'Project with that ID doesn\'t exist' });
        return;
      }

      res.status(200).json(project);
    })
    .catch(err =>
      res.status(404).json({ msg: "Project with that ID doesn't exist" })
    );
})

router.get('/', (req, res) => {
  Project.find({})
    .then((projects) => {
      res.status(200).json(projects);
    })
})

router.post('/', auth, (req, res) => {
  const { errors, isValid } = validator.createProject(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { title, publicDescription, privateDescription, interests, skills, private } = req.body;

  Project.findOne({ title, ownerId: req.account.id })
    .then((project) => {
      if (project) {
        res.status(409).json({ msg: 'You have already created a project with that title! Please use another one' });
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

router.put('/:id', auth, (req, res) => {
  const { errors, isValid } = validator.updateProject(req.body);
  if (!isValid) {
    res.status(400).json(errors);
    return;
  }
  const { title, publicDescription, privateDescription, interests, skills, private } = req.body;

  Project.findOne({ _id: req.params.id, ownerId: req.account.id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ msg: 'You do not own such a project.' });
        return;
      }

      project.title = title ? title : project.title;
      project.publicDescription = publicDescription ? publicDescription : project.publicDescription;
      project.privateDescription = privateDescription ? privateDescription : project.privateDescription;
      project.interests = interests ? interests : project.interests;
      project.skills = skills ? skills : project.skills;
      project.private = typeof private === 'boolean' ? private : project.private;

      project.save()
        .then((project) => {
          res.status(200).json(project);
          return;
        })
        .catch((err) => {
          res.status(500).json({ msg: 'Something went wrong' });
          console.log(err);
          return;
        })
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something went wrong' });
      console.log(err);
      return;
    })

});

router.delete('/:id', auth, (req, res) => {
  Project.findOne({ _id: req.params.id, ownerId: req.account.id })
    .then((project) => {
      if (!project) {
        res.status(404).json({ msg: 'You do not own such a project.' });
        return;
      }

      project.delete()
        .then((project) => {
          res.status(200).json(project);
          return;
        })
        .catch((err) => {
          res.status(500).json({ msg: 'Something went wrong' });
          console.log(err);
          return;
        })
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something went wrong' });
      console.log(err);
      return;
    })
});

router.post('/join/:projectID', auth, (req, res) => {
  Project.findOne({ _id: req.params.projectID })
    .then((project) => {
      if (!project) {
        res.status(404).json({ msg: 'Project with that ID doens\'t exist' });
        return;
      }

      if (project.private) {
        res.status(403).json({ msg: 'You do not have permissions to join this project' });
        return;
      }

      if (project.ownerId.toString() === req.account.id.toString()) {
        res.status(400).json({ msg: 'You can\'t join your own project as a member' });
        return;
      }

      const alreadyAMember = project.members.some((memberID) => memberID === req.account.id);
      if (alreadyAMember) {
        res.status(409).json({ msg: 'You\'re already a member of this project' });
        return;
      }

      project.members.push(req.account.id);

      project.save()
        .then((project) => {
          res.status(200).json({ msg: 'Member has been added to the member list' });
        })
        .catch((err) => {
          res.status(500).json({ msg: 'Something went wrong' });
          console.log(err);
        });
    })
    .catch((err) =>{
      res.status(500).json({ msg: 'Something went wrong' });
      console.log(err);
    });
});

router.post('/leave/:projectID', auth, (req, res) => {
  Project.findOne({ _id: req.params.projectID })
    .then((project) => {
      if (!project) {
        res.status(404).json({ msg: 'Project with that ID doens\'t exist' });
        return;
      }

      if (project.ownerId.toString() === req.account.id.toString()) {
        res.status(400).json({ msg: 'You can\'t leave a project as an owner. Transfer ownership to another member first.' });
        return;
      }

      const isAMember = project.members.some((memberID) => memberID === req.account.id);
      if (!isAMember) {
        res.status(403).json({ msg: 'You\'re not a member of this project.' });
        return;
      }

      const newMemberList = project.members.filter((memberID) => memberID !== req.account.id);
      project.members = newMemberList;
      project.save()
        .then((project) => {
          res.status(200).json({ msg: 'Left project successfuly' });
        })
        .catch((err) => {
          res.status(500).json({ msg: 'Something went wrong' });
          console.log(err);
        })
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Something went wrong' });
      console.log(err);
    });
})

module.exports = router;