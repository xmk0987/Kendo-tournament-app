import {
  Controller,
  Route,
  Post,
  Tags,
  Body,
  Request,
  Get,
  Security
} from "tsoa";
import { LoginRequest } from "../models/requestModel.js";
import { AuthService } from "../services/authService.js";
import { type JwtPayload } from "jsonwebtoken";
import * as express from "express";
import { type User } from "../models/userModel.js";

@Route("auth")
export class AuthController extends Controller {
  @Post("login")
  @Tags("Auth")
  public async loginUser(@Body() requestBody: LoginRequest): Promise<User> {
    this.setStatus(204);

    const { user, accessToken, refreshToken } =
      await this.service.loginUser(requestBody);

    this.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; Path=/api/; HttpOnly;`,
      `refreshToken=${refreshToken}; Path=/api/; HttpOnly;`
    ]);

    return user;
  }

  @Post("logout")
  @Tags("Auth")
  public async logoutUser(): Promise<void> {
    this.setStatus(204);

    // Clear access and refresh token cookies
    this.setHeader("Set-Cookie", [
      `accessToken=; Path=/api/; HttpOnly;`,
      `refreshToken=; Path=/api/; HttpOnly;`
    ]);
  }

  @Post("refresh")
  @Tags("Auth")
  public async refreshToken(
    @Request() request: express.Request
  ): Promise<void> {
    this.setStatus(204);

    const [accessToken, refreshToken] = await this.service.refreshAccessToken(
      request.cookies.refreshToken
    );

    this.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; Path=/api/; HttpOnly;`,
      `refreshToken=${refreshToken}; Path=/api/; HttpOnly;`
    ]);
  }

  @Get("check-auth")
  @Tags("Auth")
  @Security("jwt")
  public async checkAuthenticationStatus(
    @Request() request: express.Request & { user: JwtPayload }
  ): Promise<{ userId: string }> {
    this.setStatus(200);

    // This should never throw due to the middleware throwing if the user is not authenticated.
    return { userId: request.user.id };
  }

  private get service(): AuthService {
    return new AuthService();
  }
}
