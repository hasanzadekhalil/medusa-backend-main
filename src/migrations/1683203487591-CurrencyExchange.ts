import { MigrationInterface, QueryRunner } from "typeorm"

export class CurrencyExchange1683203487591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('currency_exchange');
        if (!tableExists) {
            await queryRunner.query(
                `CREATE TABLE currency_exchange (
                    "targetCurrency" VARCHAR(3) NOT NULL,
                    "exchangeRate" NUMERIC(100, 3) NOT NULL
              );
              CREATE UNIQUE INDEX currency_exchange_target_currency_idx ON currency_exchange("targetCurrency");
              `
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("currency_exchange", true)
    }
}
