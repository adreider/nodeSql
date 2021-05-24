const User = require('../models/User')
const UserService = require('../services/UserService');
const UserRepository = require('../repositories/UserRepository');
const AuthService = require('../services/AuthServices');

const userService = new UserService();
const userRepository = new UserRepository();
const authService = new AuthService()

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
    })

    return res.json(users)
  },
  async store(req, res) {
    const { name, email, password } = req.body

    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exist' })

      const user = await User.create({ name, email, password })

      user.password = undefined

      return res.json(user)
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  },

  async create(req = request, res = response) {
    try {
         const { user } = req.body;

         await userService.checkEmailExists(user.email);
         
         const encrypted = await authService.encrypt(user.password);
         
         const id = await userRepository.create({ ...user, password: encrypted, avatar_url: 'https://imc-app-storage-files.s3.amazonaws.com/sem_foto.png', key: 'sem_foto.png' });
         const token = authService.generateToken(id);
         
         const userData = await userRepository.findById(id);
         delete userData.password;

         return res
                 .status(201)
                 .set({ 'Authorization': token })
                 .set({'access-control-expose-headers': 'Authorization'})
                 .json(userData);

    } catch (e) {
        console.log(e);
        return res.status(e.status).json(e);
    }
 }

  
}
