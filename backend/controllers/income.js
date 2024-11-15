const IncomeSchema= require("../models/IncomeModel");
// exports.addIncome = async (req, res) => {
//     console.log(req.body);
// }
exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || typeof  !amount == 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    // console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.monthIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.aggregate([
            {
                $group: {
                    _id: { $month: "$date" },
                    incomes: { $push: "$$ROOT" }
                }
            }
        ]);
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.yrIncome = async (req, res) => {
    const { year, month } = req.params;

    try {
        const incomes = await IncomeSchema.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$date" },
                     month: { $month: "$date" } },
                    incomes: { $push: "$$ROOT" }
                }
           
            },
            {
                $match: {
                    "_id.year": parseInt(year),
                    "_id.month": parseInt(month)
                }
            }
        ]);
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

