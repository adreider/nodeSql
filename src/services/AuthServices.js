const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

const ValidateException = require('../controllers/ValidateException')

const UserRepository = require('../repositories/UserRepository')
const userRepository = new UserRepository()

class AuthService {
  async validateLogin(email, password) {
    try {
      const user = await userRepository.findByEmail(email)

      if (user === undefined) {
        throw new ValidateException('E-mail incorreto', 400)
      }
      const { id } = user

      const isPassword = await this.decrypt(password, id)

      if (!isPassword) {
        throw new ValidateException('Senha inválida!', 400)
      }

      return this.generateToken(id)
    } catch (error) {
      throw new ValidateException(e.message, e.status)
    }
  }

  async generateToken(id) {
    // identificar o usuário
    // palavra secreta
    // expiração

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: 172800
    })

    return `Bearer ${token}`
  }

  async encrypt(password) {
    try {
      const salt = await bcrypt.genSaltSync()
      const passEncrypted = await bcrypt.hash(password, salt)

      return passEncrypted
    } catch (error) {
      throw new ValidateException('Erro genérico', 500)
    }
  }

  async decrypt(passwordClear, id) {
    const { password } = await userRepository.findById(id);
    const isPassword = bcrypt.compare(passwordClear, password)

    if(!isPassword) {
      throw new ValidateException('Senha inválida', 400)
    }

    return isPassword
  }

  async changePassword(id, password) {
    try {
      const passEncrypted = await this.encrypt(password)
      await userRepository.updatePassword( passEncrypted, id )
    } catch (error) {
      throw new ValidateException('Erro ao atualizar a senha. Tente novamente mais tarde.', 400)
    }
  }

  async generateCode(id) {
    try {
      const users = await userRepository.findAll()

      let flag, code

      do {
        flag = false
        code = Math.floor(Math.random() * 999999)

        users.forEach((user) => {
          if (user.code == code) {
            flag = true
          }
        })
      } while (flag)

      await userRepository.update({ code }, id)
    } catch (error) {
      throw new ValidateException('Erro ao gerar code', 400)
    }
  }
}

module.exports = AuthService
