import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { Table } from 'typeorm/schema-builder/table/Table'
import { View } from 'typeorm/schema-builder/view/View'
import { snakeCase } from 'typeorm/util/StringUtils'

export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  private readonly POSTGRES_MAX_IDENTIFIER_LENGTH = 63

  tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className)
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.concat('').join('_')) +
      (customName ? customName : snakeCase(propertyName))
    )
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }

  indexName(
    tableOrName: Table | View | string,
    columns: string[],
    _where?: string,
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columns.reduce(
      (name, column) => `${name}__${column}`,
      `${tableOrName}`,
    )

    const indexName = `idx_${name}`

    if (indexName.length > this.POSTGRES_MAX_IDENTIFIER_LENGTH) {
      throw new Error(
        `Index name is too long. Maximum length is ${this.POSTGRES_MAX_IDENTIFIER_LENGTH} characters. ` +
          `Generated name is ${indexName.length} characters long.`,
      )
    }

    return indexName
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    _referencedColumnNames?: string[],
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columnNames.reduce(
      (name, column) => `${name}__${column}`,
      `${tableOrName}__${referencedTablePath}`,
    )

    const fkName = `fk_${name}`

    if (fkName.length > this.POSTGRES_MAX_IDENTIFIER_LENGTH) {
      throw new Error(
        `Foreign key name is too long. Maximum length is ${this.POSTGRES_MAX_IDENTIFIER_LENGTH} characters. ` +
          `Generated name is ${fkName.length} characters long.`,
      )
    }

    return fkName
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columnNames.reduce(
      (name, column) => `${name}__${column}`,
      `${tableOrName}`,
    )

    const pkName = `pk_${name}`

    if (pkName.length > this.POSTGRES_MAX_IDENTIFIER_LENGTH) {
      throw new Error(
        `Primary key name is too long. Maximum length is ${this.POSTGRES_MAX_IDENTIFIER_LENGTH} characters. ` +
          `Generated name is ${pkName.length} characters long.`,
      )
    }

    return pkName
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columnNames.reduce(
      (name, column) => `${name}__${column}`,
      `${tableOrName}`,
    )

    const ucName = `uc_${name}`

    if (ucName.length > this.POSTGRES_MAX_IDENTIFIER_LENGTH) {
      throw new Error(
        `Unique constraint name is too long. Maximum length is ${this.POSTGRES_MAX_IDENTIFIER_LENGTH} characters. ` +
          `Generated name is ${ucName.length} characters long.`,
      )
    }

    return ucName
  }

  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    _where?: string,
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name

    const name = columnNames.reduce(
      (name, column) => `${name}__${column}`,
      `${tableOrName}`,
    )

    const rcName = `rc_${name}`

    if (rcName.length > this.POSTGRES_MAX_IDENTIFIER_LENGTH) {
      throw new Error(
        `Relation constraint name is too long. Maximum length is ${this.POSTGRES_MAX_IDENTIFIER_LENGTH} characters. ` +
          `Generated name is ${rcName.length} characters long.`,
      )
    }

    return rcName
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName)
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    _secondPropertyName: string,
  ): string {
    return snakeCase(
      firstTableName +
        '_' +
        firstPropertyName.replace(/\./gi, '_') +
        '_' +
        secondTableName,
    )
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(tableName + '_' + (columnName ? columnName : propertyName))
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return alias + '__' + propertyPath.replace('.', '_')
  }
}
