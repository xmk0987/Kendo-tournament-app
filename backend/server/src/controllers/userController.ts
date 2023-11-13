import { Route, Controller, Get, Path, Tags, Security, Body, Post } from "tsoa";
import { type User } from "../models/userModel.js";
import { UserService } from "../services/userService.js";
import { ObjectIdString, RegisterRequest } from "../models/requestModel.js";

@Route("user")
export class UserController extends Controller {
  @Security("jwt")
  @Get("{id}")
  @Tags("User")
  public async getUser(@Path() id: ObjectIdString): Promise<User> {
    this.setStatus(200);
    return await this.service.getUserById(id);
  }

  @Post("register")
  @Tags("User")
  public async registerUser(
    @Body() requestBody: RegisterRequest
  ): Promise<void> {
    this.setStatus(201);

    await this.service.registerUser(requestBody);
  }

  private get service(): UserService {
    return new UserService();
  }
}