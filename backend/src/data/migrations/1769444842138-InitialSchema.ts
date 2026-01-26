import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1769444842138 implements MigrationInterface {
  name = 'InitialSchema1769444842138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid NOT NULL, "name" citext NOT NULL, "company" citext, "description" citext NOT NULL, CONSTRAINT "UQ_dae2a425f0cd17456d768c4f381" UNIQUE ("ownerId", "name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."team_member_teamrole_enum" AS ENUM('owner', 'member')`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "teamId" uuid NOT NULL, "teamRole" "public"."team_member_teamrole_enum" NOT NULL DEFAULT 'member', CONSTRAINT "UQ_bd2b3ef7569d75642e091853771" UNIQUE ("userId", "teamId"), CONSTRAINT "PK_649680684d72a20d279641469c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cpf" citext NOT NULL, "email" citext NOT NULL, "password" citext NOT NULL, "firstName" citext NOT NULL, "lastName" citext NOT NULL, "username" citext NOT NULL, "salt" citext NOT NULL, "birthDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "position" integer NOT NULL, "columnId" uuid NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "color" character varying(7) NOT NULL DEFAULT '#6366f1', CONSTRAINT "PK_4a2a36bbbaf0cfd82029c9c84d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "tokenHash" citext NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_49a22109d0b97611c07768e37f1" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_member" ADD CONSTRAINT "FK_d2be3e8fc9ab0f69673721c7fc3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_member" ADD CONSTRAINT "FK_74da8f612921485e1005dc8e225" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "task_column"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_member" DROP CONSTRAINT "FK_74da8f612921485e1005dc8e225"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_member" DROP CONSTRAINT "FK_d2be3e8fc9ab0f69673721c7fc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_49a22109d0b97611c07768e37f1"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_token"`);
    await queryRunner.query(`DROP TABLE "task_column"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "team_member"`);
    await queryRunner.query(`DROP TYPE "public"."team_member_teamrole_enum"`);
    await queryRunner.query(`DROP TABLE "team"`);
  }
}
