/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyOptions } from 'passport-jwt';

export interface JwtPayload {
  username: string;
  name: string;
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: 'process.env.JWT_SECRET',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(options);
  }

  validate(payload: JwtPayload): {
    name: string;
    username: string;
    userId: string;
  } {
    return {
      name: payload.name,
      username: payload.username,
      userId: payload.userId,
    };
  }
}
