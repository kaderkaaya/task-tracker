import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AppLogger } from 'src/common/logger/logger.service';
import ApiError from 'src/common/errors/api-error';
import { AppErrors } from 'src/common/errors/err';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email);
        const hash = user!.password;
        const isMatch = await bcrypt.compare(password, hash);
        if (!user) {
            AppLogger.log('User not found', 'AuthService');
            throw new ApiError(AppErrors.USER_ERROR.message, AppErrors.USER_ERROR.statusCode);
        }
        if (!isMatch) {
            AppLogger.warn('User password does not match', 'AuthService')
            throw new UnauthorizedException();
        }
        const payload = { userId: user.id, username: user.name }

        const { access_token } = await this.generateToken(payload);
        const userId = user.id;
        const token = access_token;
        await this.usersService.registerToken(userId, token);
        AppLogger.log('User logged in', 'AuthService');
        return user;
    }
    async generateToken(payload: { userId: number; username: string }): Promise<{ access_token: string }> {
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
