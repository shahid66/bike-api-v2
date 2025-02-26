/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
const getUserIntoDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUserIntoDB = async (id: string, userData: TUser, files: any) => {
  if (files) {
    const uploadedFiles = files.map((file: any) => ({
      imageName: file.filename,
      path: file.path,
    }));

    //send image to cloudinary
    const cloudinaryResponses = await sendImagesToCloudinary(uploadedFiles);
    const images = cloudinaryResponses.map((res) => res.secure_url);
    userData.image = images[0];
  }

  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  updateUserIntoDB,
  createUserIntoDB,
  getUserIntoDB,
};
