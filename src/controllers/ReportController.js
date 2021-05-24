const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários que tem email que termina com @rocketseat.com.br
    // Desses usuários eu quero buscar todos que moram na rua "Rua Princesa Isabel"
    // Desses usuários eu qro buscar as tecnologias que começam com React

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@email.com',
        },
      },
      include: [
        { association: 'addresses', where: { street: 'Rua Princesa Isabel' } }, // endereços
        { association: 'techs', required: false ,where: {
          name: {
            [Op.like]: 'Node%'
          }
        } }, // tecnologias
      ],
    })

    return res.json(users)
  },
}
