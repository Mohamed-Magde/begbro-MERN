import Categories from "../models/categories.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";
import request from "request";

const create = async (req, res) => {
  const category = new Categories(req.body);
  try {
    await category.save;
    return res.status(200).json({
      message: "New Category Added",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const categoryById = async (req, res, next, id) => {
  try {
    let category = await Categories.findById(id);
    if (!category) return res.status(400).json({ error: "Category Not Found" });
    req.body = category;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};
