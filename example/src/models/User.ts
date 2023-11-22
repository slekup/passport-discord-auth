import {
  HydratedDocument,
  Schema,
  SchemaTimestampsConfig,
  model,
} from 'mongoose';
import { Profile } from 'passport-discord-auth';

export interface User {
  discordId: string;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

interface SchemaUser extends User, SchemaTimestampsConfig {}

export type UserDocument = HydratedDocument<SchemaUser>;

export const UserModel = model<SchemaUser>(
  'User',
  new Schema<SchemaUser>({
    discordId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    profile: {
      type: Object,
      required: true,
      default: {},
    },
  })
);
