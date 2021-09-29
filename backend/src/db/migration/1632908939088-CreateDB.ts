import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1632908939088 implements MigrationInterface {
    name = 'CreateDB1632908939088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "nickname" varchar NOT NULL, "password" varchar NOT NULL, "adminId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "nickname" varchar NOT NULL, "password" varchar NOT NULL, "adminId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "admins" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "nickname", "password", "adminId") SELECT "id", "name", "nickname", "password", "adminId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "nickname" varchar NOT NULL, "password" varchar NOT NULL, "adminId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "nickname", "password", "adminId") SELECT "id", "name", "nickname", "password", "adminId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
