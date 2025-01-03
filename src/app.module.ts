import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Pour gérer les variables d'environnement

@Module({
  imports: [
    UsersModule, // Nous avons besoin du module Users pour gérer les utilisateurs
    JwtModule.registerAsync({
      imports: [ConfigModule], // Pour utiliser les variables d'environnement
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Utilisation de la clé secrète depuis les variables d'environnement
        signOptions: {
          expiresIn: '1h', // Durée de vie du token, ici 1 heure
        },
      }),
      inject: [ConfigService], // Injection du service ConfigService
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
