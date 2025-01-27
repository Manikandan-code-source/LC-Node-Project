const DashboardData = async (req, res) => {
    res.json({
        message : req.user
    })
}



module.exports = { DashboardData }