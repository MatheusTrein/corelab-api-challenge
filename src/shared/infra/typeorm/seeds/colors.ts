import { DataSource } from "typeorm";

interface Colors {
  name: string;
  hexa_code: string;
}

export default async function createColors(
  connection: DataSource
): Promise<Colors[]> {
  const colors = [
    {
      name: "Vermelho",
      hexa_code: "#ff0000",
    },
    {
      name: "Branco",
      hexa_code: "#FFFFFF",
    },
    {
      name: "Azul",
      hexa_code: "#0000ff",
    },
    {
      name: "Preto",
      hexa_code: "#000000",
    },
    {
      name: "Amarelo",
      hexa_code: "#FFFF00",
    },
    {
      name: "Roxo",
      hexa_code: "#A020F0",
    },
    {
      name: "Prata",
      hexa_code: "#C0C0C0",
    },
    {
      name: "Cinza",
      hexa_code: "#808080",
    },
    {
      name: "Marrom",
      hexa_code: "#964b00",
    },
  ];

  await Promise.all(
    colors.map(async (color) => {
      await connection.query(
        `INSERT INTO colors(name, hexa_code) values('${color.name}','${color.hexa_code}') ON CONFLICT DO NOTHING;`
      );
    })
  );

  return colors;
}
