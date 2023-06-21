let users = []

const getAllUsers = () => {
    return users
}

const getUserById = (id) => {
    const user = users.find(user => user.id === id)
    return user
}

const addUser = (user) => {
    users.push(user)
}

const putUser = (user, id) => {
    users = users.filter(user => user.id !== id)
    users.push(user)
}

const deleteUser = (id) => {
    users = users.filter(user => user.id !== id)
}

module.exports = {addUser, putUser, deleteUser, getAllUsers, getUserById}
