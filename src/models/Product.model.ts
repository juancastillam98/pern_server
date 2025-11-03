import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
//los @ son decoradores y sirven para indicar que está disponible esa clase. Es propio de cada clase. En este caso Sequelize

@Table({
  tableName: "products",
})
class Product extends Model {
  //columna nombre
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  //Columna tipo
  @Column({
    type: DataType.FLOAT(6, 2),
  })
  declare price: number;
  //columna avilability
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;
}
export default Product;
