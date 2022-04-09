import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypter-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bCryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
