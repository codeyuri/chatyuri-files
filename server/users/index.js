const users = [];

const addUser = ({ id, name }) => {
    // gi butangan lang nako ug slice kay sa local if mag manual search sa chatroom kay makasud gihapon bisag 
    // lapas sa max character sa name
    // sa URL if sa local nya if lapas ang max char kay makita gyapon sa URL pero naka slice na sya sa chatwindow
    name = name.trim().toLowerCase().slice(0, 10);
    const existingUser = users.find(user => user.name === name);

    if(!name) return { error: 'Username is required.' };
    if(existingUser) { return { error: 'Username is taken'}; }

    const user = { id, name };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find(user => user.id === id)

const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, removeUser, getUser, getOnlineUsers }