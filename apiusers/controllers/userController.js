const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor insira um usuario e senha' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario já existe' });
        }

        const newUser = new User({ username });
        newUser.setPassword(password);
        await newUser.save();

        const token = newUser.generateJwt();

        res.status(201).json({ message: 'Usuario registrado com sucesso', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }

        user.username = username || user.username;
        user.password = password || user.password;

        await user.save();
        res.status(200).json({ message: 'Usuario atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }
        res.status(200).json({ message: 'Usuario removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Informe o usuario e senha' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || !user.validPassword(password)) {
            return res.status(401).json({ message: 'Usuario ou senha invalido' });
        }

        const token = user.generateJwt();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




module.exports = { registerUser, getUsers, getUserById, updateUser, deleteUser, loginUser };
