const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create a new project
router.post('/projects', async (req, res) => {
  try {
    const { project_name, project_description, owner_name } = req.body;
    const newProject = new Project({ project_name, project_description, owner_name });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a project
router.put('/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
