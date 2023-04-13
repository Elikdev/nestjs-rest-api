import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
 fName: String,
 lName: String,
 username: {
  type: String,
  unique: true,
 },
 password: String,
 deleted: {
  type: Boolean,
  default: false
 }
})