import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: UserDocument): {
        access_token: string;
        refresh_token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
        };
    };
    register(userData: Partial<User>): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
        };
    }>;
    refreshToken(user: {
        email: string;
        id: string;
        role: string;
    }): {
        access_token: string;
    };
}
