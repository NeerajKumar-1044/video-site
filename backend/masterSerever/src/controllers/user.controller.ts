import { User, IUser } from "../models/userModel";
import { Request, Response } from "express";
import { UserDto, UserRes } from "../types/userTypes.dto";

const generateAccessAndRefreshToken = async (userid: string) => {
  try {
    const user = await User.findById(userid) as IUser | null;

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken

    user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    console.error("Error generating token:", error)
    return { error }
  }
}

const registerUser = async (req: Request<{}, {}, UserDto>, res: Response<UserRes>): Promise<any> => {
  // TODO: change any to Response<UserRes> when creating routes
  try {
    const { fullname, username, email, password } = req.body;

    const newUser = await User.create({
      fullname,
      username,
      email,
      password,
    });
    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    )
    console.log("User created");
    return res.status(201).json({ message: "User created successfully", data: newUser, statusCode: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user", statusCode: 500, data: error });
  }
};

const loginUser = async (req: Request<{}, {}, UserDto>, res: Response<UserRes>): Promise<any> => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }) as IUser | null

    if (!user) {
      throw new Error("User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
      httpOnly: true,
      secure: true
    }
    console.log("user logged in ");
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        { message: "User logged in successfully", data: loggedInUser, statusCode: 200 }
      )

  } catch (error) {
    return res.status(500).json({ message: "Failed to login user", statusCode: 500, data: error });
  }
}

const logoutUser = async (req: Request, res: Response): Promise<any> => {
  // TODO:Implement req.user in middleware

  // await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     $unset: {
  //       refreshToken: 1
  //     }
  //   },
  //   {
  //     new: true
  //   }
  // )
  // const options = {
  //   httpOnly: true,
  //   secure: true
  // }
  // return res.status(200)
  //   .clearCookie("accessToken", options)
  //   .clearCookie("refreshToken", options)
  //   .json()
}
export { registerUser, loginUser }