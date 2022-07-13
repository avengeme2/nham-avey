import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateRequest, UserRecord } from "firebase-admin/auth"
import { FirebaseAuthenticationService } from "src/firebase-admin/firebase-admin-authentication.service"
import { CreateAccountInput, CreateAccountOutput, SignUpAccountInput, SignUpAccountOutput } from "src/users/dtos/create-account.dto"
import { EditProfileInput, EditProfileOutput } from "src/users/dtos/edit-profile.dto"
import { UserProfileOutput } from "src/users/dtos/user-profile.dto"
import { User, UserRole } from "src/users/entities/user.entity"
import { Repository } from "typeorm"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly firebaseAuthService: FirebaseAuthenticationService,
  ) {}

  private async createFirebaseUser(createRequest: CreateRequest, customClaims: object): Promise<UserRecord> {
    const firebaseUser = await this.firebaseAuthService.createUser(createRequest)
    await this.firebaseAuthService.setCustomUserClaims(firebaseUser.uid, customClaims)
    return firebaseUser
  }

  private async checkIfUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } })
    return user !== null
  }

  private async createUser(id: string, input: CreateAccountInput, roles: UserRole[]): Promise<User> {
    const userEntity = this.userRepo.create({ id, ...input, roles })
    return this.userRepo.save(userEntity)
  }

  async findUserById(id: string) {
    return this.userRepo.findOneBy({ id })
  }

  async signUpCustomer(signUpAccountInput: SignUpAccountInput): Promise<SignUpAccountOutput> {
    const exist = await this.checkIfUserExistByEmail(signUpAccountInput.email)
    if (exist) {
      return {
        ok: false,
        error: `[App] User with email ${signUpAccountInput.email} already exist!`,
      }
    }

    const firebaseUser = await this.createFirebaseUser(signUpAccountInput, { roles: [UserRole.Customer] })
    const signInToken = await this.firebaseAuthService.createCustomToken(firebaseUser.uid)
    const user = await this.createUser(firebaseUser.uid, signUpAccountInput, [UserRole.Customer])

    return { ok: true, user, signInToken }
  }

  async signUpVendor(signUpAccountInput: SignUpAccountInput): Promise<SignUpAccountOutput> {
    const exist = await this.checkIfUserExistByEmail(signUpAccountInput.email)
    if (exist) {
      return {
        ok: false,
        error: `[App] User with email ${signUpAccountInput.email} already exist!`,
      }
    }

    const firebaseUser = await this.createFirebaseUser(signUpAccountInput, { roles: [UserRole.Vendor] })
    const signInToken = await this.firebaseAuthService.createCustomToken(firebaseUser.uid)
    const user = await this.createUser(firebaseUser.uid, signUpAccountInput, [UserRole.Vendor])

    return { ok: true, user, signInToken }
  }

  async createAdmin(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exist = await this.checkIfUserExistByEmail(createAccountInput.email)
      if (exist) {
        return {
          ok: false,
          error: "[App] There is a user with that email already!",
        }
      }

      const firebaseUser = await this.createFirebaseUser(createAccountInput, { roles: [UserRole.Admin] })
      const user = await this.createUser(firebaseUser.uid, createAccountInput, [UserRole.Admin])

      // TODO: send verify email here

      return { ok: true, user }
    } catch (err) {
      return {
        ok: false,
        error: "[App] Couldn't create account",
      }
    }
  }

  async findById(id: string): Promise<UserProfileOutput> {
    try {
      const user = await this.userRepo.findOneByOrFail({ id })
      return {
        ok: true,
        user,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] User Not Found",
      }
    }
  }

  async editProfile(id: string, { email }: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const user = await this.userRepo.findOneBy({
        id: id,
      })
      if (!user) {
        return {
          ok: false,
          error: "[App] User not found",
        }
      }

      if (email) {
        user.email = email
        user.verified = false

        // TODO: Resend verify email here
      }

      await this.userRepo.save(user)
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: "[App] Could not update profile",
      }
    }
  }
}
