import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Color } from "./Color";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ name: "brand_name" })
  brandName: string;

  @Column({ name: "color_name" })
  colorName: string;

  @Column()
  description: string;

  @Column()
  plate: string;

  @Column({ name: "is_favorite" })
  isFavorite: boolean;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column({ name: "created_at" })
  createdAt: Date;

  //Relations
  @ManyToOne(() => Brand, (brand) => brand.name, {
    cascade: true,
  })
  @JoinColumn({ name: "brand_name" })
  brand: Brand;

  @ManyToOne(() => Color, (color) => color.name, {
    cascade: ["insert"],
  })
  @JoinColumn({ name: "color_name" })
  color: Color;
}

export { Vehicle };
