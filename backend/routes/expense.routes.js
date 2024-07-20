const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const Expense = require("../models/Expense.model");
const moment = require("moment");
const { Mongoose } = require('mongoose');

router.post('/', isAuthenticated, async(req, res) => {
    try {
        const { frequency, selectedDate, categoryFilter } = req.body;
        const date = new Date();
        date.setDate(date.getDate() - frequency);
        const curr_date = String(date.getDate()).padStart(2, '0');
        const curr_month = String(date.getMonth() + 1).padStart(2, '0');
        const curr_year = date.getFullYear();
        const current = curr_year + "-" + curr_month + "-" + curr_date;
        const expense= await Expense.find({ 
            ...(frequency !== "custom"
            ? {
                date: {
                    $gt: current
                },
            }
            : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                },
            }),
            user: req.payload._id,
            ...(categoryFilter !== "all"
                ? {
                    category: categoryFilter
                }
                : {
                    
                }
            ),
        }).populate('category')
        res.status(200).json(expense);
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/create', isAuthenticated, async(req, res) => {
    const { category, amount, date, currency, description } = req.body;
    const user = req.payload._id;
    try {
        const expense= await Expense.create({ category, amount, date, currency, description, user })
        res.status(201).json(expense);
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/:id', isAuthenticated, async(req, res) => {
    const { category, amount, date, currency, description } = req.body;
    const id = req.params.id;
    try {
        const expense= await  Expense.findOneAndUpdate({ _id: id, user: req.payload._id }, { category, amount, date, currency, description }, { new: true })
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
        } else {
            res.status(200).json(expense);
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;
    try {
        const expense= await Expense.findOneAndDelete({ _id: id, user: req.payload._id })
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
        } else {
            res.status(204).json({ message: "Expense deleted successfully" });
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
