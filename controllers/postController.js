import { response } from "express";
import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.status(200).json(posts);
  } catch (err) {
    {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    ).populate("user");
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get the post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "post was not created",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndDelete({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: " post not found" });
    }
    res.status(200).json({ message: "succsessfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't delete the post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findByIdAndUpdate({ _id: postId }, { ...req.body });
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't update the post",
    });
  }
};
