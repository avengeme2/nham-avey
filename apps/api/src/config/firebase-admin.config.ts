import { IsJSON, IsNotEmpty, IsString } from 'class-validator'
import { ServiceAccount as FirebaseServiceAccount } from 'firebase-admin'

export class FirebaseAdminConfig {
  @IsJSON()
  @IsNotEmpty()
  readonly SERVICE_ACCOUNT_JSON: string

  get serviceAccount(): FirebaseServiceAccount {
    return JSON.parse(this.SERVICE_ACCOUNT_JSON)
  }

  @IsString()
  @IsNotEmpty()
  readonly STORAGE_BUCKET_URL: string
}
