import express from "express";
import ProcessModel from "../model/process.model.js";

const processRoute = express.Router();

processRoute.post("/create", async (req, res) => {
  try {

    const form = req.body

    const newProcess = await ProcessModel.create(form)

    return res.status(201).json(newProcess)
    
  } catch (error) {
    console.log(error.errors)
    return res.status(500).json(error.errors)
  }
})

processRoute.get("/all", async (req,res) => {
  try {

    const process = await ProcessModel.find({}, {__v: 0, updatedAt: 0}).sort({dateInit: 1})
    return res.status(200).json(process)
    
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

//GET ONE PROCESS
processRoute.get("/oneProcess/:id", async(req, res) => {
  try {

    const { id } = req.params;
    const proc = await ProcessModel.findById(id)

    if(!proc){
      return res.status(400).json({msg: "Processo nao encontrado"})
    }

    return res.status(200).json(proc)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error.errors)
  }
})

processRoute.delete("/delete/:id", async(req,res) => {
  try {
    const { id } = req.params
    const deleteProc = await ProcessModel.findByIdAndDelete(id)

    if(!deleteProc) {
      return res.status(400).json({msg: "Processo nao encontrado"})
    }

    return res.status(200).json(deleteProc)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error.errors)
  }
})

processRoute.put("/edit/:id", async (req, res) => {
  try {

    const { id } = req.params
    const updatedProc = await ProcessModel.findByIdAndUpdate(
      id,
      {...req.body},
      { 
        new: true,
        runValidators: true
      })

    return res.status(200).json(updatedProc)
    
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.errors)
  }
})

export default processRoute;