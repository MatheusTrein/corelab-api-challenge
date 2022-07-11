import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("colors")
class Color {
  @PrimaryColumn()
  name: string;

  @Column({ name: "hexa_code" })
  hexaCode?: string;
}

export { Color };
