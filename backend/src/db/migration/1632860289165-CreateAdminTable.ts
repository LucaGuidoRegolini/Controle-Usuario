import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdminTable1632860289165 implements MigrationInterface {
    name = 'CreateAdminTable1632860289165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "uuid" varchar NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "passwordResetToken" varchar NOT NULL, "passwordResetExpires" datetime NOT NULL, CONSTRAINT "UQ_0e1a5fde65beb42294f4307ee37" UNIQUE ("uuid"), CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
