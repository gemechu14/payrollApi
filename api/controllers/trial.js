const Trial=require('../models/trial.js');


exports.createPlan = async (req, res, next) => {
    try {
        // if (!req.body.price || !req.body.name) {
        //     return res.status(400)
        //         .json(vm.ApiResponse(false, 400, 'all fields are required'))
        // }
       // const _expected_body = _.pick(req.body, ['price', 'name']);
        const create_plan = new Trial(req.body);
        const save_plan =  await create_plan.save();
        if (save_plan) {
            return res.status(200)
                .json({ status:'success', save_plan})
        } else {
            return res.status(400)
                .json( 'Oops! an error occurr,please try again later ');
        }
    } catch (e) {
        return res.status(500)
    }
};
exports.listPlan = async (req, res, next) => {
    try {
        const find_plan = await Trial.find({});
        if (!find_plan) {
            return res.status(400)
                .json( 'Oops! an error occur');
        } else {
            return res.status(200)
                .json( find_plan);
        }
    } catch (e) {
        return res.status(500)
    }
}

