import { Entity, PrimaryColumn } from "typeorm";

@Entity("brands")
class Brand {
  @PrimaryColumn()
  name: string;
}

export { Brand };
