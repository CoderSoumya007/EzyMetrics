import etlServices from "../Services/etlServices.js"
export const runETL = async (req, res, next) => {
    try {
        const metrics = await etlServices.performETL();
        res.json(metrics);
    } catch (error) {
        next(error);
    }
}
