import {
    Column,
    Entity,
    PrimaryColumn
} from "typeorm"

@Entity()
export class CurrencyExchange {
    @PrimaryColumn({ unique: true })
    targetCurrency: string

    @Column()
    exchangeRate: number;
}