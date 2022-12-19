const createActivity =  async (req, res) => {
    res.send('create activity')
}

const getAllActivity =  async (req, res) => {
    res.send('get all activity')
}

const updateActivity =  async (req, res) => {
    res.send('update activity')
}

const deleteActivity =  async (req, res) => {
    res.send('delete activity')
}

const showStats =  async (req, res) => {
    res.send('show activity stats')
}


export { createActivity, getAllActivity, updateActivity, deleteActivity, showStats };