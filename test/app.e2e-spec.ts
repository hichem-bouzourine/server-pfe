import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateArtisanDto } from '../src/auth/dtos/create-artisan.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();

    await app.listen(3333);

    prismaService = app.get(PrismaService);

    pactum.request.setBaseUrl('http://localhost:3333/api/');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: CreateArtisanDto = {
      nom: 'TEST',
      prenom: 'TEST',
      date_de_naissance: new Date('2002-10-16'),
      sexe: 'HOMME',
      email: 'testtest@gmail.com',
      password: '12345678',
      telephone: '0699092353',
      type: 'ARTISAN',
      photo:
        'https://media.licdn.com/dms/image/C4D03AQHjSS6Lf85bxw/profile-displayphoto-shrink_200_200/0/1614679375119?e=1687996800&v=beta&t=_rH18BvPhLPzAbHWTZ8wHwMMqXdFuxaa0UWQCZV2XQY',
      specialite: 2,
      statutCompte: false,
      description: 'desc',
      Rue: 'Rue des martyrs',
      id_Commune: 10,
      annee_debut_experience: 2005,
      document: 'https://passeport.interieur.gov.dz/fr/Images/PSP_Help1.gif',
      date_inscription: new Date(),
    };

    describe('Signup Artisan', () => {
      const url = 'auth/signup/artisan';
      it('should throw if email empty', () => {
        const { email, ...rest } = dto;
        return pactum.spec().post(url).withBody(rest).expectStatus(400);
      });

      it('should throw if password empty', () => {
        const { password, ...rest } = dto;
        return pactum.spec().post(url).withBody(rest).expectStatus(400);
      });

      it('should throw if email is not a valid email', () => {
        const { email, ...rest } = dto;
        return pactum
          .spec()
          .post(url)
          .withBody({
            email: 'random',
            ...rest,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(url).expectStatus(400);
      });

      it('Should throw if user already exists', () => {
        const { email, ...rest } = dto;
        return pactum
          .spec()
          .post(url)
          .withBody({
            email: 'hichembouzourine.uni@gmail.com',
            ...rest,
          })
          .expectStatus(400);
      });

      it('should throw if specialite is not found', () => {
        const { specialite, ...rest } = dto;
        return pactum
          .spec()
          .post(url)
          .withBody({
            specialite: 999, // Provide a non-existent specialite ID
            ...rest,
          })
          .expectStatus(404);
      });
    });

    describe('Login', () => {
      const url = 'auth/login';
      const dto = {
        email: 'hichembouzourine.uni@gmail.com',
        password: '12345678',
      };

      it('should throw if email is empty', () => {
        const { email, ...rest } = dto;
        return pactum.spec().post(url).withBody(rest).expectStatus(400);
      });

      it('should throw if password is empty', () => {
        const { password, ...rest } = dto;
        return pactum.spec().post(url).withBody(rest).expectStatus(400);
      });

      it('should throw if email is incorrect', () => {
        return pactum
          .spec()
          .post(url)
          .withBody({
            email: 'random@random.com',
            password: dto.password,
          })
          .expectStatus(404);
      });

      it('should throw if email is not a valid email', () => {
        return pactum
          .spec()
          .post(url)
          .withBody({
            email: 'random',
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password is incorrect', () => {
        return pactum
          .spec()
          .post(url)
          .withBody({
            email: dto.email,
            password: 'random',
          })
          .expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get Connected User', () => {});
  });
});
