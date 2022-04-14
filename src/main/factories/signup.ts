import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypter-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bCryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
